import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

// Simple HTML sanitization function
const sanitizeInput = (input: string): string => {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
};

// Rate limiting storage
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const securityHeaders = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "X-XSS-Protection": "1; mode=block",
  "Referrer-Policy": "strict-origin-when-cross-origin",
};

interface ContactEmailRequest {
  name: string;
  organization?: string;
  contact: string;
  description: string;
  budget?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: { ...corsHeaders, ...securityHeaders } });
  }

  try {
    // Rate limiting check
    const clientIP = req.headers.get("x-forwarded-for") || "unknown";
    const now = Date.now();
    const windowMs = 15 * 60 * 1000; // 15 minutes
    const maxRequests = 5;

    const clientData = rateLimitMap.get(clientIP);
    if (clientData) {
      if (now < clientData.resetTime) {
        if (clientData.count >= maxRequests) {
          return new Response(
            JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
            {
              status: 429,
              headers: {
                "Content-Type": "application/json",
                ...corsHeaders,
                ...securityHeaders,
              },
            }
          );
        }
        clientData.count++;
      } else {
        rateLimitMap.set(clientIP, { count: 1, resetTime: now + windowMs });
      }
    } else {
      rateLimitMap.set(clientIP, { count: 1, resetTime: now + windowMs });
    }

    const { name, organization, contact, description, budget }: ContactEmailRequest = await req.json();

    console.log("Sending contact email with data:", { name, organization, contact, description, budget });

    // Sanitize inputs to prevent XSS
    const sanitizedName = sanitizeInput(name);
    const sanitizedOrganization = organization ? sanitizeInput(organization) : '';
    const sanitizedContact = sanitizeInput(contact);
    const sanitizedDescription = sanitizeInput(description).replace(/\n/g, '<br>');
    const sanitizedBudget = budget ? sanitizeInput(budget) : '';

    const emailResponse = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: ["dev.solidity.eth@gmail.com"],
      subject: `New contact message from ${sanitizedName}`,
      html: `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${sanitizedName}</p>
        ${sanitizedOrganization ? `<p><strong>Organization:</strong> ${sanitizedOrganization}</p>` : ''}
        <p><strong>Contact:</strong> ${sanitizedContact}</p>
        <p><strong>Description:</strong></p>
        <p>${sanitizedDescription}</p>
        ${sanitizedBudget ? `<p><strong>Budget:</strong> ${sanitizedBudget}</p>` : ''}
        <hr>
        <p><em>Message sent from PreAudit contact form</em></p>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, message: "Email sent successfully" }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
        ...securityHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders, ...securityHeaders },
      }
    );
  }
};

serve(handler);
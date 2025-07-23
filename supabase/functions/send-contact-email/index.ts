import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
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
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, organization, contact, description, budget }: ContactEmailRequest = await req.json();

    console.log("Sending contact email with data:", { name, organization, contact, description, budget });

    const emailResponse = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: ["dev.solidity.eth@gmail.com"],
      subject: `New contact message from ${name}`,
      html: `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        ${organization ? `<p><strong>Organization:</strong> ${organization}</p>` : ''}
        <p><strong>Contact:</strong> ${contact}</p>
        <p><strong>Description:</strong></p>
        <p>${description.replace(/\n/g, '<br>')}</p>
        ${budget ? `<p><strong>Budget:</strong> ${budget}</p>` : ''}
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
      },
    });
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Send, X } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  organization: z.string().min(2, "Organization name must be at least 2 characters"),
  contact: z.string().min(3, "Email or Telegram is required"),
  description: z.string().min(10, "Please provide at least 10 characters"),
  budget: z.string().min(1, "Budget is required"),
});

type ContactFormData = z.infer<typeof contactSchema>;

interface ContactFormProps {
  onClose?: () => void;
}

const ContactForm = ({ onClose }: ContactFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    // Simulate form submission
    try {
      // Here you would typically send to your backend or email service
      console.log("Form data:", data);
      
      // For now, we'll just show a success message
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Thank you! We'll get back to you within 24 hours.");
      reset();
      onClose?.();
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader className="relative">
        <CardTitle className="text-2xl font-bold text-center bg-gradient-to-r from-primary via-security to-primary bg-clip-text text-transparent">
          Contact PreAudit
        </CardTitle>
        {onClose && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-4 top-4"
            onClick={onClose}
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              {...register("name")}
              placeholder="Your full name"
              className={errors.name ? "border-destructive" : ""}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="organization">Organization Name *</Label>
            <Input
              id="organization"
              {...register("organization")}
              placeholder="Your organization or company"
              className={errors.organization ? "border-destructive" : ""}
            />
            {errors.organization && (
              <p className="text-sm text-destructive">{errors.organization.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact">Email or Telegram *</Label>
            <Input
              id="contact"
              {...register("contact")}
              placeholder="email@example.com or @telegram_handle"
              className={errors.contact ? "border-destructive" : ""}
            />
            {errors.contact && (
              <p className="text-sm text-destructive">{errors.contact.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Project Description *</Label>
            <Textarea
              id="description"
              {...register("description")}
              placeholder="Tell us about your DeFi project, smart contracts, and what you need help with..."
              className={`min-h-[100px] ${errors.description ? "border-destructive" : ""}`}
            />
            {errors.description && (
              <p className="text-sm text-destructive">{errors.description.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="budget">Budget (USD) *</Label>
            <Input
              id="budget"
              {...register("budget")}
              placeholder="e.g., $5,000 - $15,000"
              className={errors.budget ? "border-destructive" : ""}
            />
            {errors.budget && (
              <p className="text-sm text-destructive">{errors.budget.message}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
            variant="primary"
          >
            {isSubmitting ? (
              "Sending..."
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ContactForm;
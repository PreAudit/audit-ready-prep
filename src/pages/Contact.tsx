import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ContactForm from "@/components/ContactForm";

const Contact = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-security-muted to-background">
      <ThemeToggle />
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 max-w-2xl">
        <Button 
          variant="outline" 
          onClick={() => navigate(-1)}
          className="mb-6 sm:mb-8 border-security/30 hover:border-security/60 transition-colors w-full sm:w-auto"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        
        <ContactForm />
      </div>
    </div>
  );
};

export default Contact;
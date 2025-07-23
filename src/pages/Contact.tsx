import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ContactForm from "@/components/ContactForm";

const Contact = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-security-muted to-background">
      <div className="container mx-auto px-6 py-12 max-w-2xl">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-8 text-muted-foreground hover:text-foreground"
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
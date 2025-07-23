import { Button } from "@/components/ui/button";
import { ExternalLink, Shield, Zap, DollarSign, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-security-muted to-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-primary/10 to-security/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-security/10 to-primary/10 rounded-full blur-3xl" />
      
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-20 flex flex-col items-center justify-center min-h-screen text-center relative z-10">
        
        {/* Brand Name */}
        <div className="relative mb-8">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-security to-primary bg-clip-text text-transparent">
            PreAudit
          </h1>
          <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-security/20 rounded-lg blur-xl opacity-30" />
        </div>

        {/* Tagline */}
        <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl font-medium">
          Get audit-ready the way serious protocols do
        </p>

        {/* Body Text */}
        <p className="text-lg text-foreground/80 mb-16 max-w-3xl leading-relaxed">
          We build the test suites, fuzzing setups, and invariant campaigns your auditors expect — so they can focus on what really matters
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 mb-20">
          <Button 
            variant="primary" 
            size="lg" 
            className="group relative overflow-hidden bg-gradient-to-r from-primary to-primary-glow hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 transform hover:scale-105"
            onClick={() => navigate("/learn-more")}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary-glow to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Zap className="w-5 h-5 mr-2 group-hover:animate-pulse relative z-10" />
            <span className="relative z-10">Learn more</span>
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            className="group relative overflow-hidden border-2 border-security/30 hover:border-security/60 hover:bg-security-muted/30 backdrop-blur-sm transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-security/20"
            onClick={() => window.open('https://github.com/clement-ux/portfolio', '_blank')}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-security/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Shield className="w-5 h-5 mr-2 group-hover:animate-pulse relative z-10" />
            <span className="relative z-10">See our previous work</span>
            <ExternalLink className="w-4 h-4 ml-2 relative z-10" />
          </Button>

          <Button 
            variant="outline" 
            size="lg"
            className="group relative overflow-hidden border-2 border-security/30 hover:border-security/60 hover:bg-security-muted/30 backdrop-blur-sm transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-security/20"
            onClick={() => navigate("/contact")}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-security/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Mail className="w-5 h-5 mr-2 group-hover:animate-pulse relative z-10" />
            <span className="relative z-10">Contact Us</span>
          </Button>
        </div>

        {/* Enhanced Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl text-center">
          <div className="p-4 rounded-lg bg-card/60 border border-security/20 backdrop-blur-md">
            <div className="w-10 h-10 mx-auto mb-3 rounded-lg bg-gradient-to-br from-primary to-security flex items-center justify-center shadow-lg shadow-primary/25">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-semibold text-base text-foreground mb-2">Comprehensive Testing</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">Unit tests and invariant testing to catch vulnerabilities early</p>
          </div>
          
          <div className="p-4 rounded-lg bg-card/60 border border-security/20 backdrop-blur-md">
            <div className="w-10 h-10 mx-auto mb-3 rounded-lg bg-gradient-to-br from-security to-primary flex items-center justify-center shadow-lg shadow-security/25">
              <DollarSign className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-semibold text-base text-foreground mb-2">Cheaper Audits</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">Book fewer auditors for shorter periods with proper preparation</p>
          </div>
          
          <div className="p-4 rounded-lg bg-card/60 border border-security/20 backdrop-blur-md">
            <div className="w-10 h-10 mx-auto mb-3 rounded-lg bg-gradient-to-br from-primary to-security flex items-center justify-center shadow-lg shadow-primary/25">
              <ExternalLink className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-semibold text-base text-foreground mb-2">Actionable Reports</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">Clear documentation with proof-of-concept scenarios</p>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-4 h-4 bg-primary/30 rounded-full animate-pulse" />
        <div className="absolute top-40 right-20 w-6 h-6 bg-security/30 rounded-full animate-pulse delay-1000" />
        <div className="absolute bottom-40 left-20 w-3 h-3 bg-primary/40 rounded-full animate-pulse delay-500" />
      </div>
    </div>
  );
};

export default Index;
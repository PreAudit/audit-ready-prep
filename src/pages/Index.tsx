import { Button } from "@/components/ui/button";
import { ExternalLink, Shield, Zap } from "lucide-react";
import preauditLogo from "@/assets/preaudit-logo-v2.png";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-security-muted to-background">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-20 flex flex-col items-center justify-center min-h-screen text-center">
        
        {/* Logo */}
        <div className="mb-12 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-security rounded-full blur-xl opacity-20 animate-pulse"></div>
          <img 
            src={preauditLogo} 
            alt="PreAudit Logo" 
            className="w-24 h-24 relative z-10 drop-shadow-lg"
          />
        </div>

        {/* Brand Name */}
        <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-primary via-security to-primary bg-clip-text text-transparent">
          PreAudit
        </h1>

        {/* Tagline */}
        <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl font-medium">
          Get audit-ready the way serious protocols do
        </p>

        {/* Body Text */}
        <p className="text-lg text-foreground/80 mb-16 max-w-3xl leading-relaxed">
          We build the test suites, fuzzing setups, and invariants your auditors expect — so they can focus on what really matters
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-8 mb-20">
          <Button 
            variant="primary" 
            size="lg" 
            className="group"
            onClick={() => window.open('#', '_blank')}
          >
            <Zap className="w-5 h-5 mr-2 group-hover:animate-pulse" />
            Learn more
            <ExternalLink className="w-4 h-4 ml-2" />
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            className="group border-security/20 hover:border-security/40 hover:bg-security-muted/50"
            onClick={() => window.open('#', '_blank')}
          >
            <Shield className="w-5 h-5 mr-2 group-hover:animate-pulse" />
            See our previous work
            <ExternalLink className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* Subtle Feature Hints */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl text-center">
          <div className="p-8 rounded-lg bg-card/50 border border-security/10 backdrop-blur-sm">
            <div className="w-12 h-12 mx-auto mb-6 rounded-full bg-gradient-to-r from-primary to-security flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-foreground mb-4">Comprehensive Testing</h3>
            <p className="text-sm text-muted-foreground">Unit tests and invariant testing to catch vulnerabilities early</p>
          </div>
          
          <div className="p-8 rounded-lg bg-card/50 border border-security/10 backdrop-blur-sm">
            <div className="w-12 h-12 mx-auto mb-6 rounded-full bg-gradient-to-r from-security to-primary flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-foreground mb-4">Cheaper Audits</h3>
            <p className="text-sm text-muted-foreground">Book fewer auditors for shorter periods with proper preparation</p>
          </div>
          
          <div className="p-8 rounded-lg bg-card/50 border border-security/10 backdrop-blur-sm">
            <div className="w-12 h-12 mx-auto mb-6 rounded-full bg-gradient-to-r from-primary to-security flex items-center justify-center">
              <ExternalLink className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-foreground mb-4">Actionable Reports</h3>
            <p className="text-sm text-muted-foreground">Clear documentation with proof-of-concept scenarios</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
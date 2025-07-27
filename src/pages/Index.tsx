import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { ExternalLink, Shield, Zap, DollarSign, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-security-muted to-background relative overflow-hidden">
      <ThemeToggle />
      
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-primary/10 to-security/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-security/10 to-primary/10 rounded-full blur-3xl" />

      {/* Hero Section */}
      <div className="container mx-auto px-6 py-20 flex flex-col items-center justify-center min-h-screen text-center relative z-10">

        {/* Hero Visual */}
        <div className="mb-8 w-full max-w-2xl animate-fade-in">
          <div className="w-full h-64 md:h-80 rounded-2xl shadow-2xl bg-gradient-to-br from-primary/20 via-security/15 to-primary/10 flex items-center justify-center border border-primary/20">
            <div className="text-center">
              <Shield className="w-16 h-16 md:w-20 md:h-20 text-primary mx-auto mb-4" />
              <h2 className="text-xl md:text-2xl font-semibold text-primary">Smart Contract Security</h2>
              <p className="text-muted-foreground mt-2">Expert Testing & Auditing</p>
            </div>
          </div>
        </div>

        {/* Brand Name */}
        <div className="relative mb-8 animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-bold text-primary">
            PreAudit
          </h1>
          <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-security/20 rounded-lg blur-xl opacity-30" />
        </div>

        {/* Tagline */}
        <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl font-medium">
          Prepare your protocol for audit — so auditors can go deeper
        </p>

        {/* Body Text */}
        <p className="text-lg text-foreground/80 mb-16 max-w-3xl leading-relaxed">
          We build the test suites, fuzzing setups, and invariant campaigns that strengthen your codebase, making the auditor’s job sharper and more impactful.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 mb-20 animate-scale-in"
             style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
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
            onClick={() => navigate("/portfolio")}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-security/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Shield className="w-5 h-5 mr-2 group-hover:animate-pulse relative z-10" />
            <span className="relative z-10">See our previous work</span>
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

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl animate-fade-in-up"
             style={{ animationDelay: '0.6s', animationFillMode: 'both' }}>
          <div className="flex flex-col items-center space-y-3 min-h-[160px]">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-security/20 flex items-center justify-center">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground text-center">Comprehensive Testing</h3>
            <p className="text-sm text-muted-foreground leading-relaxed text-center">Unit tests and invariant testing to catch vulnerabilities early</p>
          </div>

          <div className="flex flex-col items-center space-y-3 min-h-[160px]">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-security/20 to-primary/20 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-security" />
            </div>
            <h3 className="font-semibold text-foreground text-center">Audit Smarter, Not Harder</h3>
            <p className="text-sm text-muted-foreground leading-relaxed text-center">Well-prepared code lets you book fewer hours with better outcomes.</p>
          </div>

          <div className="flex flex-col items-center space-y-3 min-h-[160px]">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-security/20 flex items-center justify-center">
              <ExternalLink className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground text-center">Actionable Reports</h3>
            <p className="text-sm text-muted-foreground leading-relaxed text-center">Clear documentation with proof-of-concept scenarios</p>
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
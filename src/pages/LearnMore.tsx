import { Button } from "@/components/ui/button";
import { ArrowLeft, Shield, Clock, Users, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LearnMore = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-security-muted to-background">
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        {/* Header */}
        <div className="mb-12">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
            className="mb-8 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-security to-primary bg-clip-text text-transparent">
            Learn More About PreAudit
          </h1>
        </div>

        {/* Content Sections */}
        <div className="space-y-16">
          {/* What is PreAudit */}
          <section className="p-8 rounded-lg bg-card/50 border border-security/10 backdrop-blur-sm">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 mr-4 rounded-full bg-gradient-to-r from-primary to-security flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">What is PreAudit?</h2>
            </div>
            <p className="text-lg text-foreground/80 leading-relaxed">
              <strong>PreAudit</strong> helps DeFi protocols become fully prepared for their initial security audits by proactively identifying and addressing vulnerabilities through thorough unit and invariant testing. By tackling the basics upfront, we ensure that professional auditors can efficiently focus on more sophisticated and critical security threats.
            </p>
          </section>

          {/* Why Use PreAudit */}
          <section className="p-8 rounded-lg bg-card/50 border border-security/10 backdrop-blur-sm">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Why Use PreAudit?</h2>
            <p className="text-lg text-foreground/80 leading-relaxed">
              Traditional security audits typically span just one or two weeks — a short window to uncover and understand complex risks. If that time is spent on surface-level issues, deeper flaws may go undetected. <strong>PreAudit</strong> reduces the overall vulnerability load by catching a wide range of issues early — from the simple to the subtle — allowing auditors to concentrate on reviewing your protocol’s most intricate and high-impact logic.
            </p>
          </section>

          {/* Services Offered */}
          <section className="p-8 rounded-lg bg-card/50 border border-security/10 backdrop-blur-sm">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">Services Offered</h2>
            <ul className="space-y-6">
              <li className="flex items-start">
                <div className="w-8 h-8 mr-4 mt-1 rounded-full bg-gradient-to-r from-primary to-security flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-bold">•</span>
                </div>
                <div>
                  <strong className="text-foreground">Comprehensive Unit Tests:</strong>
                  <span className="text-foreground/80 ml-2">Extensive test suites to verify your project's functionality.</span>
                </div>
              </li>
              <li className="flex items-start">
                <div className="w-8 h-8 mr-4 mt-1 rounded-full bg-gradient-to-r from-primary to-security flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-bold">•</span>
                </div>
                <div>
                  <strong className="text-foreground">Invariant and Fuzz Testing:</strong>
                  <span className="text-foreground/80 ml-2">Rigorous campaigns that detect subtle and potentially damaging vulnerabilities.</span>
                </div>
              </li>
              <li className="flex items-start">
                <div className="w-8 h-8 mr-4 mt-1 rounded-full bg-gradient-to-r from-primary to-security flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-bold">•</span>
                </div>
                <div>
                  <strong className="text-foreground">Clear and Actionable Reports:</strong>
                  <span className="text-foreground/80 ml-2">Vulnerabilities documented with practical Proof-of-Concept (PoC) scenarios.</span>
                </div>
              </li>
              <li className="flex items-start">
                <div className="w-8 h-8 mr-4 mt-1 rounded-full bg-gradient-to-r from-primary to-security flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-bold">•</span>
                </div>
                <div>
                  <strong className="text-foreground">Reusable Repository:</strong>
                  <span className="text-foreground/80 ml-2">A complete Git repository including all tests and scenarios for easy integration into your project's workflow.</span>
                </div>
              </li>
            </ul>
          </section>

          {/* Duration & Who Should Use */}
          <div className="grid md:grid-cols-2 gap-8">
            <section className="p-8 rounded-lg bg-card/50 border border-security/10 backdrop-blur-sm">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 mr-4 rounded-full bg-gradient-to-r from-primary to-security flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-foreground">Typical Duration</h2>
              </div>
              <p className="text-lg text-foreground/80 leading-relaxed">
                Our pre-audit engagements typically range from 1 week to 2 months, tailored to your project's complexity and specific requirements.
              </p>
            </section>

            <section className="p-8 rounded-lg bg-card/50 border border-security/10 backdrop-blur-sm">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 mr-4 rounded-full bg-gradient-to-r from-primary to-security flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-foreground">Who Should Use PreAudit?</h2>
              </div>
              <p className="text-lg text-foreground/80 leading-relaxed">
                We primarily assist early-stage DeFi protocols and teams preparing for their first security audit, delivering high-quality, affordable, and effective security preparation.
              </p>
            </section>
          </div>

          {/* Benefits */}
          <section className="p-8 rounded-lg bg-card/50 border border-security/10 backdrop-blur-sm">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 mr-4 rounded-full bg-gradient-to-r from-primary to-security flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Benefits</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <h3 className="font-semibold text-foreground mb-4">Save Time</h3>
                <p className="text-sm text-muted-foreground">Typically reduce auditing time by 30% to 50%.</p>
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-foreground mb-4">Better Security</h3>
                <p className="text-sm text-muted-foreground">Significantly enhance your project's security coverage.</p>
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-foreground mb-4">Deeper Audits</h3>
                <p className="text-sm text-muted-foreground">Enable auditors to deliver more insightful and detailed results.</p>
              </div>
            </div>
          </section>

          {/* Get Started */}
          <section className="text-center p-12 rounded-lg bg-gradient-to-r from-primary/10 via-security/10 to-primary/10 border border-security/20">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Get Started</h2>
            <p className="text-xl text-foreground/80 mb-8 max-w-2xl mx-auto">
              Reach out today and let <strong>PreAudit</strong> ensure your DeFi protocol is fully prepared and ready for its audit.
            </p>
            <Button 
              variant="primary" 
              size="lg"
              className="group"
              onClick={() => navigate('/contact')}
            >
              <Shield className="w-5 h-5 mr-2 group-hover:animate-pulse" />
              Contact Us
            </Button>
          </section>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 pt-8 border-t border-security/10">
          <p className="text-muted-foreground">© PreAudit</p>
        </div>
      </div>
    </div>
  );
};

export default LearnMore;
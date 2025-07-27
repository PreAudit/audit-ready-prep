import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Shield, Bug, Calendar, Code, AlertTriangle, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Portfolio = () => {
  const navigate = useNavigate();

  const invariantCampaigns = [
    {
      protocol: "Origin Protocol: Rooster AMO",
      testType: "Invariant campaign",
      date: "June 2025",
      link: "https://github.com/clement-ux/rooster-amo-fuzzing-tests/commits/master/"
    },
    {
      protocol: "Origin Protocol: OS ARM",
      testType: "Unit test + Invariant campaign",
      date: "April 2025",
      link: "https://github.com/OriginProtocol/arm-oeth/tree/main/test/invariants/OriginARM"
    },
    {
      protocol: "Origin Protocol: WOETH",
      testType: "Invariant campaign",
      date: "February 2025",
      link: "https://github.com/clement-ux/woeth-tests"
    },
    {
      protocol: "Origin Protocol: OUSD",
      testType: "Invariant campaign",
      date: "November 2024",
      link: "https://github.com/clement-ux/ousd-tests"
    },
    {
      protocol: "Origin Protocol: STETH ARM",
      testType: "Invariant campaign",
      date: "October 2024",
      link: "https://github.com/OriginProtocol/arm-oeth/tree/main/test/invariants/LidoARM"
    },
    {
      protocol: "DeFi Money: Governance",
      testType: "Unit + Fuzzing test",
      date: "June 2024",
      link: "https://github.com/clement-ux/dfm-governance-copie"
    },
    {
      protocol: "DeFi Money: Boosted Staker",
      testType: "Unit test",
      date: "May 2024",
      link: "https://github.com/defidotmoney/boosted-staker"
    }
  ];

  const bugBounties = [
    {
      protocol: "Prisma Finance",
      severity: "High",
      date: "February 2024",
      link: "https://github.com/clement-ux/PoC-PrismaVulnerability/blob/master/test/Vulnerability2.md",
      description: "Underestimated total weight allows passing proposals with minimal votes."
    },
    {
      protocol: "Prisma Finance",
      severity: "Medium",
      date: "February 2024",
      link: "https://github.com/clement-ux/PoC-PrismaVulnerability/blob/master/test/Vulnerability1.md",
      description: "Incorrect total weight after early withdrawal inflates governance thresholds."
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "High":
        return "bg-destructive/20 text-destructive border-destructive/30";
      case "Medium":
        return "bg-orange-500/20 text-orange-600 border-orange-500/30";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getTestTypeBadges = (testType: string) => {
    const badges = [];
    
    if (testType.includes("Unit")) {
      badges.push(
        <Badge key="unit" variant="outline" className="bg-blue-600/20 text-blue-700 border-blue-600/40 font-medium">
          Unit test
        </Badge>
      );
    }
    
    if (testType.includes("Invariant")) {
      badges.push(
        <Badge key="invariant" variant="outline" className="bg-emerald-500/20 text-emerald-700 border-emerald-500/40 font-medium">
          Invariant campaign
        </Badge>
      );
    }
    
    if (testType.includes("Fuzzing")) {
      badges.push(
        <Badge key="fuzzing" variant="outline" className="bg-orange-500/20 text-orange-700 border-orange-500/40 font-medium">
          Fuzzing test
        </Badge>
      );
    }
    
    return badges;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-security-muted to-background">
      <ThemeToggle />
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-primary/10 to-security/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-security/10 to-primary/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 py-16 relative z-10">
        {/* Navigation */}
        <div className="mb-8">
          <Button 
            variant="outline" 
            onClick={() => navigate("/")}
            className="mb-8 border-security/30 hover:border-security/60 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6">
            Portfolio
          </h1>
          <div className="max-w-3xl mx-auto">
            <p className="text-xl text-muted-foreground mb-6">
              I'm Clément, smart contract engineer at{" "}
              <a 
                href="https://github.com/OriginProtocol" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 underline decoration-primary/30 hover:decoration-primary transition-colors"
              >
                Origin Protocol
              </a>
              , specialized in contract testing and building fuzzing / invariant campaigns.
            </p>
          </div>
        </div>

        {/* Invariant Campaigns Section */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-security/20 flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-foreground">Invariant Campaigns</h2>
          </div>

          <div className="grid gap-6">
            {invariantCampaigns.map((campaign, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-border/50 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {campaign.protocol}
                      </h3>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {getTestTypeBadges(campaign.testType)}
                        <Badge variant="outline" className="bg-muted/50 text-muted-foreground border-muted/30">
                          <Calendar className="w-3 h-3 mr-1" />
                          {campaign.date}
                        </Badge>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="group-hover:border-primary/60 transition-colors"
                      onClick={() => window.open(campaign.link, '_blank')}
                    >
                      <Code className="w-4 h-4 mr-2" />
                      View Code
                      <ExternalLink className="w-3 h-3 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Bug Bounties Section */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-destructive/20 to-orange-500/20 flex items-center justify-center">
              <Bug className="w-5 h-5 text-destructive" />
            </div>
            <h2 className="text-3xl font-bold text-foreground">Bug Bounties</h2>
          </div>

          <div className="grid gap-6">
            {bugBounties.map((bug, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-border/50 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                          {bug.protocol}
                        </h3>
                        <Badge className={getSeverityColor(bug.severity)}>
                          <AlertTriangle className="w-3 h-3 mr-1" />
                          {bug.severity}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground mb-3 leading-relaxed">
                        "{bug.description}"
                      </p>
                      <Badge variant="outline" className="bg-muted/50 text-muted-foreground border-muted/30">
                        <Calendar className="w-3 h-3 mr-1" />
                        {bug.date}
                      </Badge>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="group-hover:border-destructive/60 transition-colors"
                      onClick={() => window.open(bug.link, '_blank')}
                    >
                      <Code className="w-4 h-4 mr-2" />
                      View PoC
                      <ExternalLink className="w-3 h-3 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center mt-16 p-12 rounded-lg bg-gradient-to-r from-primary/10 via-security/10 to-primary/10 border border-security/20">
          <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Ready to strengthen your protocol?
          </h3>
          <p className="text-xl text-foreground/80 mb-8 max-w-2xl mx-auto">
            Let's discuss how comprehensive testing and invariant campaigns can prepare your codebase for a successful audit.
          </p>
          <Button
            variant="primary"
            size="lg"
            className="group"
            onClick={() => navigate("/contact")}
          >
            <Shield className="w-5 h-5 mr-2 group-hover:animate-pulse" />
            Contact Us
          </Button>
        </section>
      </div>
    </div>
  );
};

export default Portfolio;
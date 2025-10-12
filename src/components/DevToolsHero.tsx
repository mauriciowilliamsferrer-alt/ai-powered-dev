import { Button } from "@/components/ui/button";
import { ArrowRight, Code2, Zap, Shield, Rocket } from "lucide-react";

export const DevToolsHero = () => {
  const scrollToContent = () => {
    document.getElementById("what-youll-learn")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToTools = () => {
    document.getElementById("tools-categories")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/10 -z-10" />
      
      <div className="container mx-auto px-4 text-center space-y-8">
        <div className="space-y-4 animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
            Master the Art of Web Development
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Your comprehensive guide to understanding and effectively using the essential tools that power modern web development. From frontend frameworks to deployment platforms, master every aspect of the development ecosystem.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <Button size="lg" onClick={scrollToContent} className="gap-2 shadow-lg hover:shadow-xl transition-shadow">
            Get Started
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button size="lg" variant="outline" onClick={scrollToTools} className="gap-2 border-primary/30 hover:border-primary/50">
            Explore Tools
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto pt-8 animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-card/50 border border-primary/10">
            <Code2 className="h-8 w-8 text-primary" />
            <p className="text-sm font-semibold">Modern Tools</p>
            <p className="text-xs text-muted-foreground text-center">Latest frameworks</p>
          </div>
          <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-card/50 border border-primary/10">
            <Zap className="h-8 w-8 text-primary" />
            <p className="text-sm font-semibold">Fast Learning</p>
            <p className="text-xs text-muted-foreground text-center">Structured guides</p>
          </div>
          <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-card/50 border border-primary/10">
            <Shield className="h-8 w-8 text-primary" />
            <p className="text-sm font-semibold">Best Practices</p>
            <p className="text-xs text-muted-foreground text-center">Industry standards</p>
          </div>
          <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-card/50 border border-primary/10">
            <Rocket className="h-8 w-8 text-primary" />
            <p className="text-sm font-semibold">Deploy Ready</p>
            <p className="text-xs text-muted-foreground text-center">Production deployment</p>
          </div>
        </div>
      </div>
    </section>
  );
};

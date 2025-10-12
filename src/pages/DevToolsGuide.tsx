import { DevToolsHero } from "@/components/DevToolsHero";
import { LearningPathCard } from "@/components/LearningPathCard";
import { CategorySection } from "@/components/CategorySection";
import { devToolsCategories, learningPaths } from "@/data/devToolsData";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Github, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const DevToolsGuide = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to AI Workflow
            </Button>
          </Link>
          <h2 className="text-lg font-semibold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            DevTools Guide
          </h2>
        </div>
      </header>

      {/* Hero Section */}
      <DevToolsHero />

      {/* What You'll Learn Section */}
      <section id="what-youll-learn" className="py-16 bg-gradient-to-b from-background to-primary/5">
        <div className="container mx-auto px-4 space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              What You'll Learn
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              This comprehensive resource covers the entire web development ecosystem, organized in a logical progression that mirrors real-world development workflows.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
            {learningPaths.map((path, index) => (
              <LearningPathCard 
                key={index}
                title={path.title}
                description={path.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Tools Categories */}
      <section id="tools-categories" className="py-16">
        <div className="container mx-auto px-4 space-y-16">
          {devToolsCategories.map((category, index) => (
            <CategorySection key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card/50 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">DevTools Guide</h3>
              <p className="text-sm text-muted-foreground">
                Your comprehensive guide to mastering modern web development tools and best practices.
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold">Frontend</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="https://react.dev" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">React</a></li>
                <li><a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Vite</a></li>
                <li><a href="https://tailwindcss.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Tailwind CSS</a></li>
                <li><a href="https://www.typescriptlang.org" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">TypeScript</a></li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold">Backend</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="https://nodejs.org" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Node.js</a></li>
                <li><a href="https://www.postgresql.org" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">PostgreSQL</a></li>
                <li><a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Supabase</a></li>
                <li><a href="https://www.docker.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Docker</a></li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="https://developer.mozilla.org" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">MDN Web Docs</a></li>
                <li><a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">GitHub</a></li>
                <li><a href="https://stackoverflow.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Stack Overflow</a></li>
                <li><a href="https://dev.to" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Dev.to</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              © 2025 Web Development Tools Guide • Made with <Heart className="h-3 w-3 text-red-500 fill-red-500" /> for developers
            </p>
            <div className="flex items-center gap-4">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <p className="text-xs text-muted-foreground">
                Built with React, Vite & Tailwind CSS
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DevToolsGuide;

import { DevToolCategory } from "@/data/devToolsData";
import { DevToolCard } from "./DevToolCard";

interface CategorySectionProps {
  category: DevToolCategory;
}

export const CategorySection = ({ category }: CategorySectionProps) => {
  return (
    <section className="space-y-4">
      <div className="space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
          {category.title}
        </h2>
        <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
          {category.description}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {category.tools.map((tool, index) => (
          <DevToolCard key={index} tool={tool} />
        ))}
      </div>
    </section>
  );
};

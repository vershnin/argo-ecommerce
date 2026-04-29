import { 
  Headphones, Watch, HardDrive, Mouse, Gamepad2, Camera, BatteryCharging, Disc
} from "lucide-react";
import { categories } from "@/data/products";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Headphones, Watch, HardDrive, Mouse, Gamepad2, Camera, BatteryCharging, Disc,
};

interface CategoriesSectionProps {
  onCategorySelect: (category: string) => void;
}

export function CategoriesSection({ onCategorySelect }: CategoriesSectionProps) {
  const handleCategoryClick = (categoryName: string) => {
    onCategorySelect(categoryName);
    document.querySelector("#products")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="categories" className="py-24 scroll-mt-header">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="section-line" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Browse by Category
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our wide range of premium electronics from world-leading brands
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category, index) => {
            const Icon = iconMap[category.icon] || Headphones;
            return (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.name)}
                className="category-card text-left cursor-pointer group"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-primary/8 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-base mb-1 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {category.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

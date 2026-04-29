import { ChevronDown, Shield, Truck, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  { icon: Shield, label: "Authorized Retailer" },
  { icon: Truck, label: "Nairobi Delivery" },
  { icon: Award, label: "Warranty Included" },
];

export function HeroSection() {
  const scrollToProducts = () => {
    document.querySelector("#products")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-20 hero-gradient overflow-hidden"
    >
      {/* Subtle decorative shapes */}
      <div className="absolute top-20 right-10 w-72 h-72 rounded-full border border-primary/10" />
      <div className="absolute bottom-32 left-8 w-48 h-48 rounded-full border border-primary/5" />
      <div className="absolute top-1/3 left-1/2 w-[600px] h-[600px] -translate-x-1/2 rounded-full bg-primary/[0.03] blur-3xl" />

      <div className="section-container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/15 text-primary text-sm font-semibold mb-8 animate-fade-in opacity-0" style={{ animationDelay: "0.1s" }}>
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Trusted by thousands in Nairobi
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6 animate-fade-in opacity-0" style={{ animationDelay: "0.2s" }}>
            Premium Tech,{" "}
            <span className="text-gradient">Delivered.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 animate-fade-in opacity-0 leading-relaxed" style={{ animationDelay: "0.3s" }}>
            Authorized retailer for Apple, Samsung, Anker, and more.
            Quality electronics at the best prices in Nairobi.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20 animate-fade-in opacity-0" style={{ animationDelay: "0.4s" }}>
            <Button
              size="lg"
              onClick={scrollToProducts}
              className="text-lg px-10 py-7 rounded-full glow-primary font-bold"
            >
              View Price List
              <ChevronDown className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
              className="text-lg px-10 py-7 rounded-full border-foreground/20 hover:border-primary hover:text-primary font-bold"
            >
              Get a Quote
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-10 animate-fade-in opacity-0" style={{ animationDelay: "0.5s" }}>
            {features.map((feature) => (
              <div key={feature.label} className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                  <feature.icon className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm font-semibold text-foreground/70">{feature.label}</span>
              </div>
            ))}
          </div>

          {/* Brand Logos */}
          <div className="mt-20 pt-12 border-t border-border animate-fade-in opacity-0" style={{ animationDelay: "0.6s" }}>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-8 font-medium">
              Authorized retailer for
            </p>
            <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16">
              {["Apple", "Samsung", "Sony", "JBL", "Anker", "Logitech"].map((brand) => (
                <span key={brand} className="text-xl md:text-2xl font-bold tracking-tight text-foreground/25 hover:text-primary transition-colors duration-300 cursor-default">
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-6 h-6 text-muted-foreground" />
      </div>
    </section>
  );
}

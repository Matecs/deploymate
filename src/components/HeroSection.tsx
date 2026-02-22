import { ArrowRight, ChevronDown } from "lucide-react";

const HeroSection = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16">
      <div className="absolute inset-0 bg-primary" style={{ background: "var(--hero-gradient)" }} />
      <div className="relative container text-center max-w-3xl mx-auto px-6 py-24">
        <p className="text-accent font-medium text-sm tracking-widest uppercase mb-6 animate-fade-in-up">
          Fractional Engineering Operations
        </p>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          Release & Compliance<br />Operations Architect
        </h1>
        <p className="text-primary-foreground/70 text-lg md:text-xl font-medium mb-4 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          109 releases/year · 1 rollback · 12+ cloud migrations with 0 downtime
        </p>
        <p className="text-primary-foreground/50 text-base md:text-lg max-w-2xl mx-auto mb-10 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
          With 18 years of enterprise experience, I fix your release pipeline and make your team audit‑ready — SOC2, ISO27001, SOX, NIS2.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
          <button
            onClick={() => scrollTo("cta")}
            className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-3.5 rounded-lg font-semibold text-base hover:opacity-90 transition-opacity"
          >
            Book a 15-Minute Call
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => scrollTo("packages")}
            className="inline-flex items-center gap-2 border border-primary-foreground/20 text-primary-foreground px-8 py-3.5 rounded-lg font-medium text-base hover:border-primary-foreground/40 transition-colors"
          >
            See What I Do
          </button>
        </div>
        <button
          onClick={() => scrollTo("audience")}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-primary-foreground/30 hover:text-primary-foreground/60 transition-colors animate-bounce"
        >
          <ChevronDown className="w-6 h-6" />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;

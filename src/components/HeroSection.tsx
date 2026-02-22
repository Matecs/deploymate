import { ArrowRight, ChevronDown } from "lucide-react";
import { useLang } from "@/lib/i18n";

const HeroSection = () => {
  const { t } = useLang();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16">
      <div className="absolute inset-0 bg-primary" style={{ background: "var(--hero-gradient)" }} />
      <div className="relative container text-center max-w-3xl mx-auto px-6 py-24">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight animate-fade-in-up">
          {t("hero.title")}
        </h1>
        <p className="text-primary-foreground/80 text-lg md:text-xl font-semibold mb-4 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          {t("hero.stats")}
        </p>
        <p className="text-primary-foreground/50 text-base md:text-lg max-w-2xl mx-auto mb-10 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          {t("hero.desc")}
        </p>
        <div className="animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
          <a
            href="https://calendly.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-10 py-4 rounded-lg font-bold text-lg hover:opacity-90 transition-opacity shadow-lg"
          >
            📅 {t("hero.cta")}
            <ArrowRight className="w-5 h-5" />
          </a>
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

import { ArrowRight, ChevronDown } from "lucide-react";
import { useLang } from "@/lib/i18n";

const HeroSection = () => {
  const { t } = useLang();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0" style={{ background: "var(--hero-gradient)" }} />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(210 40% 98%) 1px, transparent 1px), linear-gradient(90deg, hsl(210 40% 98%) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Radial glow accents */}
      <div
        className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full opacity-20"
        style={{ background: "radial-gradient(circle, hsl(160 72% 37% / 0.3) 0%, transparent 70%)" }}
      />
      <div
        className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] rounded-full opacity-15"
        style={{ background: "radial-gradient(circle, hsl(215 50% 50% / 0.3) 0%, transparent 70%)" }}
      />

      {/* Decorative pipeline lines */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
        <line x1="10%" y1="0" x2="10%" y2="100%" stroke="hsl(210 40% 98%)" strokeWidth="1" />
        <line x1="30%" y1="0" x2="30%" y2="100%" stroke="hsl(210 40% 98%)" strokeWidth="1" />
        <line x1="70%" y1="0" x2="70%" y2="100%" stroke="hsl(210 40% 98%)" strokeWidth="1" />
        <line x1="90%" y1="0" x2="90%" y2="100%" stroke="hsl(210 40% 98%)" strokeWidth="1" />
        <line x1="0" y1="30%" x2="100%" y2="30%" stroke="hsl(210 40% 98%)" strokeWidth="1" />
        <line x1="0" y1="70%" x2="100%" y2="70%" stroke="hsl(210 40% 98%)" strokeWidth="1" />
        {/* Pipeline nodes */}
        <circle cx="10%" cy="30%" r="4" fill="hsl(160 72% 37%)" opacity="0.4" />
        <circle cx="30%" cy="70%" r="4" fill="hsl(160 72% 37%)" opacity="0.3" />
        <circle cx="70%" cy="30%" r="4" fill="hsl(160 72% 37%)" opacity="0.35" />
        <circle cx="90%" cy="70%" r="4" fill="hsl(160 72% 37%)" opacity="0.25" />
        <circle cx="30%" cy="30%" r="3" fill="hsl(210 40% 98%)" opacity="0.15" />
        <circle cx="70%" cy="70%" r="3" fill="hsl(210 40% 98%)" opacity="0.15" />
      </svg>

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
            href="https://calendar.app.google/qVYtuXUBupAUzsQ18"
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

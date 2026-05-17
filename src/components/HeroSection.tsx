import { ArrowRight, ChevronDown } from "lucide-react";
import { useLang } from "@/lib/i18n";
import heroBgMobile from "@/assets/hero-bg-clean-mobile.jpg";
import heroBgDesktop from "@/assets/hero-bg-clean-desktop.jpg";
import heroBgMobileWebp from "@/assets/hero-bg-clean-mobile.webp";
import heroBgDesktopWebp from "@/assets/hero-bg-clean-desktop.webp";

const HeroSection = () => {
  const { t, lang } = useLang();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" aria-label="Hero" className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      <picture className="absolute inset-0 w-full h-full">
        <source media="(min-width: 768px)" srcSet={heroBgDesktopWebp} type="image/webp" />
        <source srcSet={heroBgMobileWebp} type="image/webp" />
        <source media="(min-width: 768px)" srcSet={heroBgDesktop} type="image/jpeg" />
        <img src={heroBgMobile} alt="" className="absolute inset-0 w-full h-full object-cover" fetchPriority="high" />
      </picture>

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
        <circle cx="10%" cy="30%" r="4" fill="hsl(160 72% 37%)" opacity="0.4" />
        <circle cx="30%" cy="70%" r="4" fill="hsl(160 72% 37%)" opacity="0.3" />
        <circle cx="70%" cy="30%" r="4" fill="hsl(160 72% 37%)" opacity="0.35" />
        <circle cx="90%" cy="70%" r="4" fill="hsl(160 72% 37%)" opacity="0.25" />
        <circle cx="30%" cy="30%" r="3" fill="hsl(210 40% 98%)" opacity="0.15" />
        <circle cx="70%" cy="70%" r="3" fill="hsl(210 40% 98%)" opacity="0.15" />
      </svg>

      <div className="relative container text-center max-w-3xl mx-auto px-6 py-24">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight animate-fade-in-up">
          <span>{t("hero.title")}</span>
          <br />
          <span className="text-accent">{t("hero.titleHighlight")}</span>
        </h1>
        <p className="text-primary-foreground/80 text-base md:text-lg font-semibold mb-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          {t("hero.stats")}
        </p>
        <p className="text-primary-foreground/60 text-base md:text-lg max-w-2xl mx-auto mb-10 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          {t("hero.desc")}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
          <button
            onClick={() => scrollTo("cta")}
            className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-4 rounded-lg font-bold text-base md:text-lg hover:opacity-90 transition-opacity shadow-lg"
          >
            {t("hero.cta")}
            <ArrowRight className="w-5 h-5" />
          </button>
          <button
            onClick={() => scrollTo("packages")}
            className="inline-flex items-center gap-2 border border-primary-foreground/30 text-primary-foreground px-8 py-4 rounded-lg font-semibold text-base md:text-lg hover:bg-primary-foreground/10 transition-colors"
          >
            {t("hero.ctaSecondary")}
          </button>
        </div>
        <button
          onClick={() => scrollTo("pain-points")}
          aria-label={lang === "en" ? "Scroll to challenges" : "Tovább a kihívásokhoz"}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-primary-foreground/30 hover:text-primary-foreground/60 transition-colors animate-bounce"
        >
          <ChevronDown className="w-6 h-6" />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;

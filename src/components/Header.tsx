import { Shield } from "lucide-react";
import { useLang } from "@/lib/i18n";

const Header = () => {
  const { lang, setLang, t } = useLang();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
      <div className="container flex items-center justify-between h-16">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-accent" />
          <span className="font-semibold text-foreground text-sm">RCOA</span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <button onClick={() => scrollTo("packages")} className="hover:text-foreground transition-colors">{t("nav.services")}</button>
          <button onClick={() => scrollTo("credibility")} className="hover:text-foreground transition-colors">{t("nav.whyMe")}</button>
          <button onClick={() => scrollTo("process")} className="hover:text-foreground transition-colors">{t("nav.process")}</button>
          <button
            onClick={() => setLang(lang === "en" ? "hu" : "en")}
            className="px-3 py-1.5 rounded-md border border-border text-foreground font-medium text-xs hover:bg-muted transition-colors"
          >
            {lang === "en" ? "HU 🇭🇺" : "EN 🇬🇧"}
          </button>
          <button onClick={() => scrollTo("cta")} className="hover:text-foreground transition-colors bg-accent text-accent-foreground px-4 py-2 rounded-md font-medium">
            {t("nav.bookCall")}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;

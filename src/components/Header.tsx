import { Shield, Menu } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";

const Header = () => {
  const { lang, setLang, t } = useLang();
  const [open, setOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
      <div className="container flex items-center justify-between h-16">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-accent" />
          <span className="font-semibold text-foreground text-sm">RCOA</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
          <button onClick={() => scrollTo("audience")} className="hover:text-foreground transition-colors">{t("nav.audience")}</button>
          <button onClick={() => scrollTo("packages")} className="hover:text-foreground transition-colors">{t("nav.services")}</button>
          <button onClick={() => scrollTo("credibility")} className="hover:text-foreground transition-colors">{t("nav.whyMe")}</button>
          
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

        {/* Language switcher + mobile menu */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setLang(lang === "en" ? "hu" : "en")}
            className="px-3 py-1.5 rounded-md border border-border text-foreground font-medium text-xs hover:bg-muted transition-colors"
          >
            {lang === "en" ? "HU 🇭🇺" : "EN 🇬🇧"}
          </button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button className="p-2 text-foreground">
                <Menu className="w-5 h-5" />
              </button>
            </SheetTrigger>
          <SheetContent side="right" className="w-64 bg-card">
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <div className="flex flex-col gap-6 mt-8 text-sm">
              <button onClick={() => scrollTo("audience")} className="text-left text-muted-foreground hover:text-foreground transition-colors">{t("nav.audience")}</button>
              <button onClick={() => scrollTo("packages")} className="text-left text-muted-foreground hover:text-foreground transition-colors">{t("nav.services")}</button>
              <button onClick={() => scrollTo("credibility")} className="text-left text-muted-foreground hover:text-foreground transition-colors">{t("nav.whyMe")}</button>
              
              <button
                onClick={() => setLang(lang === "en" ? "hu" : "en")}
                className="w-fit px-3 py-1.5 rounded-md border border-border text-foreground font-medium text-xs hover:bg-muted transition-colors"
              >
                {lang === "en" ? "HU 🇭🇺" : "EN 🇬🇧"}
              </button>
              <button onClick={() => scrollTo("cta")} className="bg-accent text-accent-foreground px-4 py-2 rounded-md font-medium text-center">
                {t("nav.bookCall")}
              </button>
            </div>
          </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;

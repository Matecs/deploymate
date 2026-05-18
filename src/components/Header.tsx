import { Menu } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import datamateLogo from "@/assets/datamate-logo.svg";

const FlagHU = () => (
  <svg width="20" height="14" viewBox="0 0 20 14" className="inline-block rounded-sm">
    <rect width="20" height="4.67" fill="#CE2939" />
    <rect y="4.67" width="20" height="4.67" fill="#fff" />
    <rect y="9.33" width="20" height="4.67" fill="#477050" />
  </svg>
);

const FlagGB = () => (
  <svg width="20" height="14" viewBox="0 0 60 30" className="inline-block rounded-sm">
    <clipPath id="s"><path d="M0,0 v30 h60 v-30 z"/></clipPath>
    <clipPath id="t"><path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z"/></clipPath>
    <g clipPath="url(#s)">
      <path d="M0,0 v30 h60 v-30 z" fill="#012169"/>
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
      <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#t)" stroke="#C8102E" strokeWidth="4"/>
      <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10"/>
      <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6"/>
    </g>
  </svg>
);

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
          <img src={datamateLogo} alt="DeployMate — QA-Driven Release & Compliance Operations" className="h-12 w-auto" />
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
          <button onClick={() => scrollTo("pain-points")} className="hover:text-foreground transition-colors">{t("nav.painPoints")}</button>
          <button onClick={() => scrollTo("audience")} className="hover:text-foreground transition-colors">{t("nav.audience")}</button>
          <button onClick={() => scrollTo("packages")} className="hover:text-foreground transition-colors">{t("nav.services")}</button>
          <button onClick={() => scrollTo("how-it-works")} className="hover:text-foreground transition-colors">{t("nav.howItWorks")}</button>
          <button onClick={() => scrollTo("credibility")} className="hover:text-foreground transition-colors">{t("nav.whyMe")}</button>
          
          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => setLang(lang === "en" ? "hu" : "en")}
                  className="px-3 py-1.5 rounded-md border border-border text-foreground font-medium text-xs hover:bg-muted transition-colors"
                >
                  <span className="flex items-center gap-1.5">{lang === "en" ? <><FlagHU /> HU</> : <><FlagGB /> EN</>}</span>
                </button>
              </TooltipTrigger>
              <TooltipContent>{lang === "en" ? "Switch to Hungarian" : "Váltás angolra"}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <button onClick={() => scrollTo("cta")} className="hover:text-foreground transition-colors bg-accent text-accent-foreground px-4 py-2 rounded-md font-medium">
            {t("nav.bookCall")}
          </button>
        </nav>

        {/* Language switcher + mobile menu */}
        <div className="flex md:hidden items-center gap-2">
          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => setLang(lang === "en" ? "hu" : "en")}
                  className="px-3 py-1.5 rounded-md border border-border text-foreground font-medium text-xs hover:bg-muted transition-colors"
                >
                  <span className="flex items-center gap-1.5">{lang === "en" ? <><FlagHU /> HU</> : <><FlagGB /> EN</>}</span>
                </button>
              </TooltipTrigger>
              <TooltipContent>{lang === "en" ? "Switch to Hungarian" : "Váltás angolra"}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button className="p-2 text-foreground" aria-label="Open menu">
                <Menu className="w-5 h-5" />
              </button>
            </SheetTrigger>
          <SheetContent side="right" className="w-64 bg-card">
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <div className="flex flex-col gap-6 mt-8 text-sm">
              <button onClick={() => scrollTo("pain-points")} className="text-left text-muted-foreground hover:text-foreground transition-colors">{t("nav.painPoints")}</button>
              <button onClick={() => scrollTo("audience")} className="text-left text-muted-foreground hover:text-foreground transition-colors">{t("nav.audience")}</button>
              <button onClick={() => scrollTo("packages")} className="text-left text-muted-foreground hover:text-foreground transition-colors">{t("nav.services")}</button>
              <button onClick={() => scrollTo("how-it-works")} className="text-left text-muted-foreground hover:text-foreground transition-colors">{t("nav.howItWorks")}</button>
              <button onClick={() => scrollTo("credibility")} className="text-left text-muted-foreground hover:text-foreground transition-colors">{t("nav.whyMe")}</button>
              
              <TooltipProvider delayDuration={300}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => setLang(lang === "en" ? "hu" : "en")}
                      className="w-fit px-3 py-1.5 rounded-md border border-border text-foreground font-medium text-xs hover:bg-muted transition-colors"
                    >
                      <span className="flex items-center gap-1.5">{lang === "en" ? <><FlagHU /> HU</> : <><FlagGB /> EN</>}</span>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>{lang === "en" ? "Switch to Hungarian" : "Váltás angolra"}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
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

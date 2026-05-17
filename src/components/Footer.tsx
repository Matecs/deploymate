import { useLang } from "@/lib/i18n";
import datamateLogo from "@/assets/datamate-logo.png";

const Footer = () => {
  const { t } = useLang();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="border-t border-border py-12">
      <div className="container max-w-5xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <img src={datamateLogo} alt="DeployMate logo" className="h-10 w-auto" loading="lazy" />
            <p className="text-muted-foreground text-sm">{t("footer.tagline")}</p>
          </div>

          {/* Navigation */}
          <div className="flex flex-col items-center gap-2">
            <p className="text-foreground font-semibold text-sm mb-1">{t("footer.nav")}</p>
            <button onClick={() => scrollTo("pain-points")} className="text-muted-foreground text-sm hover:text-foreground transition-colors">{t("nav.painPoints")}</button>
            <button onClick={() => scrollTo("packages")} className="text-muted-foreground text-sm hover:text-foreground transition-colors">{t("nav.services")}</button>
            <button onClick={() => scrollTo("how-it-works")} className="text-muted-foreground text-sm hover:text-foreground transition-colors">{t("nav.howItWorks")}</button>
            <button onClick={() => scrollTo("credibility")} className="text-muted-foreground text-sm hover:text-foreground transition-colors">{t("nav.whyMe")}</button>
          </div>

          {/* Contact */}
          <div className="flex flex-col items-center md:items-end gap-2">
            <p className="text-foreground font-semibold text-sm mb-1">{t("footer.contact")}</p>
            <a href="mailto:mate@deploymate.hu" className="text-muted-foreground text-sm hover:text-foreground transition-colors">mate@deploymate.hu</a>
            <a href="tel:+36204349647" className="text-muted-foreground text-sm hover:text-foreground transition-colors">+36 20 434 9647</a>
            <a href="https://deploymate.hu" target="_blank" rel="noopener noreferrer" className="text-muted-foreground text-sm hover:text-foreground transition-colors">DeployMate.hu</a>
          </div>
        </div>

        <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} DeployMate</p>
          <p className="text-accent/70 font-medium">{t("footer.precision")}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

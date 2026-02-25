import { ArrowRight } from "lucide-react";
import { useLang } from "@/lib/i18n";
import datamateLogo from "@/assets/datamate-logo.png";

const Footer = () => {
  const { t } = useLang();

  return (
    <footer className="border-t border-border py-10">
      <div className="container max-w-5xl mx-auto px-6 flex flex-col items-center gap-5 text-sm text-muted-foreground text-center">
        <a
          href="https://calendar.app.google/qVYtuXUBupAUzsQ18"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-3 rounded-lg font-bold text-base hover:opacity-90 transition-opacity shadow-lg"
        >
          📅 {t("footer.calendlyBtn")}
          <ArrowRight className="w-4 h-4" />
        </a>
        <p className="text-muted-foreground text-xs">
          <a href="mailto:mate@datamate.hu" className="hover:text-foreground transition-colors">mate@datamate.hu</a>
          {" · "}
          <span>{t("footer.hours")}</span>
        </p>
        <div className="flex items-center gap-2 mt-2">
          <span>Powered by</span>
          <img src={datamateLogo} alt="DataMate logo" className="h-10 w-auto" />
        </div>
        <p className="font-medium text-foreground">{t("footer.tagline")}</p>
        <p>
          <a href="https://datamate.hu" className="hover:text-foreground transition-colors">DataMate.hu</a>
          {" | "}
          <span className="cursor-text select-all">info@datamate.hu</span>
        </p>
        <p>
          <span className="cursor-text select-all">+36 20 434 9647</span>
        </p>
        <p>Copyright © {new Date().getFullYear()} DataMate</p>
      </div>
    </footer>
  );
};

export default Footer;

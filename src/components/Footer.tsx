import { useLang } from "@/lib/i18n";
import datamateLogo from "@/assets/datamate-logo.png";

const Footer = () => {
  const { t } = useLang();

  return (
    <footer className="border-t border-border py-10">
      <div className="container max-w-5xl mx-auto px-6 flex flex-col items-center gap-4 text-sm text-muted-foreground text-center">
        <div className="flex items-center gap-2">
          <span>Powered by</span>
          <img src={datamateLogo} alt="DataMate logo" className="h-10 w-auto" />
        </div>
        <p className="font-medium text-foreground">Release & Compliance Operations Architect</p>
        <p>
          <a href="https://datamate.hu" className="hover:text-foreground transition-colors">DataMate.hu</a>
          {" | "}
          <a href="mailto:info@datamate.hu" className="hover:text-foreground transition-colors">info@datamate.hu</a>
        </p>
        <p>
          <a href="tel:+36204349647" className="hover:text-foreground transition-colors">+36 20 434 9647</a>
        </p>
        <p>Copyright © {new Date().getFullYear()} DataMate</p>
      </div>
    </footer>
  );
};

export default Footer;

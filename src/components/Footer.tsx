import { Shield, ArrowRight } from "lucide-react";
import { useLang } from "@/lib/i18n";

const Footer = () => {
  const { t } = useLang();

  return (
    <footer className="border-t border-border py-10">
      <div className="container max-w-5xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-accent" />
            <span>{t("footer.tagline")}</span>
          </div>
          <p>© {new Date().getFullYear()} · {t("footer.rights")}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

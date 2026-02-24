import { ArrowRight } from "lucide-react";
import { useLang } from "@/lib/i18n";

const CTASection = () => {
  const { t } = useLang();

  return (
    <section id="cta" className="py-16 md:py-20 bg-muted/50">
      <div className="container max-w-2xl mx-auto px-6 text-center">
        <p className="text-accent font-medium text-sm tracking-widest uppercase mb-4">{t("cta.tag")}</p>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">{t("cta.title")}</h2>
        <p className="text-muted-foreground text-base leading-relaxed mb-4">{t("cta.desc")}</p>
        <div className="mb-10" />
        <a
          href="https://calendar.app.google/qVYtuXUBupAUzsQ18"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-10 py-4 rounded-lg font-bold text-lg hover:opacity-90 transition-opacity shadow-lg"
        >
          {t("cta.bookBtn")}
          <ArrowRight className="w-5 h-5" />
        </a>
      </div>
    </section>
  );
};

export default CTASection;

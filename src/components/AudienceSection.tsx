import { AlertTriangle, Search, Shield } from "lucide-react";
import { useLang } from "@/lib/i18n";

const AudienceSection = () => {
  const { t } = useLang();

  const items = [
    { icon: Shield, text: t("audience.item1") },
    { icon: AlertTriangle, text: t("audience.item2") },
    { icon: Search, text: t("audience.item3") },
  ];

  return (
    <section id="audience" className="py-16 md:py-20">
      <div className="container max-w-3xl mx-auto px-6 text-center">
        <p className="text-accent font-medium text-sm tracking-widest uppercase mb-4">{t("audience.tag")}</p>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t("audience.title")}</h2>
        <p className="text-muted-foreground mb-14 text-lg">{t("audience.subtitle")}</p>
        <div className="grid gap-6 text-left">
          {items.map((item, i) => (
            <div key={i} className="flex items-start gap-4 bg-card rounded-lg p-6 border border-border" style={{ boxShadow: "var(--card-shadow)" }}>
              <div className="flex-shrink-0 w-10 h-10 rounded-md bg-accent/10 flex items-center justify-center">
                <item.icon className="w-5 h-5 text-accent" />
              </div>
              <p className="text-foreground font-medium text-base leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AudienceSection;

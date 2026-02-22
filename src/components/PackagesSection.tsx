import { ClipboardCheck, FileText, Cloud } from "lucide-react";
import { useLang } from "@/lib/i18n";

const PackagesSection = () => {
  const { t } = useLang();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const packages = [
    {
      icon: ClipboardCheck,
      title: t("packages.p1.title"),
      description: t("packages.p1.desc"),
      bullets: [t("packages.p1.b1"), t("packages.p1.b2"), t("packages.p1.b3")],
    },
    {
      icon: FileText,
      title: t("packages.p2.title"),
      description: t("packages.p2.desc"),
      bullets: [t("packages.p2.b1"), t("packages.p2.b2"), t("packages.p2.b3")],
    },
    {
      icon: Cloud,
      title: t("packages.p3.title"),
      description: t("packages.p3.desc"),
      bullets: [t("packages.p3.b1"), t("packages.p3.b2"), t("packages.p3.b3")],
    },
  ];

  return (
    <section id="packages" className="py-24 md:py-32 bg-muted/50">
      <div className="container max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-accent font-medium text-sm tracking-widest uppercase mb-4">{t("packages.tag")}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t("packages.title")}</h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">{t("packages.subtitle")}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {packages.map((pkg, i) => (
            <div key={i} className="bg-card rounded-xl border border-border p-8 flex flex-col transition-shadow hover:shadow-lg" style={{ boxShadow: "var(--card-shadow)" }}>
              <div className="w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center mb-5">
                <pkg.icon className="w-5 h-5 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{pkg.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">{pkg.description}</p>
              <ul className="space-y-3 mb-8 flex-1">
                {pkg.bullets.map((b, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-foreground/80">
                    <span className="text-accent mt-1 flex-shrink-0">✓</span>
                    {b}
                  </li>
                ))}
              </ul>
              <button onClick={() => scrollTo("cta")} className="w-full py-2.5 rounded-md border border-border text-foreground font-medium text-sm hover:bg-muted transition-colors">
                {t("packages.requestBtn")}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PackagesSection;

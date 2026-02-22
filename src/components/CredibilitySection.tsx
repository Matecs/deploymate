import { Award, Cloud, Layers, ShieldCheck, Quote } from "lucide-react";
import { useLang } from "@/lib/i18n";

const CredibilitySection = () => {
  const { t } = useLang();

  const credentials = [
    { icon: Award, text: t("cred.c1") },
    { icon: Layers, text: t("cred.c2") },
    { icon: Cloud, text: t("cred.c3") },
    { icon: ShieldCheck, text: t("cred.c4") },
  ];

  const testimonials = [t("cred.t1"), t("cred.t2"), t("cred.t3")];

  return (
    <section id="credibility" className="py-24 md:py-32">
      <div className="container max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-accent font-medium text-sm tracking-widest uppercase mb-4">{t("cred.tag")}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">{t("cred.title")}</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          <div className="space-y-5">
            {credentials.map((c, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="flex-shrink-0 w-9 h-9 rounded-md bg-accent/10 flex items-center justify-center">
                  <c.icon className="w-4 h-4 text-accent" />
                </div>
                <p className="text-foreground text-sm leading-relaxed pt-1.5">{c.text}</p>
              </div>
            ))}
          </div>
          <div className="space-y-6">
            {testimonials.map((txt, i) => (
              <div key={i} className="bg-card rounded-lg border border-border p-6 relative" style={{ boxShadow: "var(--card-shadow)" }}>
                <Quote className="w-5 h-5 text-accent/30 absolute top-4 right-4" />
                <p className="text-foreground/80 text-sm leading-relaxed italic">"{txt}"</p>
                <p className="text-muted-foreground text-xs mt-3">{t("cred.source")}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CredibilitySection;

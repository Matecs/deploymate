import { Phone, Search, FileCheck } from "lucide-react";
import { useLang } from "@/lib/i18n";

const ProcessSection = () => {
  const { t } = useLang();

  const steps = [
    { icon: Phone, number: "01", title: t("process.s1.title"), description: t("process.s1.desc") },
    { icon: Search, number: "02", title: t("process.s2.title"), description: t("process.s2.desc") },
    { icon: FileCheck, number: "03", title: t("process.s3.title"), description: t("process.s3.desc") },
  ];

  return (
    <section id="process" className="py-24 md:py-32 bg-muted/50">
      <div className="container max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-accent font-medium text-sm tracking-widest uppercase mb-4">{t("process.tag")}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">{t("process.title")}</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="text-center">
              <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-5">
                <step.icon className="w-6 h-6 text-accent" />
              </div>
              <span className="text-accent font-mono text-xs font-semibold">{step.number}</span>
              <h3 className="text-lg font-bold text-foreground mt-1 mb-2">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;

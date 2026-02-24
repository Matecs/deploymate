import { ClipboardCheck, FileText, Cloud } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { motion } from "framer-motion";

const PackagesSection = () => {
  const { t } = useLang();

  const packages = [
    {
      icon: ClipboardCheck,
      title: t("packages.p1.title"),
      description: t("packages.p1.desc"),
      price: t("packages.p1.price"),
    },
    {
      icon: FileText,
      title: t("packages.p2.title"),
      description: t("packages.p2.desc"),
      price: t("packages.p2.price"),
    },
    {
      icon: Cloud,
      title: t("packages.p3.title"),
      description: t("packages.p3.desc"),
      price: t("packages.p3.price"),
    },
  ];

  return (
    <section id="packages" className="py-16 md:py-20 bg-muted/50">
      <div className="container max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5 }} className="text-accent font-medium text-sm tracking-widest uppercase mb-4">{t("packages.tag")}</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay: 0.1 }} className="text-3xl md:text-4xl font-bold text-foreground">{t("packages.title")}</motion.h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {packages.map((pkg, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay: i * 0.15 }} className="bg-card rounded-xl border border-border p-8 flex flex-col text-center transition-shadow hover:shadow-lg" style={{ boxShadow: "var(--card-shadow)" }}>
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mx-auto mb-5">
                <pkg.icon className="w-5 h-5 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">{pkg.title}</h3>
              <p className="text-accent font-semibold text-sm mb-4">{pkg.price}</p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-8 flex-1">{pkg.description}</p>
              <a
                href="https://calendar.app.google/qVYtuXUBupAUzsQ18"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-lg bg-accent text-accent-foreground font-semibold text-sm hover:opacity-90 transition-opacity text-center block"
              >
                {t("packages.requestBtn")}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PackagesSection;

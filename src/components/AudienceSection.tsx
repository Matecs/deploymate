import { AlertTriangle, Search, Shield } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { motion } from "framer-motion";

const AudienceSection = () => {
  const { t } = useLang();

  const items = [
    { icon: Shield, text: t("audience.item1") },
    { icon: AlertTriangle, text: t("audience.item2") },
    { icon: Search, text: t("audience.item3") },
  ];

  return (
    <section id="audience" aria-label="Target audience" className="py-16 md:py-20">
      <div className="container max-w-3xl mx-auto px-6 text-center">
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5 }} className="text-accent font-medium text-sm tracking-widest uppercase mb-4">{t("audience.tag")}</motion.p>
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay: 0.1 }} className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t("audience.title")}</motion.h2>
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay: 0.15 }} className="text-muted-foreground mb-14 text-lg">{t("audience.subtitle")}</motion.p>
        <div className="grid gap-6 text-left">
          {items.map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay: i * 0.1 }} whileHover={{ scale: 1.01, borderColor: "hsl(160 72% 37% / 0.4)" }} className="flex items-start gap-4 bg-card rounded-lg p-6 border border-border transition-shadow hover:shadow-lg" style={{ boxShadow: "var(--card-shadow)" }}>
              <div className="flex-shrink-0 w-10 h-10 rounded-md bg-accent/10 flex items-center justify-center">
                <item.icon className="w-5 h-5 text-accent" />
              </div>
              <p className="text-foreground font-medium text-base leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AudienceSection;

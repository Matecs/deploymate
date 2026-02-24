import { ArrowRight } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { motion } from "framer-motion";

const CTASection = () => {
  const { t } = useLang();

  return (
    <section id="cta" className="py-16 md:py-20 bg-muted/50">
      <div className="container max-w-2xl mx-auto px-6 text-center">
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5 }} className="text-accent font-medium text-sm tracking-widest uppercase mb-4">{t("cta.tag")}</motion.p>
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay: 0.1 }} className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">{t("cta.title")}</motion.h2>
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay: 0.15 }} className="text-muted-foreground text-base leading-relaxed mb-4">{t("cta.desc")}</motion.p>
        <div className="mb-10" />
        <motion.a
          initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay: 0.25 }}
          href="https://calendar.app.google/qVYtuXUBupAUzsQ18"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-10 py-4 rounded-lg font-bold text-lg hover:opacity-90 transition-opacity shadow-lg"
        >
          {t("cta.bookBtn")}
          <ArrowRight className="w-5 h-5" />
        </motion.a>
      </div>
    </section>
  );
};

export default CTASection;

import { Mail, Phone } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { motion } from "framer-motion";

const CTASection = () => {
  const { t } = useLang();

  return (
    <section id="cta" aria-label="Contact" className="py-16 md:py-20 bg-muted/50">
      <div className="container max-w-2xl mx-auto px-6 text-center">
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5 }} className="text-accent font-medium text-sm tracking-widest uppercase mb-4">{t("cta.tag")}</motion.p>
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay: 0.1 }} className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">{t("cta.title")}</motion.h2>
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay: 0.15 }} className="text-muted-foreground text-base leading-relaxed mb-8">{t("cta.desc")}</motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay: 0.25 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="mailto:mate@datamate.hu"
            className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-4 rounded-lg font-bold text-lg hover:opacity-90 transition-opacity shadow-lg"
          >
            <Mail className="w-5 h-5" />
            mate@datamate.hu
          </a>
          <a
            href="tel:+36204349647"
            className="inline-flex items-center gap-2 bg-accent/10 text-accent px-8 py-4 rounded-lg font-bold text-lg hover:bg-accent/20 transition-colors"
          >
            <Phone className="w-5 h-5" />
            +36 20 434 9647
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;

import { Quote } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { motion } from "framer-motion";

const CredibilitySection = () => {
  const { t } = useLang();

  const testimonials = [t("cred.t1"), t("cred.t2")];

  return (
    <section id="credibility" className="py-16 md:py-20">
      <div className="container max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5 }} className="text-accent font-medium text-sm tracking-widest uppercase mb-4">{t("cred.tag")}</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay: 0.1 }} className="text-3xl md:text-4xl font-bold text-foreground">{t("cred.title")}</motion.h2>
        </div>
        <div className="space-y-8">
          {testimonials.map((txt, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay: i * 0.15 }} className="bg-card rounded-xl border border-border p-8 relative" style={{ boxShadow: "var(--card-shadow)" }}>
              <Quote className="w-6 h-6 text-accent/20 absolute top-6 right-6" />
              <p className="text-foreground/80 text-base leading-relaxed italic">"{txt}"</p>
              <p className="text-muted-foreground text-sm mt-4">{t("cred.source")}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CredibilitySection;

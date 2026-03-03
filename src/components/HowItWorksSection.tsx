import { Phone, Package, Repeat } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { motion } from "framer-motion";

const HowItWorksSection = () => {
  const { t } = useLang();

  const steps = [
    { icon: Phone, num: "1", title: t("how.step1.title"), desc: t("how.step1.desc") },
    { icon: Package, num: "2", title: t("how.step2.title"), desc: t("how.step2.desc") },
    { icon: Repeat, num: "3", title: t("how.step3.title"), desc: t("how.step3.desc") },
  ];

  return (
    <section id="how-it-works" aria-label="How it works" className="py-16 md:py-20">
      <div className="container max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5 }} className="text-accent font-medium text-sm tracking-widest uppercase mb-4">{t("how.tag")}</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay: 0.1 }} className="text-3xl md:text-4xl font-bold text-foreground">{t("how.title")}</motion.h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="text-center"
            >
              <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4 relative">
                <step.icon className="w-6 h-6 text-accent" />
                <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-accent text-accent-foreground text-xs font-bold flex items-center justify-center">
                  {step.num}
                </span>
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;

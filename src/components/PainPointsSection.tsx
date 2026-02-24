import { Flame, FileSearch, GitBranch, EyeOff } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { motion } from "framer-motion";

const PainPointsSection = () => {
  const { t } = useLang();

  const items = [
    { icon: Flame, text: t("pain.item1") },
    { icon: FileSearch, text: t("pain.item2") },
    { icon: GitBranch, text: t("pain.item3") },
    { icon: EyeOff, text: t("pain.item4") },
  ];

  return (
    <section id="pain-points" className="py-16 md:py-20 bg-muted/30">
      <div className="container max-w-3xl mx-auto px-6 text-center">
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5 }} className="text-accent font-medium text-sm tracking-widest uppercase mb-4">{t("pain.tag")}</motion.p>
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay: 0.1 }} className="text-3xl md:text-4xl font-bold text-foreground mb-14">{t("pain.title")}</motion.h2>
        <div className="grid gap-6 text-left">
          {items.map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay: i * 0.1 }} className="flex items-start gap-4 bg-card rounded-lg p-6 border border-border" style={{ boxShadow: "var(--card-shadow)" }}>
              <div className="flex-shrink-0 w-10 h-10 rounded-md bg-destructive/10 flex items-center justify-center">
                <item.icon className="w-5 h-5 text-destructive" />
              </div>
              <p className="text-foreground font-medium text-base leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PainPointsSection;

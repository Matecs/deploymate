import { Quote, CheckCircle2, TrendingDown, Zap, ShieldCheck, Clock } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { motion } from "framer-motion";

const CredibilitySection = () => {
  const { t } = useLang();

  const testimonials = [t("cred.t1"), t("cred.t2")];

  const stats = [
    { value: t("cred.case.stat1.value"), label: t("cred.case.stat1.label"), icon: TrendingDown },
    { value: t("cred.case.stat2.value"), label: t("cred.case.stat2.label"), icon: Zap },
    { value: t("cred.case.stat3.value"), label: t("cred.case.stat3.label"), icon: ShieldCheck },
    { value: t("cred.case.stat4.value"), label: t("cred.case.stat4.label"), icon: Clock },
  ];

  const week1Items = t("cred.case.week1.items").split("|");
  const week2Items = t("cred.case.week2.items").split("|");

  return (
    <section id="credibility" aria-label="Credibility and track record" className="py-16 md:py-20">
      <div className="container max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5 }} className="text-accent font-medium text-sm tracking-widest uppercase mb-4">{t("cred.tag")}</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay: 0.1 }} className="text-3xl md:text-4xl font-bold text-foreground">{t("cred.title")}</motion.h2>
        </div>

        {/* Testimonials */}
        <div className="space-y-8">
          {testimonials.map((txt, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay: i * 0.15 }} className="bg-card rounded-xl border border-border p-8 relative" style={{ boxShadow: "var(--card-shadow)" }}>
              <Quote className="w-6 h-6 text-accent/20 absolute top-6 right-6" />
              <p className="text-foreground/80 text-base leading-relaxed italic">"{txt}"</p>
              <p className="text-muted-foreground text-sm mt-4">{t("cred.source")}</p>
            </motion.div>
          ))}
        </div>

        {/* Case Study */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16"
        >
          <p className="text-accent font-medium text-sm tracking-widest uppercase mb-3 text-center">{t("cred.case.tag")}</p>
          <h3 className="text-xl md:text-2xl font-bold text-foreground text-center mb-10">{t("cred.case.title")}</h3>

          {/* Stats grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-card rounded-xl border border-border p-5 text-center"
                style={{ boxShadow: "var(--card-shadow)" }}
              >
                <stat.icon className="w-5 h-5 text-accent mx-auto mb-2" />
                <p className="text-2xl md:text-3xl font-bold text-accent">{stat.value}</p>
                <p className="text-muted-foreground text-xs mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 md:left-6 top-0 bottom-0 w-px bg-border" />

            {/* Week 1 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative pl-12 md:pl-16 mb-8"
            >
              <div className="absolute left-2 md:left-4 top-1 w-4 h-4 rounded-full bg-accent border-2 border-background" />
              <h4 className="text-base font-semibold text-foreground mb-3">{t("cred.case.week1.title")}</h4>
              <ul className="space-y-2">
                {week1Items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-foreground/80 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Week 2 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="relative pl-12 md:pl-16"
            >
              <div className="absolute left-2 md:left-4 top-1 w-4 h-4 rounded-full bg-accent border-2 border-background" />
              <h4 className="text-base font-semibold text-foreground mb-3">{t("cred.case.week2.title")}</h4>
              <ul className="space-y-2">
                {week2Items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-foreground/80 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-muted-foreground text-xs uppercase tracking-widest mb-4">{t("cred.badges")}</p>
          <div className="flex items-center justify-center gap-6 flex-wrap">
            {["SOC2", "ISO 27001", "SOX", "GDPR"].map((badge) => (
              <div
                key={badge}
                className="px-4 py-2 rounded-md border border-border bg-muted/30 text-muted-foreground text-xs font-semibold tracking-wider"
              >
                {badge}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CredibilitySection;

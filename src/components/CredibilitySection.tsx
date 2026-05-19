import { CheckCircle2, TrendingDown, Zap, ShieldCheck, Clock, AlertTriangle, Wrench } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { motion } from "framer-motion";

const CredibilitySection = () => {
  const { t } = useLang();

  const testimonials = [
    { text: t("cred.t1"), source: t("cred.t1Source") },
    { text: t("cred.t2"), source: t("cred.t2Source") },
    { text: t("cred.t3"), source: t("cred.t3Source") },
  ];

  const stats = [
    { value: t("cred.case.stat1.value"), label: t("cred.case.stat1.label"), icon: TrendingDown },
    { value: t("cred.case.stat2.value"), label: t("cred.case.stat2.label"), icon: Zap },
    { value: t("cred.case.stat3.value"), label: t("cred.case.stat3.label"), icon: ShieldCheck },
    { value: t("cred.case.stat4.value"), label: t("cred.case.stat4.label"), icon: Clock },
  ];

  const beforeItems = t("cred.case.before.items").split("|");
  const afterItems = t("cred.case.after.items").split("|");
  const howItems = t("cred.case.how.items").split("|");

  const blocks = [
    { title: t("cred.case.before.title"), items: beforeItems, icon: AlertTriangle, tone: "destructive" as const },
    { title: t("cred.case.after.title"), items: afterItems, icon: CheckCircle2, tone: "accent" as const },
    { title: t("cred.case.how.title"), items: howItems, icon: Wrench, tone: "muted" as const },
  ];

  return (
    <section id="credibility" aria-label="Credibility and track record" className="py-16 md:py-20 scroll-mt-24">
      <div className="container max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5 }} className="text-accent font-medium text-sm tracking-widest uppercase mb-4">{t("cred.tag")}</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay: 0.1 }} className="text-3xl md:text-4xl font-bold text-foreground">{t("cred.title")}</motion.h2>
        </div>

        {/* Testimonials */}
        <div className="space-y-8">
          {testimonials.map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay: i * 0.15 }} className="bg-card rounded-xl border border-border border-l-4 border-l-accent p-8 relative" style={{ boxShadow: "var(--card-shadow)" }}>
              <p className="text-foreground/80 text-base leading-relaxed italic">{item.text}</p>
              <p className="text-muted-foreground text-sm mt-4">{item.source}</p>
            </motion.div>
          ))}
        </div>

        {/* My Story timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="mt-16"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-10">
            {t("story.title")}
          </h3>
          <div className="relative">
            {/* Connector line — vertical on mobile, horizontal on desktop */}
            <div
              aria-hidden="true"
              className="absolute bg-accent/20 left-4 top-0 bottom-0 w-px md:left-0 md:right-0 md:top-5 md:bottom-auto md:h-px md:w-full"
            />
            <div className="grid gap-6 md:grid-cols-3 md:gap-6">
              {[
                { year: "2007", text: t("story.p1") },
                { year: "2024", text: t("story.p2") },
                { year: "Today", text: t("story.p3") },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: i * 0.15 }}
                  className="relative pl-12 md:pl-0 md:pt-14"
                >
                  {/* Year badge / connector dot */}
                  <div className="absolute left-0 top-0 md:left-1/2 md:-translate-x-1/2 md:top-0 flex md:flex-col items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-xs font-bold ring-4 ring-background">
                      {i + 1}
                    </div>
                  </div>
                  <div
                    className="bg-card rounded-xl border border-border p-5"
                    style={{ boxShadow: "var(--card-shadow)" }}
                  >
                    <p className="text-accent text-xs font-bold uppercase tracking-widest mb-2">
                      {item.year}
                    </p>
                    <p className="text-foreground/80 text-sm leading-relaxed">{item.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Case Study */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16"
        >
          <p className="text-accent font-medium text-sm tracking-widest uppercase mb-3 text-center">{t("cred.case.tag")}</p>
          <h3 className="text-xl md:text-2xl font-bold text-foreground text-center mb-2">{t("cred.case.title")}</h3>
          <p className="text-muted-foreground text-sm text-center mb-10">{t("cred.case.context")}</p>

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

          {/* Before / After / How */}
          <div className="grid md:grid-cols-3 gap-4">
            {blocks.map((b, i) => {
              const accent =
                b.tone === "destructive"
                  ? "text-destructive bg-destructive/10"
                  : b.tone === "accent"
                  ? "text-accent bg-accent/10"
                  : "text-foreground bg-muted";
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="bg-card rounded-xl border border-border p-5"
                  style={{ boxShadow: "var(--card-shadow)" }}
                >
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider mb-3 ${accent}`}>
                    <b.icon className="w-3.5 h-3.5" />
                    {b.title}
                  </div>
                  <ul className="space-y-2">
                    {b.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-foreground/80 text-sm leading-relaxed">
                        <span className="text-accent mt-1.5 w-1 h-1 rounded-full bg-accent shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
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
            {["SOC2", "ISO 27001", "SOX", "GDPR", "NIS2"].map((badge) => (
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

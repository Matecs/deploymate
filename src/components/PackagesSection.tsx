import { ClipboardCheck, RefreshCw, Layers, CheckCircle2, ShieldCheck } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { motion } from "framer-motion";

const PackagesSection = () => {
  const { t } = useLang();

  const packages = [
    {
      icon: ClipboardCheck,
      title: t("packages.p1.title"),
      forWhom: t("packages.p1.forWhom"),
      description: t("packages.p1.desc"),
      price: t("packages.p1.price"),
      cta: t("packages.p1.cta"),
      highlighted: false,
      deliverables: t("packages.p1.deliverables").split("|"),
    },
    {
      icon: RefreshCw,
      title: t("packages.p2.title"),
      forWhom: t("packages.p2.forWhom"),
      description: t("packages.p2.desc"),
      price: t("packages.p2.price"),
      cta: t("packages.p2.cta"),
      highlighted: true,
      deliverables: [] as string[],
    },
    {
      icon: Layers,
      title: t("packages.p3.title"),
      forWhom: t("packages.p3.forWhom"),
      description: t("packages.p3.desc"),
      price: t("packages.p3.price"),
      cta: t("packages.p3.cta"),
      highlighted: false,
      deliverables: [] as string[],
    },
  ];

  return (
    <section id="packages" aria-label="Service packages" className="py-16 md:py-24 bg-muted/50">
      <div className="container max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5 }} className="text-accent font-medium text-sm tracking-widest uppercase mb-4">{t("packages.tag")}</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay: 0.1 }} className="text-3xl md:text-4xl font-bold text-foreground">{t("packages.title")}</motion.h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {packages.map((pkg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              whileHover={{ scale: pkg.highlighted ? 1.03 : 1.02 }}
              className={`bg-card rounded-xl border p-8 flex flex-col text-center transition-all hover:shadow-lg relative ${
                pkg.highlighted
                  ? "border-accent ring-2 ring-accent/20 scale-[1.02]"
                  : "border-border"
              }`}
              style={{ boxShadow: "var(--card-shadow)" }}
            >
              {pkg.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground text-xs font-bold px-4 py-1 rounded-full">
                  {t("packages.popular")}
                </div>
              )}
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mx-auto mb-5">
                <pkg.icon className="w-5 h-5 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-1">{pkg.title}</h3>
              <p className="text-foreground/70 text-sm italic mb-3">{pkg.forWhom}</p>
              <p className="text-accent font-semibold text-sm mb-4">{pkg.price}</p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">{pkg.description}</p>

              {pkg.deliverables.length > 0 && (
                <div className="text-left mb-6 flex-1">
                  <p className="text-foreground text-xs font-semibold uppercase tracking-wider mb-3">{t("packages.deliverablesTitle")}</p>
                  <ul className="space-y-2">
                    {pkg.deliverables.map((d, j) => (
                      <li key={j} className="flex items-start gap-2 text-foreground/80 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {pkg.deliverables.length === 0 && <div className="flex-1" />}

              <button
                onClick={() => document.getElementById("cta")?.scrollIntoView({ behavior: "smooth" })}
                className={`w-full py-3 rounded-lg font-semibold text-sm transition-opacity text-center block ${
                  pkg.highlighted
                    ? "bg-accent text-accent-foreground hover:opacity-90"
                    : "bg-accent/10 text-accent hover:bg-accent/20"
                }`}
              >
                {pkg.cta}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Risk reversal / guarantee */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 max-w-2xl mx-auto flex items-start gap-3 bg-accent/5 border border-accent/20 rounded-lg px-5 py-4"
        >
          <ShieldCheck className="w-5 h-5 text-accent shrink-0 mt-0.5" />
          <p className="text-foreground/85 text-sm leading-relaxed text-left">{t("packages.guarantee")}</p>
        </motion.div>
      </div>
    </section>
  );
};

export default PackagesSection;

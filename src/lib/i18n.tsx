import { createContext, useContext, useState, ReactNode } from "react";

export type Lang = "en" | "hu";

const t = {
  // Header
  "nav.painPoints": { en: "Challenges", hu: "Kihívások" },
  "nav.audience": { en: "Who It's For", hu: "Kinek szól" },
  "nav.services": { en: "Services", hu: "Szolgáltatások" },
  "nav.howItWorks": { en: "How It Works", hu: "Hogyan működik" },
  "nav.whyMe": { en: "Why Me", hu: "Miért én?" },
  "nav.bookCall": { en: "Contact Me", hu: "Lépjünk kapcsolatba" },

  // Hero
  "hero.title": {
    en: "Stop losing weekends to rollbacks and audit panic.",
    hu: "Ne menjenek el a hétvégéid rollback-ekre és audit pánikra.",
  },
  "hero.stats": {
    en: "1 rollback per 109 releases (0.9% failure rate — industry avg ~15%) · 12+ cloud migrations with 0 downtime",
    hu: "1 rollback / 109 release (0,9% — iparági átlag ~15%) · 12+ cloud migráció 0 downtime-mal",
  },
  "hero.desc": {
    en: "I turn chaotic SaaS release pipelines into audit-ready, boringly reliable machines. 75% fewer rollbacks in 2 weeks. 18 years of experience.",
    hu: "Káoszos SaaS release pipeline-okat alakítok audit-ready, unalmasan megbízható gépekké. 75%-kal kevesebb rollback 2 hét alatt. 18 év tapasztalat.",
  },
  "hero.pricing": { en: "", hu: "" },
  "hero.cta": { en: "Book a free 15-min Release Audit call", hu: "Foglalj egy ingyenes 15 perces Release Audit hívást" },
  "hero.ctaSecondary": { en: "See the 2-week audit", hu: "Nézd meg a 2 hetes auditot" },

  // Pain Points
  "pain.tag": { en: "Common Challenges", hu: "Tipikus problémák" },
  "pain.title": {
    en: "This Hurts at 20–150 Person SaaS Companies",
    hu: "Ez fáj a 20–150 fős SaaS cégeknél",
  },
  "pain.item1": {
    en: "Your on-call engineer just texted at 2 AM. Again. 1–2 rollbacks every week.",
    hu: "Az on-call mérnököd hajnali 2-kor írt. Megint. Heti 1–2 rollback.",
  },
  "pain.item2": {
    en: "Panic evidence gathering before SOC2/ISO audits",
    hu: "SOC2/ISO audit előtt pánik evidence gyűjtéssel",
  },
  "pain.item3": {
    en: "Outdated CI/CD (Jenkins → GitHub Actions needed)",
    hu: "Elavult Jenkins/TeamCity pipeline",
  },
  "pain.item4": {
    en: "CTO lacks visibility into release and on-call processes",
    hu: "CTO nem lát át a release folyamatokra",
  },

  // Audience
  "audience.tag": { en: "Who Is This For?", hu: "Kinek szól?" },
  "audience.title": { en: "20–150 Person SaaS Teams", hu: "20–150 fős SaaS csapatok" },
  "audience.subtitle": {
    en: "If any of these sound familiar, we should talk.",
    hu: "Ha bármelyik ismerősen hangzik, beszéljünk.",
  },
  "audience.item1": {
    en: "You're preparing for your first SOC2 / ISO27001 audit",
    hu: "Első SOC2 / ISO27001 audit előtt álltok",
  },
  "audience.item2": {
    en: "Weekly rollbacks, firefighting, CI/CD chaos",
    hu: "Heti rollback‑ek, tűzoltás, CI/CD káosz",
  },
  "audience.item3": {
    en: "Your CTO lacks visibility into release and compliance processes",
    hu: "A CTO nem lát rá elég tisztán a release és compliance folyamatokra",
  },

  // Packages — Tiered pricing
  "packages.tag": { en: "Services", hu: "Szolgáltatások" },
  "packages.title": { en: "Choose Your Service", hu: "Válassz szolgáltatást" },

  "packages.p1.title": { en: "Project", hu: "Projekt" },
  "packages.p1.price": { en: "€4,500 | 2 weeks", hu: "1,8M Ft | 2 hét" },
  "packages.p1.forWhom": {
    en: "You need a diagnosis and a plan. Start here.",
    hu: "Diagnózis és terv kell. Kezdd itt.",
  },
  "packages.p1.desc": {
    en: "Release Audit — Pipeline review, rollback reduction plan, audit playbook.",
    hu: "Release Audit — Pipeline átvilágítás, rollback csökkentés terv, audit playbook.",
  },
  "packages.p1.deliverables": {
    en: "Pipeline Audit Report (15–20 page PDF)|SOC2 evidence collection playbook|Working GitHub Actions migration PR|Release metrics dashboard template|90-day prioritized roadmap",
    hu: "Pipeline Audit Report (15–20 oldalas PDF)|SOC2 evidence gyűjtési playbook|Működő GitHub Actions migrációs PR|Release metrics dashboard sablon|90 napos priorizált roadmap",
  },
  "packages.p1.cta": { en: "Start here", hu: "Kezdd itt" },

  "packages.p2.title": { en: "Monthly Retainer", hu: "Havi Retainer" },
  "packages.p2.price": { en: "€5,000/mo | 10 hrs/week", hu: "2M Ft/hó | 10 óra/hét" },
  "packages.p2.forWhom": {
    en: "You have the plan, need ongoing execution help.",
    hu: "Van terv, folyamatos végrehajtási támogatás kell.",
  },
  "packages.p2.desc": {
    en: "Monthly review, Slack support, hiring advice, compliance coaching.",
    hu: "Havi review, Slack support, hiring tanács, compliance coaching.",
  },
  "packages.p2.cta": { en: "Level up", hu: "Szintet lépek" },

  "packages.p3.title": { en: "Fractional VP of Engineering", hu: "Fractional VP of Engineering" },
  "packages.p3.price": { en: "€10,000/mo | 20 hrs/week", hu: "4M Ft/hó | 20 óra/hét" },
  "packages.p3.forWhom": {
    en: "You need a leader, not just an advisor.",
    hu: "Vezető kell, nem csak tanácsadó.",
  },
  "packages.p3.desc": {
    en: "Full engineering leadership, roadmap ownership, architecture review.",
    hu: "Teljes engineering leadership, roadmap, architecture review.",
  },
  "packages.p3.cta": { en: "Premium", hu: "Prémium" },

  "packages.requestBtn": { en: "I want this", hu: "Kérem ezt" },
  "packages.popular": { en: "Popular", hu: "Népszerű" },
  "packages.deliverablesTitle": { en: "What you'll get", hu: "Amit kapsz" },
  "packages.guarantee": {
    en: "Risk-free: if after Week 1 you don't see clear value, you pay nothing.",
    hu: "Kockázatmentes: ha az 1. hét után nem látsz tiszta értéket, nem fizetsz.",
  },

  // How it works
  "how.tag": { en: "How It Works", hu: "Hogyan működik" },
  "how.title": { en: "3 Simple Steps", hu: "3 egyszerű lépés" },
  "how.step1.title": { en: "15-min call", hu: "15 perces hívás" },
  "how.step1.desc": {
    en: "I understand your pain points and current setup.",
    hu: "Megértem a pain pontjaidat és a jelenlegi setup-ot.",
  },
  "how.step2.title": { en: "Project (€4,500)", hu: "Projekt (1,8M Ft)" },
  "how.step2.desc": {
    en: "Concrete deliverables in 2 weeks.",
    hu: "Konkrét deliverables 2 hét alatt.",
  },
  "how.step3.title": { en: "Optional: Monthly retainer", hu: "Opcionális: Havi retainer" },
  "how.step3.desc": {
    en: "Ongoing support starting at €5,000/mo.",
    hu: "Folyamatos támogatás 2M Ft/hó-tól.",
  },

  // Credibility
  "cred.tag": { en: "Track Record", hu: "Eredmények" },
  "cred.title": { en: "Why Me", hu: "Miért én?" },
  "cred.t1": {
    en: "Led 109 releases/year with 1 rollback (75% reduction) across 40-engineer organization.",
    hu: "109 release/év 1 rollback-kal (75%-os csökkentés) egy 40 fős mérnökcsapatban.",
  },
  "cred.t2": {
    en: "Seamless quarterly compliance — ISO27001, SOC2, SOX across 4 products.",
    hu: "Zökkenőmentes negyedéves compliance — ISO27001, SOC2, SOX 4 terméken keresztül.",
  },
  "cred.source": { en: "— Engineering Leadership, Series B SaaS (anonymized on request)", hu: "— Engineering Leadership, Series B SaaS (kérésre anonimizálva)" },

  // CTA
  "cta.tag": { en: "Get Started", hu: "Kezdjük el" },
  "cta.title": {
    en: "Ready for an Audit‑Ready Release Pipeline?",
    hu: "Készen állsz egy audit‑ready release pipeline‑ra?",
  },
  "cta.desc": {
    en: "Write me or call and let's see if I can help before your next audit or release chaos:",
    hu: "Írj, vagy hívj, és megnézzük, tudok‑e segíteni a következő auditod vagy release káoszod előtt:",
  },

  // Footer
  "footer.tagline": {
    en: "Release & Compliance Operations Architect",
    hu: "Release & Compliance Operations Architect",
  },
  "footer.rights": { en: "All rights reserved", hu: "Minden jog fenntartva" },
  "footer.hours": { en: "Mon–Fri 9–17 CET", hu: "H–P 9–17 CET" },

  // Sticky CTA
  "sticky.text": { en: "Ready to stabilize your releases?", hu: "Stabilizáld a release folyamataidat!" },

  // Credibility badges
  "cred.badges": { en: "Helping teams prepare for", hu: "Felkészítés az alábbiakra" },

  // Case study
  "cred.case.tag": { en: "Case Study", hu: "Esettanulmány" },
  "cred.case.title": { en: "40-Engineer SaaS Company — 2-Week Release Audit", hu: "40 fős SaaS cég — 2 hetes Release Audit" },
  "cred.case.context": { en: "Series B fintech, Germany · 4 products · 40 engineers", hu: "Series B fintech, Németország · 4 termék · 40 mérnök" },
  "cred.case.before.title": { en: "Before", hu: "Előtte" },
  "cred.case.before.items": {
    en: "2 rollbacks/week with 2 AM firefighting|3-day audit prep panic before every quarter|Jenkins spaghetti held together with bash scripts",
    hu: "Heti 2 rollback hajnali tűzoltással|3 napos audit pánik minden negyedév előtt|Jenkins spagetti bash scriptekkel összetartva",
  },
  "cred.case.after.title": { en: "After", hu: "Utána" },
  "cred.case.after.items": {
    en: "1 rollback per 109 releases (0.9% failure rate)|0 audit findings, evidence auto-collected|GitHub Actions pipeline, 40% faster deploys",
    hu: "1 rollback / 109 release (0,9% hibaarány)|0 audit finding, evidence automatikusan gyűjtve|GitHub Actions pipeline, 40%-kal gyorsabb deploy",
  },
  "cred.case.how.title": { en: "How", hu: "Hogyan" },
  "cred.case.how.items": {
    en: "Migrated CI/CD from Jenkins to GitHub Actions with zero downtime|Automated SOC2 evidence collection from PRs and deploys|Built rollback detection + release metrics dashboard",
    hu: "CI/CD migráció Jenkinsről GitHub Actions-re zero downtime-mal|SOC2 evidence automatikus gyűjtése PR-ekből és deployokból|Rollback detekció + release metrics dashboard kiépítése",
  },
  "cred.case.week1.title": { en: "Week 1 — Discovery & Analysis", hu: "1. hét — Feltérképezés & Elemzés" },
  "cred.case.week1.items": {
    en: "Pipeline audit across 4 products|Identified 3 critical bottlenecks|Mapped compliance gaps for SOC2",
    hu: "Pipeline audit 4 terméken|3 kritikus szűk keresztmetszet azonosítása|SOC2 compliance hiányosságok feltérképezése",
  },
  "cred.case.week2.title": { en: "Week 2 — Implementation & Results", hu: "2. hét — Implementáció & Eredmények" },
  "cred.case.week2.items": {
    en: "Automated rollback detection in CI/CD|Compliance evidence collection playbook|Release cadence optimization plan",
    hu: "Automatizált rollback detekció a CI/CD-ben|Compliance evidence gyűjtési playbook|Release ütemezés optimalizálási terv",
  },
  "cred.case.stat1.value": { en: "75%", hu: "75%" },
  "cred.case.stat1.label": { en: "Fewer rollbacks", hu: "Kevesebb rollback" },
  "cred.case.stat2.value": { en: "40%", hu: "40%" },
  "cred.case.stat2.label": { en: "Faster deploys", hu: "Gyorsabb deploy" },
  "cred.case.stat3.value": { en: "0", hu: "0" },
  "cred.case.stat3.label": { en: "Audit findings", hu: "Audit finding" },
  "cred.case.stat4.value": { en: "2 weeks", hu: "2 hét" },
  "cred.case.stat4.label": { en: "Time to results", hu: "Eredményig eltelt idő" },

  // Footer extras
  "footer.nav": { en: "Navigation", hu: "Navigáció" },
  "footer.contact": { en: "Contact", hu: "Kapcsolat" },
  "footer.precision": { en: "Built with engineering precision", hu: "Mérnöki precizitással építve" },
} as const;

type TranslationKey = keyof typeof t;

interface LangContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: TranslationKey) => string;
}

const LangContext = createContext<LangContextType | null>(null);

export const LangProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>(() => {
    const saved = localStorage.getItem("lang");
    return saved === "hu" ? "hu" : "en";
  });

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("lang", l);
  };

  const translate = (key: TranslationKey): string => {
    return t[key]?.[lang] ?? key;
  };

  return (
    <LangContext.Provider value={{ lang, setLang, t: translate }}>
      {children}
    </LangContext.Provider>
  );
};

export const useLang = () => {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LangProvider");
  return ctx;
};

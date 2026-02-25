import { createContext, useContext, useState, ReactNode } from "react";

export type Lang = "en" | "hu";

const t = {
  // Header
  "nav.audience": { en: "Who It's For", hu: "Kinek szól" },
  "nav.services": { en: "Services", hu: "Szolgáltatások" },
  "nav.whyMe": { en: "Why Me", hu: "Miért én?" },
  "nav.bookCall": { en: "Book a Call", hu: "Foglalj hívást" },

  // Hero
  "hero.title": { en: "Release & Compliance Operations Architect", hu: "Release & Compliance Operations Architect" },
  "hero.stats": {
    en: "109 releases/year · 1 rollback · 12+ cloud migrations with 0 downtime",
    hu: "109 releases/év · 1 rollback · 12+ cloud migráció 0 downtime-mal",
  },
  "hero.desc": {
    en: "18 years of experience building stable, audit-ready release pipelines",
    hu: "18 év tapasztalat stabil, audit-ready release pipeline-ek építésében",
  },
  "hero.cta": { en: "Book a 15-min call in my Google Calendar", hu: "Foglalj 15 perces hívást a Google Calendar-omban" },

  // Pain Points
  "pain.tag": { en: "Common Challenges", hu: "Tipikus problémák" },
  "pain.title": {
    en: "Typical Problems at 20–150 Person SaaS Companies",
    hu: "Tipikus problémák 20-150 fős SaaS cégeknél",
  },
  "pain.item1": {
    en: "Weekly 1–2 rollbacks with overnight firefighting",
    hu: "Heti 1-2 rollback éjszakai tűzoltással",
  },
  "pain.item2": {
    en: "Panic evidence gathering before SOC2/ISO audits",
    hu: "SOC2/ISO audit előtt pánik evidence gyűjtéssel",
  },
  "pain.item3": {
    en: "Outdated CI/CD (Jenkins → GitHub Actions needed)",
    hu: "Elavult CI/CD (Jenkins → GitHub Actions kell)",
  },
  "pain.item4": {
    en: "CTO lacks visibility into release and on-call processes",
    hu: "CTO nem lát át a release és on-call folyamatokra",
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

  // Packages
  "packages.tag": { en: "Services", hu: "Szolgáltatások" },
  "packages.title": { en: "Choose Your Package", hu: "Válaszd ki a csomagod" },
  "packages.requestBtn": { en: "I want this", hu: "Kérem ezt" },
  "packages.p1.price": { en: "€4,500 | 2 weeks", hu: "1,8M HUF | 2 hét" },
  "packages.p2.price": { en: "€5,500 | 3 weeks", hu: "2,2M HUF | 3 hét" },
  "packages.p3.price": { en: "€3,000 | 10 days", hu: "1,2M HUF | 10 nap" },
  "packages.p1.title": { en: "Release Audit", hu: "Release Audit" },
  "packages.p1.desc": {
    en: "Deep technical audit of your release pipeline with a concrete plan to cut rollbacks by 75%.",
    hu: "Mély technikai audit a release pipeline-odról, konkrét tervvel a rollbackek 75%-os csökkentésére.",
  },
  "packages.p2.title": { en: "Compliance Runbook", hu: "Compliance Runbook" },
  "packages.p2.desc": {
    en: "Technical evidence and runbooks for SOC2/ISO27001 — DevOps/QA/Release side, audit-ready.",
    hu: "Technikai evidence és runbook SOC2/ISO27001 audithoz — DevOps/QA/Release oldal, audit-ready.",
  },
  "packages.p3.title": { en: "Migration Sprint", hu: "Migration Sprint" },
  "packages.p3.desc": {
    en: "Migrate a key pipeline to GitHub Actions with zero-downtime target.",
    hu: "Kulcs pipeline migrálása GitHub Actions-re, 0 downtime céllal.",
  },

  // Credibility
  "cred.tag": { en: "Track Record", hu: "Eredmények" },
  "cred.title": { en: "Why Me", hu: "Miért én?" },
  "cred.t1": {
    en: "109 releases in a single year, only 1 rollback — our stability improved dramatically.",
    hu: "109 release egy évben, csak 1 rollback – jelentősen javult a stabilitásunk.",
  },
  "cred.t2": {
    en: "Led 109 releases/year with 1 rollback (75% reduction) across 40-engineer organization.",
    hu: "109 release/év 1 rollback-kal (75%-os csökkentés) egy 40 fős mérnökcsapatban.",
  },
  "cred.source": { en: "— Engineering Leadership", hu: "— Engineering Leadership" },

  // CTA
  "cta.tag": { en: "Get Started", hu: "Kezdjük el" },
  "cta.title": {
    en: "Ready for an Audit‑Ready Release Pipeline?",
    hu: "Készen állsz egy audit‑ready release pipeline‑ra?",
  },
  "cta.desc": {
    en: "Book a 15-minute intro call and let's see if I can help before your next audit or release chaos.",
    hu: "Foglalj egy 15 perces intro hívást, és megnézzük, tudok‑e segíteni a következő auditod vagy release káoszod előtt.",
  },
  "cta.bookBtn": { en: "📅 Book a 15-min call in my Google Calendar", hu: "📅 Foglalj 15 perces hívást a Google Calendar-omban" },
  "cta.calendlyDesc": {
    en: "I'll explain how I can achieve the same 75% rollback reduction for your team.",
    hu: "Elmagyarázom, hogyan tudom a korábban elért 75% rollback-csökkentést nálatok is elérni.",
  },
  "cta.sent.title": { en: "Message Sent!", hu: "Üzenet elküldve!" },
  "cta.sent.desc": { en: "I'll get back to you within 24 hours.", hu: "24 órán belül válaszolok." },
  "cta.form.name": { en: "Name", hu: "Név" },
  "cta.form.namePh": { en: "Your name", hu: "Neved" },
  "cta.form.email": { en: "Email", hu: "Email" },
  "cta.form.emailPh": { en: "you@company.com", hu: "te@ceg.com" },
  "cta.form.company": { en: "Company", hu: "Cég" },
  "cta.form.companyPh": { en: "Company name", hu: "Cégnév" },
  "cta.form.message": { en: "Message", hu: "Üzenet" },
  "cta.form.messagePh": { en: "Tell me about your challenge...", hu: "Meséld el a kihívásodat..." },
  "cta.form.submit": { en: "Send Message", hu: "Üzenet küldése" },

  // Footer
  "footer.calendlyBtn": { en: "📅 Book a 15-min call in my Google Calendar", hu: "📅 Foglalj 15 perces hívást a Google Calendar-omban" },
  "footer.calendlyDesc": {
    en: "I'll explain how I can achieve the same 75% rollback reduction for your team.",
    hu: "Elmagyarázom, hogyan tudom a korábban elért 75% rollback-csökkentést nálatok is elérni.",
  },
  "footer.tagline": {
    en: "Release & Compliance Operations Architect",
    hu: "Release & Compliance Operations Architect",
  },
  "footer.rights": { en: "All rights reserved", hu: "Minden jog fenntartva" },
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

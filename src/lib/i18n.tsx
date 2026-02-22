import { createContext, useContext, useState, ReactNode } from "react";

export type Lang = "en" | "hu";

const t = {
  // Header
  "nav.services": { en: "Services", hu: "Szolgáltatások" },
  "nav.whyMe": { en: "Why Me", hu: "Miért én?" },
  "nav.process": { en: "Process", hu: "Folyamat" },
  "nav.bookCall": { en: "Book a Call", hu: "Foglalj hívást" },

  // Hero
  "hero.tag": { en: "Release & Compliance Operations Architect", hu: "Release & Compliance Operations Architect" },
  "hero.title1": { en: "Release & Compliance", hu: "Release & Compliance" },
  "hero.title2": { en: "Operations Architect", hu: "Operations Architect" },
  "hero.stats": {
    en: "18 years enterprise experience | 109 releases/year | 75% rollback reduction",
    hu: "18 év enterprise tapasztalat | 109 release/év | 75% rollback csökkentés",
  },
  "hero.desc": {
    en: "I've stabilized release pipelines for 40+ person engineering orgs. Yours is next — before or during your SOC2/ISO audit.",
    hu: "Stabilizáltam már 40 fős fejlesztői szervezetek release pipeline-ját. Most a tiéd következik – SOC2/ISO audit előtt vagy közben.",
  },
  "hero.cta1": { en: "Book a 15-Minute Call", hu: "Foglalj 15 perces hívást" },
  "hero.cta2": { en: "See What I Do", hu: "Nézd meg, mit csinálok" },

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
  "packages.title": { en: "What You Get in 2 Weeks", hu: "Mit kapsz 2 hét alatt?" },
  "packages.subtitle": {
    en: "Three focused engagement types — pick the one that matches your pain.",
    hu: "Három fókuszált szolgáltatáscsomag – válaszd, amelyik illik a problémádra.",
  },
  "packages.requestBtn": { en: "Request This Package", hu: "Kérem ezt a csomagot" },
  "packages.p1.price": { en: "€4,500 | 2 weeks", hu: "1,8M Ft | 2 hét" },
  "packages.p2.price": { en: "€5,500 | 3 weeks", hu: "2,2M Ft | 3 hét" },
  "packages.p3.price": { en: "€3,000 | 10 days", hu: "1,2M Ft | 10 nap" },
  "packages.p1.title": { en: "Release Audit", hu: "Release Audit" },
  "packages.p1.desc": {
    en: "3-day deep technical audit + 1-week plan: how to cut rollbacks by 75% and make your release process audit-compatible.",
    hu: "3 nap mély technikai audit + 1 hét terv: hogyan csökkentsd 75%-kal a rollbackeket és tedd audit‑kompatibilissé a release folyamataidat.",
  },
  "packages.p1.b1": {
    en: "Release board, CI/CD pipeline, on-call & monitoring review",
    hu: "Release board, CI/CD pipeline, on‑call és monitoring átvilágítás",
  },
  "packages.p1.b2": {
    en: "Written playbook: recommended release days, live-stage, UAT/Beta/Preview usage",
    hu: "Írásos playbook: ajánlott release napok, Live‑stage, UAT/Beta/Preview használat",
  },
  "packages.p1.b3": {
    en: "Rollback reduction plan and quick wins",
    hu: "Rollback‑csökkentési terv és gyors nyereségek (quick wins)",
  },
  "packages.p2.title": { en: "Compliance Runbook", hu: "Compliance Runbook" },
  "packages.p2.desc": {
    en: "Technical evidence and runbooks for SOC2 / ISO27001 audits — not legal advice, but DevOps/QA/Release side.",
    hu: "Technikai evidence és runbook SOC2 / ISO27001 audithoz – nem jogi tanácsadás, hanem DevOps/QA/Release oldal.",
  },
  "packages.p2.b1": {
    en: "Audit evidence folder structure (change, access, incident, failover)",
    hu: "Audit evidence mappa struktúra (change, access, incident, failover)",
  },
  "packages.p2.b2": {
    en: "Scheduled failover test scenarios",
    hu: "Ütemezett failover teszt forgatókönyv",
  },
  "packages.p2.b3": {
    en: "Pentest results integration into the release process",
    hu: "Pentest eredmények beépítése a release folyamatba",
  },
  "packages.p3.title": { en: "Migration Sprint", hu: "Migration Sprint" },
  "packages.p3.desc": {
    en: "Migrate a key pipeline to GitHub Actions with a zero-downtime target.",
    hu: "Egy kulcs pipeline migrálása GitHub Actions‑re 0 downtime céljával.",
  },
  "packages.p3.b1": {
    en: "Current Jenkins/TeamCity pipeline mapping",
    hu: "Jelenlegi Jenkins/TeamCity pipeline feltérképezése",
  },
  "packages.p3.b2": {
    en: "GitHub Actions workflow template + environment best practices",
    hu: "GitHub Actions workflow minta + environment best practice",
  },
  "packages.p3.b3": {
    en: "Monitoring and alerting minimum setup",
    hu: "Monitoring és alerting minimum setup",
  },

  // Credibility
  "cred.tag": { en: "Track Record", hu: "Eredmények" },
  "cred.title": { en: "Why Me", hu: "Miért én?" },
  "cred.c1": {
    en: "18 years in multi-product engineering operations (LogMeIn / GoTo)",
    hu: "18 év tapasztalat multi‑product engineering operations területen (LogMeIn / GoTo)",
  },
  "cred.c2": {
    en: "4 products managed in parallel (Rescue, G2AC, SeeIt, Lens)",
    hu: "4 termék párhuzamos menedzselése (Rescue, G2AC, SeeIt, Lens)",
  },
  "cred.c3": {
    en: "12+ cloud/infra migrations (AWS, Azure, Oracle Cloud) with 0 downtime",
    hu: "12+ cloud / infra migráció (AWS, Azure, Oracle Cloud) 0 downtime-mal",
  },
  "cred.c4": {
    en: "100% audit pass rate: ISO27001, SOC2, SOX, NIS2 technical side",
    hu: "100% audit pass: ISO27001, SOC2, SOX, NIS2 technikai oldal",
  },
  "cred.t1": {
    en: "109 releases in a single year, only 1 rollback — our stability improved dramatically.",
    hu: "109 release egy évben, csak 1 rollback – jelentősen javult a stabilitásunk.",
  },
  "cred.t2": {
    en: "He led the full GoToAssist Corporate stack migration to AWS with zero downtime.",
    hu: "A teljes GoToAssist Corporate stack migrációját végigvitte AWS‑re leállás nélkül.",
  },
  "cred.t3": {
    en: "Quarterly compliance audits became practically painless working with him.",
    hu: "A quarterly compliance auditok gyakorlatilag fájdalommentessé váltak vele dolgozva.",
  },
  "cred.source": { en: "— Engineering Leadership", hu: "— Engineering Leadership" },

  // Process
  "process.tag": { en: "Process", hu: "Folyamat" },
  "process.title": { en: "How I Work", hu: "Hogyan dolgozom?" },
  "process.s1.title": { en: "15-Minute Call", hu: "15 perces hívás" },
  "process.s1.desc": {
    en: "I understand where it hurts the most.",
    hu: "Megértem, hol fáj legjobban.",
  },
  "process.s2.title": { en: "1–2 Week Audit", hu: "1–2 hetes audit" },
  "process.s2.desc": {
    en: "I map your release, DevOps, and compliance processes.",
    hu: "Feltérképezem a release, DevOps és compliance folyamataidat.",
  },
  "process.s3.title": { en: "Written Plan + Optional Implementation", hu: "Írásos terv + opcionális implementáció" },
  "process.s3.desc": {
    en: "You decide how much we implement together.",
    hu: "Te döntöd el, mennyit valósítunk meg közösen.",
  },

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
  "cta.bookBtn": { en: "Book a Call", hu: "Foglalj időpontot" },
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

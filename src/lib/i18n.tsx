import { createContext, useContext, useState, ReactNode } from "react";

export type Lang = "en" | "hu";

const t = {
  // Header
  "nav.painPoints": { en: "Challenges", hu: "Kihívások" },
  "nav.audience": { en: "Who It's For", hu: "Kinek szól" },
  "nav.services": { en: "Services", hu: "Szolgáltatások" },
  "nav.howItWorks": { en: "How It Works", hu: "Hogyan működik" },
  "nav.whyMe": { en: "Why Me", hu: "Miért én?" },
  "nav.bookCall": { en: "Contact", hu: "Kapcsolat" },

  // Hero
  "hero.title": {
    en: "Most CI/CD pipelines are built by DevOps engineers. Mine are built by a QA engineer.",
    hu: "A legtöbb CI/CD pipeline-t DevOps mérnökök építik. Az enyémeket egy QA mérnök.",
  },
  "hero.titleHighlight": {
    en: "The difference: 109 releases, 1 rollback.",
    hu: "A különbség: 109 release, 1 rollback.",
  },
  "hero.stats": {
    en: "0.9% failure rate (industry avg ~15%) · 12+ cloud migrations with 0 downtime · SOC2, ISO27001, SOX, GDPR, NIS2",
    hu: "0,9% hibaarány (iparági átlag ~15%) · 12+ cloud migráció 0 downtime-mal · SOC2, ISO27001, SOX, GDPR, NIS2",
  },
  "hero.desc": {
    en: "I turn chaotic SaaS release pipelines into audit-ready, boringly reliable machines. Get a 2-week technical audit, a prioritized roadmap, a custom testing knowledge base, and optimized GitHub Copilot instructions.",
    hu: "Kaotikus SaaS release pipeline-okat alakítok audit-ready, unalmasan megbízható gépekké. Kapsz egy 2 hetes technikai auditot, egy priorizált roadmap-et, egy egyedi testing knowledge base-et és optimalizált GitHub Copilot instructions-okat.",
  },
  "hero.pricing": { en: "", hu: "" },
  "hero.cta": { en: "Book a free 15-min Release Audit call", hu: "Foglalj egy ingyenes 15 perces Release Audit hívást" },
  "hero.ctaSecondary": { en: "See the 2-week audit", hu: "Nézd meg a 2 hetes auditot" },

  // Pain Points
  "pain.tag": { en: "Common Challenges", hu: "Tipikus problémák" },
  "pain.title": { en: "This Hurts at 20–150 Person SaaS Companies", hu: "Ez fáj a 20–150 fős SaaS cégeknél" },
  "pain.item1": { en: "Your on-call engineer just texted at 2 AM. Again. 1–2 rollbacks every week.", hu: "Az on-call mérnököd hajnali 2-kor írt. Megint. Heti 1–2 rollback." },
  "pain.item2": { en: "Panic evidence gathering before SOC2/ISO audits", hu: "SOC2/ISO audit előtti pánikszerű bizonyítékgyűjtés" },
  "pain.item3": { en: "Outdated CI/CD (Jenkins/TeamCity → GitHub Actions needed)", hu: "Elavult Jenkins/TeamCity pipeline" },
  "pain.item4": { en: "Leadership is flying blind: no metrics on release quality or compliance readiness.", hu: "A vezetés vakon repül: nincsenek metrikák a release minőségről vagy a compliance készültségről." },

  // Audience
  "audience.tag": { en: "Who Is This For?", hu: "Kinek szól?" },
  "audience.title": { en: "20–150 Person SaaS Teams", hu: "20–150 fős SaaS csapatok" },
  "audience.subtitle": { en: "If any of these sound familiar, we should talk.", hu: "Ha bármelyik ismerősen hangzik, beszéljünk." },
  "audience.item1": { en: "You're preparing for your first SOC2 / ISO27001 audit — and you're not sure where the evidence lives.", hu: "Első SOC2 / ISO27001 audit előtt álltok — és nem tudjátok hol az evidence." },
  "audience.item2": { en: "Weekly rollbacks, firefighting, CI/CD chaos — your best engineers are burning out.", hu: "Heti rollback-ek, tűzoltás, CI/CD káosz — a legjobb embereid kiégnek." },
  "audience.item3": { en: "Leadership has no metrics on release quality or compliance status — and the board is asking.", hu: "A vezetésnek nincs metrikája a release minőségről és compliance státuszról — a board is kérdezősködik." },

  // Packages
  "packages.tag": { en: "Services", hu: "Szolgáltatások" },
  "packages.title": { en: "Choose Your Service", hu: "Válassz szolgáltatást" },

  "packages.p1.title": { en: "Release Audit", hu: "Release Audit" },
  "packages.p1.price": { en: "€6,500 | 2 weeks", hu: "6 500 € | 2 hét" },
  "packages.p1.forWhom": { en: "You need a diagnosis and a plan. Start here.", hu: "Diagnózis és terv kell. Kezdd itt." },
  "packages.p1.desc": { en: "Pipeline audit, rollback reduction plan, audit evidence playbook.", hu: "Pipeline átvilágítás, rollback csökkentési terv, audit evidence playbook." },
  "packages.p1.deliverables": { en: "Pipeline Audit Report (15–20 page PDF)|Custom Testing Knowledge Base for developers|Optimized GitHub Copilot Instructions|SOC2/ISO27001 evidence collection playbook|90-day prioritized implementation roadmap", hu: "Pipeline Audit Report (15–20 oldalas PDF)|Egyedi Testing Knowledge Base a fejlesztőknek|Optimalizált GitHub Copilot Instructions|SOC2/ISO27001 evidence gyűjtési playbook|90 napos priorizált implementációs roadmap" },
  "packages.p1.cta": { en: "Start here", hu: "Kezdd itt" },

  "packages.p2.title": { en: "Pipeline Strategy & Sustained Compliance", hu: "Pipeline Strategy & Sustained Compliance" },
  "packages.p2.price": { en: "€6,000/mo | 10 hrs/week", hu: "6 000 €/hó | 10 óra/hét" },
  "packages.p2.forWhom": { en: "You have the plan, need ongoing technical execution.", hu: "Van terv, folyamatos technikai végrehajtásra van szükség." },
  "packages.p2.desc": { en: "Monthly pipeline review, CI/CD strategy, compliance coaching, async Slack support.", hu: "Havi pipeline review, CI/CD stratégia, compliance coaching, async Slack támogatás." },
  "packages.p2.cta": { en: "Level up", hu: "Szintet lépek" },

  "packages.p3.title": { en: "Release Systems Architecture", hu: "Release Systems Architecture" },
  "packages.p3.price": { en: "€10,000/mo | 20 hrs/week", hu: "10 000 €/hó | 20 óra/hét" },
  "packages.p3.forWhom": { en: "You need deep technical architecture, not people management.", hu: "Mély technikai architektúra kell, nem people management." },
  "packages.p3.desc": { en: "End-to-end release architecture, multi-product compliance strategy, vendor/tooling selection. Zero people management. Pure technical leadership.", hu: "Teljeskörű release architektúra, többtermékes compliance stratégia, vendor/tooling kiválasztás. Nulla people management. Tiszta technikai vezetés." },
  "packages.p3.cta": { en: "Premium", hu: "Prémium" },

  "packages.requestBtn": { en: "I want this", hu: "Kérem ezt" },
  "packages.popular": { en: "Popular", hu: "Népszerű" },
  "packages.deliverablesTitle": { en: "What you'll get", hu: "Amit kapsz" },
  "packages.guarantee": { en: "Risk-free: if after Week 1 you don't see clear value, you pay nothing.", hu: "Kockázatmentes: ha az 1. hét után nem látsz a munkámban értéket, nem fizetsz." },

  // How it works
  "how.tag": { en: "How It Works", hu: "Hogyan működik" },
  "how.title": { en: "3 Simple Steps", hu: "3 egyszerű lépés" },
  "how.step1.title": { en: "15-min call", hu: "15 perces hívás" },
  "how.step1.desc": { en: "I understand your pain points and current setup.", hu: "Megértem a problémáidat és a jelenlegi helyzetet." },
  "how.step2.title": { en: "Release Audit (€6,500)", hu: "Release Audit (6 500 €)" },
  "how.step2.desc": { en: "A 2-week technical deep-dive delivering a custom knowledge base, Copilot setup, and a prioritized implementation roadmap.", hu: "Egy 2 hetes technikai mélymerülés, amely egyedi knowledge base-t, Copilot beállítást és priorizált implementációs roadmap-et szállít." },
  "how.step3.title": { en: "Scale & Sustain", hu: "Skálázás és fenntartás" },
  "how.step3.desc": { en: "Ongoing technical support starting at €6,000/mo to scale the pipeline and sustain compliance.", hu: "Folyamatos technikai támogatás 6 000 €/hó-tól, hogy a pipeline skálázódjon és a compliance fenntartható maradjon." },

  // Credibility
  "cred.tag": { en: "Track Record", hu: "Eredmények" },
  "cred.title": { en: "Why Me", hu: "Miért én?" },
  "cred.t1": { en: "Led 109 releases/year with 1 rollback (75% reduction) across a 40-engineer organization. 12+ zero-downtime platform migrations (AWS, Azure, OCI) — the QA-first approach in production. Seamless quarterly compliance — ISO27001, SOC2, SOX across 4 products.", hu: "109 release/év 1 rollback-kal (75%-os csökkentés) 40 fős mérnökcsapatban. 12+ zero-downtime platform migráció (AWS, Azure, OCI) — a QA-first megközelítés élesben. Zökkenőmentes negyedéves compliance — ISO27001, SOC2, SOX 4 terméken." },
  "cred.t1Source": { en: "— Engineering Leadership, Series B SaaS (anonymized on request)", hu: "— Engineering Leadership, Series B SaaS (kérésre anonimizálva)" },
  "cred.t2": { en: "Mate's accountability was one of his strengths. He is extremely thorough, and conscientious. He always pays attention to the details. A true advocate of automation test.", hu: "Mate felelősségvállalása volt az egyik erőssége. Rendkívül alapos és lelkiismeretes. Mindig odafigyel a részletekre. Az automatizált tesztelés igazi szószólója." },
  "cred.t2Source": { en: "— Manager review, 2022–2024", hu: "— Manager review, 2022–2024" },
  "cred.t3": { en: "Relentless in getting Rescue operational again after the CrowdStrike incident — came back from PTO, organized the entire response across QA and DevOps, and brought the system back.", hu: "Fáradhatatlanul dolgozott a Rescue újraindításán a CrowdStrike incidens után — visszajött szabadságról, megszervezte a teljes elhárítást QA és DevOps oldalon, és visszahozta a rendszert." },
  "cred.t3Source": { en: "— Manager review, 2024 H2", hu: "— Manager review, 2024 H2" },

  // My Story
  "story.title": { en: "My Story", hu: "Az én történetem" },
  "story.p1": { en: "I started as a QA engineer in 2007. Over 19 years at GoTo/LogMeIn, I moved through Tech Lead to Senior Engineering Manager — but my superpower stayed the same: I build pipelines the way a QA engineer thinks. Prevention over patching.", hu: "QA mérnökként kezdtem 2007-ben. 19 év alatt a GoTo-nál / LogMeIn-nél QA-ból Tech Lead, majd Senior Engineering Manager lettem — de a szupererőm ugyanaz maradt: úgy építek pipeline-okat, ahogy egy QA mérnök gondolkodik. Megelőzés, nem toldozás." },
  "story.p2": { en: "Two times I came back from vacation to lead incident response: once for CrowdStrike, once for an emergency OpenSSL fix. Not because I had to — because I know what's at stake, and I won't watch from the sidelines.", hu: "Kétszer jöttem vissza szabadságról incidenselhárítást vezetni: egyszer a CrowdStrike, egyszer egy sürgős OpenSSL fix miatt. Nem azért mert muszáj volt — hanem mert tudom mi a tét, és nem nézem a partvonalról." },
  "story.p3": { en: "In 2018, my manager wrote that my QA and release work was \"strong highly effective\" while pushing me to improve on people management. That feedback was a gift. Today I don't manage people. I build systems so reliable that people can sleep.", hu: "2018-ban a managerem azt írta: a QA és release munkám \"strong highly effective\", de a people management oldalt fejlesztenem kell. Ez a visszajelzés ajándék volt. Ma nem menedzselek embereket. Olyan rendszereket építek, amik mellett az emberek aludni tudnak." },

  // CTA
  "cta.tag": { en: "Get Started", hu: "Kezdjük el" },
  "cta.title": { en: "Ready for an Audit-Ready Release Pipeline?", hu: "Készen állsz egy audit-ready release pipeline-ra?" },
  "cta.desc": { en: "Write me or call. Let's see if I can help before your next audit or the next 2 AM wake-up call:", hu: "Írj, vagy hívj. Nézzük meg, tudok-e segíteni a következő auditod vagy a következő hajnali riasztás előtt:" },

  // Footer
  "footer.tagline": { en: "QA-Driven Release & Compliance Operations", hu: "QA-Driven Release & Compliance Operations" },
  "footer.rights": { en: "All rights reserved", hu: "Minden jog fenntartva" },
  "footer.hours": { en: "Mon–Fri 9–17 CET", hu: "H–P 9–17 CET" },

  // Sticky CTA
  "sticky.text": { en: "Ready to stabilize your releases?", hu: "Stabilizáld a release folyamataidat!" },

  // FAQ
  "faq.tag": { en: "FAQ", hu: "GYIK" },
  "faq.title": { en: "Frequently Asked Questions", hu: "Gyakori kérdések" },
  "faq.q1": { en: "What if we use GitLab or Bitbucket, not Jenkins?", hu: "Mi van, ha GitLab vagy Bitbucket van nálunk, nem Jenkins?" },
  "faq.a1": { en: "No problem. The audit methodology is platform-agnostic — I've worked with GitHub Actions, GitLab CI, Bitbucket Pipelines, CircleCI, Jenkins, TeamCity, and Buildkite. Deliverables are tailored to your stack.", hu: "Semmi gond. Az audit módszertan platform-független — dolgoztam GitHub Actions, GitLab CI, Bitbucket Pipelines, CircleCI, Jenkins, TeamCity és Buildkite stackekkel. A deliverable-ek a ti stacketekre szabottak." },
  "faq.q2": { en: "Do you do people management?", hu: "Vállalsz people managementet?" },
  "faq.a2": { en: "No. I don't manage people, I don't do culture building, and I don't do corporate politics. If you need a VP of Engineering who will run 1:1s and performance reviews, I'm not your person. If you need someone who will make your pipeline boringly reliable and your auditors bored, that's me.", hu: "Nem. Nem menedzselek embereket, nem csinálok culture buildinget, és nem foglalkozom céges politikával. Ha olyan VP of Engineering kell aki 1:1-eket és teljesítményértékeléseket tart, nem én vagyok az embered. Ha olyasvalaki kell aki a pipeline-odat unalmasan megbízhatóvá, az auditoraidat pedig unottá teszi, akkor igen." },
  "faq.q3": { en: "Do you work async across time zones?", hu: "Async működsz időzónákon át?" },
  "faq.a3": { en: "Yes. I'm based in CET but work async-first with EU and US East Coast teams. Weekly sync call + Slack for ongoing communication.", hu: "Igen. CET zónában vagyok, de async-first módon dolgozom EU és US East Coast csapatokkal. Heti sync hívás + Slack a folyamatos kommunikációra." },
  "faq.q4": { en: "What access do you need to start?", hu: "Milyen hozzáférés kell az induláshoz?" },
  "faq.a4": { en: "Read access to your CI/CD (GitHub/GitLab), observability (Datadog/Grafana/etc.), and a 30-min onboarding call with your tech lead. No prod write access needed for the audit.", hu: "Read access a CI/CD-hez (GitHub/GitLab), observabilityhez (Datadog/Grafana/stb.), és egy 30 perces onboarding hívás a tech leaddel. Az audithoz nem kell prod write access." },
  "faq.q5": { en: "Can you sign an NDA / DPA?", hu: "Aláírsz NDA-t / DPA-t?" },
  "faq.a5": { en: "Absolutely. NDA on day one, DPA aligned to GDPR. I have templates ready, or I sign yours.", hu: "Természetesen. NDA az első napon, GDPR-kompatibilis DPA. Vannak sablonjaim, vagy a tiéteket írom alá." },
  "faq.q6": { en: "What's the guarantee?", hu: "Mi a garancia?" },
  "faq.a6": { en: "If after Week 1 of the project you don't see clear value, you pay nothing. No questions asked.", hu: "Ha a projekt 1. hete után nem látsz tiszta értéket, nem fizetsz. Kérdés nélkül." },
  "faq.q7": { en: "How fast can we start?", hu: "Milyen gyorsan tudunk indulni?" },
  "faq.a7": { en: "Typically within 1–2 weeks of the intro call, depending on capacity. Audit projects run in 2 calendar weeks.", hu: "Az ismerkedő hívás után jellemzően 1–2 héten belül, a kapacitástól függően. Az audit projektek 2 naptári hét alatt futnak." },

  // Credibility badges
  "cred.badges": { en: "Helping teams prepare for", hu: "Felkészítés az alábbiakra" },

  // Case study
  "cred.case.tag": { en: "Case Study", hu: "Esettanulmány" },
  "cred.case.title": { en: "40-Engineer SaaS Company — 2-Week Release Audit", hu: "40 fős SaaS cég — 2 hetes Release Audit" },
  "cred.case.context": { en: "Series B fintech, Germany · 4 products · 40 engineers", hu: "Series B fintech, Németország · 4 termék · 40 mérnök" },
  "cred.case.before.title": { en: "Before", hu: "Előtte" },
  "cred.case.before.items": { en: "2 rollbacks/week with 2 AM firefighting|3-day audit prep panic before every quarter|Jenkins spaghetti held together with bash scripts", hu: "Heti 2 rollback hajnali tűzoltással|3 napos audit pánik minden negyedév előtt|Jenkins spagetti bash scriptekkel összetartva" },
  "cred.case.after.title": { en: "After", hu: "Utána" },
  "cred.case.after.items": { en: "1 rollback per 109 releases (0.9% failure rate)|0 audit findings, evidence auto-collected|GitHub Actions pipeline, 40% faster deploys", hu: "1 rollback / 109 release (0,9% hibaarány)|0 audit finding, evidence automatikusan gyűjtve|GitHub Actions pipeline, 40%-kal gyorsabb deploy" },
  "cred.case.how.title": { en: "How", hu: "Hogyan" },
  "cred.case.how.items": { en: "Migrated CI/CD from Jenkins to GitHub Actions with zero downtime|Automated SOC2 evidence collection from PRs and deploys|Built rollback detection + release metrics dashboard", hu: "CI/CD migráció Jenkinsről GitHub Actions-re zero downtime-mal|SOC2 evidence automatikus gyűjtése PR-ekből és deployokból|Rollback detekció + release metrics dashboard kiépítése" },
  "cred.case.week1.title": { en: "Week 1 — Discovery & Analysis", hu: "1. hét — Feltérképezés & Elemzés" },
  "cred.case.week1.items": { en: "Pipeline audit across 4 products|Identified 3 critical bottlenecks|Mapped compliance gaps for SOC2", hu: "Pipeline audit 4 terméken|3 kritikus szűk keresztmetszet azonosítása|SOC2 compliance hiányosságok feltérképezése" },
  "cred.case.week2.title": { en: "Week 2 — Implementation & Results", hu: "2. hét — Implementáció & Eredmények" },
  "cred.case.week2.items": { en: "Automated rollback detection in CI/CD|Compliance evidence collection playbook|Release cadence optimization plan", hu: "Automatizált rollback detekció a CI/CD-ben|Compliance evidence gyűjtési playbook|Release ütemezés optimalizálási terv" },
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

  // Theme
  "theme.switchToLight": { en: "Switch to light mode", hu: "Váltás világos módra" },
  "theme.switchToDark": { en: "Switch to dark mode", hu: "Váltás sötét módra" },
  "theme.switchToSystem": { en: "Switch to system mode", hu: "Váltás rendszer módra" },
  "theme.system": { en: "System", hu: "Rendszer" },
  "theme.light": { en: "Light", hu: "Világos" },
  "theme.dark": { en: "Dark", hu: "Sötét" },

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

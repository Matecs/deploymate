import { ClipboardCheck, FileText, Cloud } from "lucide-react";

const packages = [
  {
    icon: ClipboardCheck,
    title: "Release Audit",
    description: "3-day deep technical audit + 1-week plan: how to cut rollbacks by 75% and make your release process audit-compatible.",
    bullets: [
      "Release board, CI/CD pipeline, on-call & monitoring review",
      "Written playbook: recommended release days, live-stage, UAT/Beta/Preview usage",
      "Rollback reduction plan and quick wins",
    ],
  },
  {
    icon: FileText,
    title: "Compliance Runbook",
    description: "Technical evidence and runbooks for SOC2 / ISO27001 audits — not legal advice, but DevOps/QA/Release side.",
    bullets: [
      "Audit evidence folder structure (change, access, incident, failover)",
      "Scheduled failover test scenarios",
      "Pentest results integration into the release process",
    ],
  },
  {
    icon: Cloud,
    title: "Migration Sprint",
    description: "Migrate a key pipeline to GitHub Actions with a zero-downtime target.",
    bullets: [
      "Current Jenkins/TeamCity pipeline mapping",
      "GitHub Actions workflow template + environment best practices",
      "Monitoring and alerting minimum setup",
    ],
  },
];

const PackagesSection = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="packages" className="py-24 md:py-32 bg-muted/50">
      <div className="container max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-accent font-medium text-sm tracking-widest uppercase mb-4">Services</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            What You Get in 2 Weeks
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Three focused engagement types — pick the one that matches your pain.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {packages.map((pkg, i) => (
            <div
              key={i}
              className="bg-card rounded-xl border border-border p-8 flex flex-col transition-shadow hover:shadow-lg"
              style={{ boxShadow: "var(--card-shadow)" }}
            >
              <div className="w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center mb-5">
                <pkg.icon className="w-5 h-5 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{pkg.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">{pkg.description}</p>
              <ul className="space-y-3 mb-8 flex-1">
                {pkg.bullets.map((b, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-foreground/80">
                    <span className="text-accent mt-1 flex-shrink-0">✓</span>
                    {b}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => scrollTo("cta")}
                className="w-full py-2.5 rounded-md border border-border text-foreground font-medium text-sm hover:bg-muted transition-colors"
              >
                Request This Package
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PackagesSection;

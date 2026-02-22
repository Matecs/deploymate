import { AlertTriangle, Search, Shield } from "lucide-react";

const items = [
  {
    icon: Shield,
    text: "You're preparing for your first SOC2 / ISO27001 audit",
  },
  {
    icon: AlertTriangle,
    text: "Weekly rollbacks, firefighting, CI/CD chaos",
  },
  {
    icon: Search,
    text: "Your CTO lacks visibility into release and compliance processes",
  },
];

const AudienceSection = () => {
  return (
    <section id="audience" className="py-24 md:py-32">
      <div className="container max-w-3xl mx-auto px-6 text-center">
        <p className="text-accent font-medium text-sm tracking-widest uppercase mb-4">Who Is This For?</p>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          20–150 Person SaaS Teams
        </h2>
        <p className="text-muted-foreground mb-12 text-lg">
          If any of these sound familiar, we should talk.
        </p>
        <div className="grid gap-6 text-left">
          {items.map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-4 bg-card rounded-lg p-6 border border-border"
              style={{ boxShadow: "var(--card-shadow)" }}
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-md bg-accent/10 flex items-center justify-center">
                <item.icon className="w-5 h-5 text-accent" />
              </div>
              <p className="text-foreground font-medium text-base leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AudienceSection;

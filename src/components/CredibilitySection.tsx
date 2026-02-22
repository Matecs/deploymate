import { Award, Cloud, Layers, ShieldCheck, Quote } from "lucide-react";

const credentials = [
  { icon: Award, text: "18 years in multi-product engineering operations (LogMeIn / GoTo)" },
  { icon: Layers, text: "4 products managed in parallel (Rescue, G2AC, SeeIt, Lens)" },
  { icon: Cloud, text: "12+ cloud/infra migrations (AWS, Azure, Oracle Cloud) with 0 downtime" },
  { icon: ShieldCheck, text: "100% audit pass rate: ISO27001, SOC2, SOX, NIS2 technical side" },
];

const testimonials = [
  "109 releases in a single year, only 1 rollback — our stability improved dramatically.",
  "He led the full GoToAssist Corporate stack migration to AWS with zero downtime.",
  "Quarterly compliance audits became practically painless working with him.",
];

const CredibilitySection = () => {
  return (
    <section id="credibility" className="py-24 md:py-32">
      <div className="container max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-accent font-medium text-sm tracking-widest uppercase mb-4">Track Record</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Why Me</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          {/* Credentials */}
          <div className="space-y-5">
            {credentials.map((c, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="flex-shrink-0 w-9 h-9 rounded-md bg-accent/10 flex items-center justify-center">
                  <c.icon className="w-4 h-4 text-accent" />
                </div>
                <p className="text-foreground text-sm leading-relaxed pt-1.5">{c.text}</p>
              </div>
            ))}
          </div>
          {/* Testimonials */}
          <div className="space-y-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="bg-card rounded-lg border border-border p-6 relative"
                style={{ boxShadow: "var(--card-shadow)" }}
              >
                <Quote className="w-5 h-5 text-accent/30 absolute top-4 right-4" />
                <p className="text-foreground/80 text-sm leading-relaxed italic">"{t}"</p>
                <p className="text-muted-foreground text-xs mt-3">— Engineering Leadership</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CredibilitySection;

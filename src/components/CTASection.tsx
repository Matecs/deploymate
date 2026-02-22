import { useState, FormEvent } from "react";
import { ArrowRight, Send } from "lucide-react";
import { useLang } from "@/lib/i18n";

const CTASection = () => {
  const { t } = useLang();
  const [formData, setFormData] = useState({ name: "", email: "", company: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="cta" className="py-24 md:py-32">
      <div className="container max-w-4xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
          <div>
            <p className="text-accent font-medium text-sm tracking-widest uppercase mb-4">{t("cta.tag")}</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">{t("cta.title")}</h2>
            <p className="text-muted-foreground text-base leading-relaxed mb-4">{t("cta.desc")}</p>
            <p className="text-muted-foreground text-sm italic mb-8">{t("cta.calendlyDesc")}</p>
            <a href="https://calendly.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-3.5 rounded-lg font-semibold text-base hover:opacity-90 transition-opacity">
              {t("cta.bookBtn")}
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          <div className="bg-card rounded-xl border border-border p-8" style={{ boxShadow: "var(--card-shadow)" }}>
            {submitted ? (
              <div className="text-center py-8">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <Send className="w-5 h-5 text-accent" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{t("cta.sent.title")}</h3>
                <p className="text-muted-foreground text-sm">{t("cta.sent.desc")}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">{t("cta.form.name")}</label>
                  <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-3.5 py-2.5 rounded-md border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" placeholder={t("cta.form.namePh")} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">{t("cta.form.email")}</label>
                  <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-3.5 py-2.5 rounded-md border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" placeholder={t("cta.form.emailPh")} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">{t("cta.form.company")}</label>
                  <input type="text" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} className="w-full px-3.5 py-2.5 rounded-md border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" placeholder={t("cta.form.companyPh")} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">{t("cta.form.message")}</label>
                  <textarea rows={3} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full px-3.5 py-2.5 rounded-md border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none" placeholder={t("cta.form.messagePh")} />
                </div>
                <button type="submit" className="w-full py-2.5 rounded-md bg-accent text-accent-foreground font-semibold text-sm hover:opacity-90 transition-opacity">
                  {t("cta.form.submit")}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;

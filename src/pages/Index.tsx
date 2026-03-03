import { useEffect } from "react";
import { LangProvider, useLang } from "@/lib/i18n";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import PainPointsSection from "@/components/PainPointsSection";
import AudienceSection from "@/components/AudienceSection";
import PackagesSection from "@/components/PackagesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import CredibilitySection from "@/components/CredibilitySection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const PageContent = () => {
  const { lang } = useLang();

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <PainPointsSection />
        <AudienceSection />
        <PackagesSection />
        <HowItWorksSection />
        <CredibilitySection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

const Index = () => {
  return (
    <LangProvider>
      <PageContent />
    </LangProvider>
  );
};

export default Index;

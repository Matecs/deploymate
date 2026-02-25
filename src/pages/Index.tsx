import { LangProvider } from "@/lib/i18n";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import PainPointsSection from "@/components/PainPointsSection";
import AudienceSection from "@/components/AudienceSection";
import PackagesSection from "@/components/PackagesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import CredibilitySection from "@/components/CredibilitySection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <LangProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <HeroSection />
        <PainPointsSection />
        <AudienceSection />
        <PackagesSection />
        <HowItWorksSection />
        <CredibilitySection />
        <CTASection />
        <Footer />
      </div>
    </LangProvider>
  );
};

export default Index;

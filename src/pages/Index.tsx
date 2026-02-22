import { LangProvider } from "@/lib/i18n";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AudienceSection from "@/components/AudienceSection";
import PackagesSection from "@/components/PackagesSection";
import CredibilitySection from "@/components/CredibilitySection";
import ProcessSection from "@/components/ProcessSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <LangProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <HeroSection />
        <AudienceSection />
        <PackagesSection />
        <CredibilitySection />
        <ProcessSection />
        <CTASection />
        <Footer />
      </div>
    </LangProvider>
  );
};

export default Index;

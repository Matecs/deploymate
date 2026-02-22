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
  );
};

export default Index;

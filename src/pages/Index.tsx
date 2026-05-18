import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { LangProvider, useLang } from "@/lib/i18n";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import PainPointsSection from "@/components/PainPointsSection";
import AudienceSection from "@/components/AudienceSection";
import PackagesSection from "@/components/PackagesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import CredibilitySection from "@/components/CredibilitySection";
import CTASection from "@/components/CTASection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import StickyCTA from "@/components/StickyCTA";
import ScrollProgress from "@/components/ScrollProgress";
import SectionDivider from "@/components/SectionDivider";

const PageContent = () => {
  const { lang } = useLang();

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <div className="min-h-dvh bg-background">
      <Helmet>
        <html lang={lang} />
        <link rel="canonical" href="https://deploymate.hu/" />
        <meta property="og:url" content="https://deploymate.hu/" />
        <meta property="og:locale" content={lang === "hu" ? "hu_HU" : "en_US"} />
      </Helmet>
      <Header />
      <ScrollProgress />
      <main>
        <HeroSection />
        <SectionDivider variant="wave" />
        <PainPointsSection />
        <SectionDivider variant="wave" flip />
        <AudienceSection />
        <SectionDivider variant="angle" />
        <PackagesSection />
        <SectionDivider variant="angle" flip />
        <HowItWorksSection />
        <SectionDivider variant="wave" />
        <CredibilitySection />
        <SectionDivider variant="wave" flip />
        <FAQSection />
        <SectionDivider variant="wave" />
        <CTASection />
      </main>
      <StickyCTA />
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

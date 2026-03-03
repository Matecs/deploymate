import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { motion, AnimatePresence } from "framer-motion";

const StickyCTA = () => {
  const { t } = useLang();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past ~80% of viewport height (hero)
      setVisible(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToCTA = () => {
    document.getElementById("cta")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 z-50 md:bottom-6 md:left-auto md:right-6 md:w-auto"
        >
          {/* Mobile: full-width bar */}
          <div className="bg-primary/95 backdrop-blur-sm border-t border-accent/20 px-4 py-3 md:rounded-xl md:border md:border-accent/20 md:shadow-lg md:px-5 md:py-3 flex items-center justify-between gap-3 md:gap-4">
            <span className="text-primary-foreground/80 text-sm font-medium hidden sm:inline">
              {t("sticky.text")}
            </span>
            <button
              onClick={scrollToCTA}
              className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground px-6 py-2.5 rounded-lg font-bold text-sm hover:opacity-90 transition-opacity"
            >
              {t("nav.bookCall")}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyCTA;

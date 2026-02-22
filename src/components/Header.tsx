import { Shield } from "lucide-react";

const Header = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
      <div className="container flex items-center justify-between h-16">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-accent" />
          <span className="font-semibold text-foreground text-sm">RCOA</span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <button onClick={() => scrollTo("packages")} className="hover:text-foreground transition-colors">Services</button>
          <button onClick={() => scrollTo("credibility")} className="hover:text-foreground transition-colors">Why Me</button>
          <button onClick={() => scrollTo("process")} className="hover:text-foreground transition-colors">Process</button>
          <button onClick={() => scrollTo("cta")} className="hover:text-foreground transition-colors bg-accent text-accent-foreground px-4 py-2 rounded-md font-medium">
            Book a Call
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;

import { Shield } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border py-10">
      <div className="container max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-accent" />
          <span>Release & Compliance Operations Architect</span>
        </div>
        <p>© {new Date().getFullYear()} · All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;

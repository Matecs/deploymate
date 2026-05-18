import logoLight from "@/assets/deploymate-logo.png";
import logoDark from "@/assets/deploymate-logo-dark.png";

interface LogoProps {
  alt?: string;
  className?: string;
  loading?: "lazy" | "eager";
}

/**
 * DeployMate logo that automatically switches between light and dark
 * colorways based on the active theme (.dark class) and the user's
 * system color-scheme preference.
 */
const Logo = ({ alt = "DeployMate", className = "h-12 w-auto", loading = "eager" }: LogoProps) => (
  <picture>
    {/* System dark preference (works even without .dark class) */}
    <source srcSet={logoDark} media="(prefers-color-scheme: dark)" />
    {/* Light (default) — overridden by tailwind dark: class below */}
    <img src={logoLight} alt={alt} loading={loading} className={`${className} block dark:hidden`} />
    <img src={logoDark} alt="" aria-hidden="true" loading={loading} className={`${className} hidden dark:block`} />
  </picture>
);

export default Logo;

import { useTheme } from "@/lib/theme";
import logoLight from "@/assets/deploymate-logo.png";
import logoDark from "@/assets/deploymate-logo-dark.png";

interface LogoProps {
  alt?: string;
  className?: string;
  loading?: "lazy" | "eager";
}

/**
 * DeployMate logo that automatically switches between light and dark
 * colorways based on the active theme (.dark class).
 */
const Logo = ({ alt = "DeployMate", className = "h-12 w-auto", loading = "eager" }: LogoProps) => {
  const { resolvedTheme } = useTheme();

  return (
    <img
      src={resolvedTheme === "dark" ? logoDark : logoLight}
      alt={alt}
      loading={loading}
      className={className}
    />
  );
};

export default Logo;

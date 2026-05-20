import logoLight from "@/assets/deploymate-logo.png";
import logoDark from "@/assets/deploymate-logo-dark.png";

interface LogoProps {
  alt?: string;
  className?: string;
  loading?: "lazy" | "eager";
}

const Logo = ({ alt = "DeployMate", className = "h-7 w-auto", loading }: LogoProps) => {
  return (
    <>
      <img src={logoLight} alt={alt} className={`${className} block dark:hidden`} loading={loading} />
      <img src={logoDark} alt={alt} className={`${className} hidden dark:block`} loading={loading} />
    </>
  );
};

export default Logo;

interface LogoProps {
  alt?: string;
  className?: string;
  loading?: "lazy" | "eager";
}

/**
 * DeployMate logo — minimalist emerald checkmark integrated into a
 * horizontal line, followed by a monospace wordmark. Uses semantic
 * theme tokens so it adapts to both light and dark mode automatically.
 */
const Logo = ({ alt = "DeployMate", className = "h-7 w-auto", loading: _loading }: LogoProps) => {
  return (
    <svg
      role="img"
      aria-label={alt}
      viewBox="0 0 260 40"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="xMinYMid meet"
    >
      {/* Horizontal precision line with checkmark integrated at the break */}
      <line
        x1="2"
        y1="20"
        x2="22"
        y2="20"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.55"
      />
      <polyline
        points="24,20 30,28 42,10"
        fill="none"
        stroke="hsl(var(--accent))"
        strokeWidth="2.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        x1="44"
        y1="20"
        x2="60"
        y2="20"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.55"
      />
      {/* Wordmark */}
      <text
        x="70"
        y="26"
        fill="currentColor"
        fontFamily="'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace"
        fontSize="18"
        fontWeight="600"
        letterSpacing="0.5"
      >
        deploymate
      </text>
    </svg>
  );
};

export default Logo;

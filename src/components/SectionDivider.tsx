interface SectionDividerProps {
  variant?: "wave" | "angle";
  flip?: boolean;
  fromColor?: string;
  toColor?: string;
}

const SectionDivider = ({ variant = "wave", flip = false }: SectionDividerProps) => {
  return (
    <div className={`w-full overflow-hidden leading-[0] ${flip ? "rotate-180" : ""}`} aria-hidden="true">
      {variant === "wave" ? (
        <svg viewBox="0 0 1200 40" preserveAspectRatio="none" className="w-full h-6 md:h-10">
          <path
            d="M0,20 C200,40 400,0 600,20 C800,40 1000,0 1200,20 L1200,40 L0,40 Z"
            className="fill-muted/30"
          />
        </svg>
      ) : (
        <svg viewBox="0 0 1200 40" preserveAspectRatio="none" className="w-full h-6 md:h-10">
          <polygon points="0,40 1200,0 1200,40" className="fill-muted/30" />
        </svg>
      )}
    </div>
  );
};

export default SectionDivider;

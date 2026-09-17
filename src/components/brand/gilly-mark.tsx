const CLOUD_PATH =
  "M18 60 A12 12 0 0 1 8 44 A20 20 0 0 1 34 22 A26 26 0 0 1 82 20 A18 18 0 0 1 110 46 A11 11 0 0 1 104 60 Z";

type MarkProps = {
  size?: number;
  className?: string;
  /** badge = white cloud on the brand orange circle (matches the storefront sign) */
  variant?: "badge" | "plain";
  blink?: boolean;
  title?: string;
};

/**
 * The Gilly cloud face — the shop's own mark, rebuilt as vector so it stays
 * crisp at any size and can be recolored per surface.
 */
export function GillyMark({
  size = 48,
  className,
  variant = "badge",
  blink = true,
  title = "Gilly Brinquedos",
}: MarkProps) {
  const isBadge = variant === "badge";
  const cloudFill = isBadge ? "#FFFFFF" : "#FFFFFF";
  const featureColor = isBadge ? "#2B2018" : "#2B2018";

  return (
    <svg
      viewBox="0 0 132 132"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label={title}
    >
      {isBadge && (
        <>
          <defs>
            <radialGradient id="gilly-badge" cx="35%" cy="28%" r="85%">
              <stop offset="0%" stopColor="#FF8A3D" />
              <stop offset="55%" stopColor="#F2600A" />
              <stop offset="100%" stopColor="#D24A02" />
            </radialGradient>
          </defs>
          <circle cx="66" cy="66" r="66" fill="url(#gilly-badge)" />
        </>
      )}

      <g transform={isBadge ? "translate(9 30) scale(0.87)" : "translate(2 26) scale(0.96)"}>
        <path d={CLOUD_PATH} fill={cloudFill} />

        {/* cheeks */}
        <ellipse cx="34" cy="46" rx="8" ry="5.5" fill="#FFB38A" opacity="0.75" />
        <ellipse cx="86" cy="46" rx="8" ry="5.5" fill="#FFB38A" opacity="0.75" />

        {/* eyes */}
        <g className={blink ? "animate-blink" : undefined} style={{ transformOrigin: "60px 40px" }}>
          <ellipse cx="48" cy="39" rx="5" ry="6.4" fill={featureColor} />
          <ellipse cx="72" cy="39" rx="5" ry="6.4" fill={featureColor} />
          <circle cx="49.8" cy="36.6" r="1.8" fill="#FFFFFF" />
          <circle cx="73.8" cy="36.6" r="1.8" fill="#FFFFFF" />
        </g>

        {/* smile */}
        <path
          d="M53 50 Q60 57 67 50"
          stroke={featureColor}
          strokeWidth="3.4"
          strokeLinecap="round"
          fill="none"
        />
      </g>
    </svg>
  );
}

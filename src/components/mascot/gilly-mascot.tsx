type GillyMood = "happy" | "wave" | "celebrate" | "search" | "sleepy" | "love";

const CLOUD_FILL = "#FFFFFF";
const CLOUD_STROKE = "#F2600A";

function Face({ mood }: { mood: GillyMood }) {
  if (mood === "sleepy") {
    return (
      <>
        <path d="M78 90c4 4 10 4 14 0" stroke="#24211D" strokeWidth="3.5" strokeLinecap="round" fill="none" />
        <path d="M118 90c4 4 10 4 14 0" stroke="#24211D" strokeWidth="3.5" strokeLinecap="round" fill="none" />
        <path d="M102 104c3 3 7 3 10 0" stroke="#24211D" strokeWidth="3.5" strokeLinecap="round" fill="none" />
      </>
    );
  }
  if (mood === "love") {
    return (
      <>
        <path d="M83 92c2.5-4 9-4 9 1.5 0-5.5 6.5-5.5 9-1.5 2 3.5-5 9-9 11-4-2-11-7.5-9-11z" fill={CLOUD_STROKE} />
        <path d="M113 92c2.5-4 9-4 9 1.5 0-5.5 6.5-5.5 9-1.5 2 3.5-5 9-9 11-4-2-11-7.5-9-11z" fill={CLOUD_STROKE} />
        <path d="M98 108c4 4 10 4 14 0" stroke="#24211D" strokeWidth="3.5" strokeLinecap="round" fill="none" />
      </>
    );
  }
  return (
    <>
      <circle cx="88" cy="94" r="4.5" fill="#24211D" />
      <circle cx="128" cy="94" r="4.5" fill="#24211D" />
      <circle cx="79" cy="98" r="6" fill="#F2600A" opacity="0.35" />
      <circle cx="137" cy="98" r="6" fill="#F2600A" opacity="0.35" />
      {mood === "celebrate" ? (
        <path d="M96 106c5 6 15 6 20 0" stroke="#24211D" strokeWidth="3.5" strokeLinecap="round" fill="none" />
      ) : (
        <path d="M98 104c4 5 14 5 18 0" stroke="#24211D" strokeWidth="3.5" strokeLinecap="round" fill="none" />
      )}
    </>
  );
}

export function GillyMascot({
  mood = "happy",
  className,
  size = 160,
}: {
  mood?: GillyMood;
  className?: string;
  size?: number;
}) {
  return (
    <svg
      viewBox="0 0 208 176"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label="Mascote Gilly"
    >
      <ellipse cx="104" cy="150" rx="52" ry="8" fill="#F2600A" opacity="0.12" />

      <g stroke={CLOUD_STROKE} strokeWidth="4">
        <circle cx="60" cy="88" r="30" fill={CLOUD_FILL} />
        <circle cx="104" cy="66" r="38" fill={CLOUD_FILL} />
        <circle cx="150" cy="90" r="28" fill={CLOUD_FILL} />
        <rect x="46" y="86" width="116" height="46" rx="23" fill={CLOUD_FILL} />
      </g>
      <rect x="49" y="89" width="110" height="40" rx="20" fill={CLOUD_FILL} />

      <Face mood={mood} />

      {mood === "wave" && (
        <g>
          <circle cx="176" cy="70" r="12" fill="#FFC53D" />
          <path d="M170 64l6 6-6 6" stroke="#24211D" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </g>
      )}

      {mood === "celebrate" && (
        <g>
          <rect x="96" y="18" width="16" height="20" rx="3" fill="#F14C86" transform="rotate(-10 104 28)" />
          <circle cx="40" cy="40" r="4" fill="#2FA8D5" />
          <circle cx="170" cy="36" r="4" fill="#FFC53D" />
          <circle cx="180" cy="60" r="3" fill="#F14C86" />
          <circle cx="24" cy="64" r="3" fill="#FFC53D" />
        </g>
      )}

      {mood === "search" && (
        <g transform="translate(150 108) rotate(20)">
          <circle cx="0" cy="0" r="12" fill="none" stroke="#2FA8D5" strokeWidth="4" />
          <line x1="9" y1="9" x2="20" y2="20" stroke="#2FA8D5" strokeWidth="4" strokeLinecap="round" />
        </g>
      )}

      {mood === "sleepy" && (
        <text x="150" y="60" fontSize="18" fill="#2FA8D5" fontFamily="var(--font-display, sans-serif)">
          zZz
        </text>
      )}
    </svg>
  );
}

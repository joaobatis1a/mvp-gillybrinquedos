type GillyMood = "happy" | "wave" | "celebrate" | "search" | "sleepy" | "love";

const CLOUD_PATH =
  "M18 60 A12 12 0 0 1 8 44 A20 20 0 0 1 34 22 A26 26 0 0 1 82 20 A18 18 0 0 1 110 46 A11 11 0 0 1 104 60 Z";

const INK = "#2B2018";

function Eyes({ mood }: { mood: GillyMood }) {
  if (mood === "sleepy") {
    return (
      <g stroke={INK} strokeWidth="3.4" strokeLinecap="round" fill="none">
        <path d="M41 39 Q48 45 55 39" />
        <path d="M65 39 Q72 45 79 39" />
      </g>
    );
  }

  if (mood === "love") {
    return (
      <g fill="#FF5C93">
        <path d="M42 34c2.6-3.6 8.6-2.6 8.6 2 0 4-5 7.4-8.6 9.6-3.6-2.2-8.6-5.6-8.6-9.6 0-4.6 6-5.6 8.6-2z" transform="translate(6 0)" />
        <path d="M42 34c2.6-3.6 8.6-2.6 8.6 2 0 4-5 7.4-8.6 9.6-3.6-2.2-8.6-5.6-8.6-9.6 0-4.6 6-5.6 8.6-2z" transform="translate(30 0)" />
      </g>
    );
  }

  const squint = mood === "celebrate";

  return (
    <g className="animate-blink" style={{ transformOrigin: "60px 40px" }}>
      {squint ? (
        <g stroke={INK} strokeWidth="3.6" strokeLinecap="round" fill="none">
          <path d="M41 42 Q48 34 55 42" />
          <path d="M65 42 Q72 34 79 42" />
        </g>
      ) : (
        <>
          <ellipse cx="48" cy="39" rx="5.1" ry="6.6" fill={INK} />
          <ellipse cx="72" cy="39" rx="5.1" ry="6.6" fill={INK} />
          <circle cx="49.9" cy="36.5" r="1.9" fill="#fff" />
          <circle cx="73.9" cy="36.5" r="1.9" fill="#fff" />
        </>
      )}
    </g>
  );
}

function Mouth({ mood }: { mood: GillyMood }) {
  if (mood === "sleepy") {
    return <ellipse cx="60" cy="51" rx="4" ry="5" fill={INK} opacity="0.85" />;
  }
  if (mood === "celebrate") {
    return (
      <>
        <path d="M50 49 Q60 62 70 49 Z" fill={INK} />
        <path d="M54.5 55 Q60 59 65.5 55 Z" fill="#FF7D9C" />
      </>
    );
  }
  return (
    <path
      d={mood === "love" ? "M51 51 Q60 60 69 51" : "M52 50 Q60 58 68 50"}
      stroke={INK}
      strokeWidth="3.6"
      strokeLinecap="round"
      fill="none"
    />
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
      viewBox="0 0 200 180"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label="Nina, a mascote da loja"
    >
      <defs>
        <radialGradient id="gilly-body" cx="34%" cy="26%" r="82%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="72%" stopColor="#FFF9F2" />
          <stop offset="100%" stopColor="#FFE9D6" />
        </radialGradient>
        <linearGradient id="gilly-shadow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F2600A" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#F2600A" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* ground shadow */}
      <ellipse cx="100" cy="163" rx="46" ry="9" fill="url(#gilly-shadow)" />

      {/* confetti / accessories behind the body */}
      {mood === "celebrate" && (
        <g>
          <rect x="30" y="26" width="9" height="13" rx="3" fill="#3FB0E5" transform="rotate(-18 34 32)" />
          <rect x="160" y="34" width="8" height="12" rx="3" fill="#FF5C93" transform="rotate(22 164 40)" />
          <circle cx="24" cy="70" r="4.5" fill="#FFC53D" />
          <circle cx="176" cy="84" r="4" fill="#8B5CF6" />
          <path d="M150 18 l4 8 l8 4 l-8 4 l-4 8 l-4 -8 l-8 -4 l8 -4 z" fill="#FFC53D" />
        </g>
      )}

      {mood === "sleepy" && (
        <g fill="#3FB0E5" fontFamily="var(--font-display, sans-serif)" fontWeight="700">
          <text x="150" y="44" fontSize="15" opacity="0.9">z</text>
          <text x="163" y="30" fontSize="19" opacity="0.7">Z</text>
          <text x="140" y="26" fontSize="12" opacity="0.5">z</text>
        </g>
      )}

      {/* arms */}
      <g fill="url(#gilly-body)" stroke="#F5B98F" strokeWidth="3">
        <ellipse
          cx="34"
          cy="112"
          rx="15"
          ry="11"
          className={mood === "wave" ? undefined : "animate-float-sm"}
          style={{ transformOrigin: "44px 112px", ["--tilt" as string]: "4deg" }}
        />
        <ellipse
          cx="166"
          cy={mood === "wave" ? 84 : 112}
          rx="15"
          ry="11"
          className={mood === "wave" ? "animate-wiggle" : "animate-float-sm"}
          style={{
            transformOrigin: "154px 100px",
            animationIterationCount: mood === "wave" ? "infinite" : undefined,
            animationDuration: mood === "wave" ? "1.1s" : undefined,
            ["--tilt" as string]: "-4deg",
          }}
        />
      </g>

      {/* body */}
      <g transform="translate(40 46) scale(1)">
        <path d={CLOUD_PATH} fill="url(#gilly-body)" stroke="#F5B98F" strokeWidth="3.4" strokeLinejoin="round" />
        <ellipse cx="34" cy="47" rx="8.6" ry="5.8" fill="#FFB38A" opacity="0.8" />
        <ellipse cx="86" cy="47" rx="8.6" ry="5.8" fill="#FFB38A" opacity="0.8" />
        <Eyes mood={mood} />
        <Mouth mood={mood} />
      </g>

      {/* held props */}
      {mood === "search" && (
        <g transform="translate(150 104) rotate(18)">
          <circle cx="0" cy="0" r="16" fill="#DFF2FD" stroke="#1B83BB" strokeWidth="5" />
          <circle cx="-4" cy="-5" r="5" fill="#fff" opacity="0.8" />
          <rect x="11" y="11" width="18" height="7" rx="3.5" fill="#1B83BB" transform="rotate(45 11 11)" />
        </g>
      )}

      {mood === "love" && (
        <g fill="#FF5C93" opacity="0.9">
          <path
            d="M0 6c2-2.8 6.6-2 6.6 1.6 0 3-3.8 5.6-6.6 7.4-2.8-1.8-6.6-4.4-6.6-7.4C-6.6 4-2 3.2 0 6z"
            transform="translate(44 34) scale(1.1)"
            className="animate-float"
          />
          <path
            d="M0 6c2-2.8 6.6-2 6.6 1.6 0 3-3.8 5.6-6.6 7.4-2.8-1.8-6.6-4.4-6.6-7.4C-6.6 4-2 3.2 0 6z"
            transform="translate(158 48) scale(0.85)"
            className="animate-float"
            style={{ animationDelay: "0.8s" }}
          />
        </g>
      )}
    </svg>
  );
}

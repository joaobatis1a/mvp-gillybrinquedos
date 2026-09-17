const CLOUD_PATH =
  "M18 60 A12 12 0 0 1 8 44 A20 20 0 0 1 34 22 A26 26 0 0 1 82 20 A18 18 0 0 1 110 46 A11 11 0 0 1 104 60 Z";

type DriftingCloud = {
  top: string;
  scale: number;
  opacity: number;
  duration: number;
  delay: number;
  reverse?: boolean;
};

// poucas nuvens, bem discretas — um aceno à mascote, não um cenário
const CLOUDS: DriftingCloud[] = [
  { top: "8%", scale: 1.1, opacity: 0.35, duration: 150, delay: -20 },
  { top: "62%", scale: 0.8, opacity: 0.28, duration: 190, delay: -90, reverse: true },
];

/** Fundo fixo da loja: cor sólida, com um par de nuvens bem sutis em parallax lento. */
export function SkyBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-cream">
      {CLOUDS.map((cloud, index) => (
        <svg
          key={index}
          viewBox="0 0 120 72"
          className="absolute w-40"
          style={{
            top: cloud.top,
            left: 0,
            opacity: cloud.opacity,
            transform: `scale(${cloud.scale})`,
            animation: `${cloud.reverse ? "drift-back" : "drift"} ${cloud.duration}s linear ${cloud.delay}s infinite`,
          }}
        >
          <path d={CLOUD_PATH} fill="#FFFFFF" />
        </svg>
      ))}
    </div>
  );
}

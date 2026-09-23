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

const CLOUDS: DriftingCloud[] = [
  { top: "4%", scale: 1.5, opacity: 0.85, duration: 92, delay: -8 },
  { top: "12%", scale: 0.7, opacity: 0.4, duration: 118, delay: -30 },
  { top: "18%", scale: 0.9, opacity: 0.6, duration: 128, delay: -54, reverse: true },
  { top: "26%", scale: 1.3, opacity: 0.42, duration: 104, delay: -66, reverse: true },
  { top: "34%", scale: 2.1, opacity: 0.5, duration: 160, delay: -22 },
  { top: "44%", scale: 0.85, opacity: 0.35, duration: 96, delay: -44 },
  { top: "52%", scale: 1.1, opacity: 0.45, duration: 112, delay: -76, reverse: true },
  { top: "60%", scale: 1.6, opacity: 0.3, duration: 150, delay: -12, reverse: true },
  { top: "68%", scale: 1.7, opacity: 0.38, duration: 146, delay: -34 },
  { top: "76%", scale: 0.6, opacity: 0.5, duration: 88, delay: -20 },
  { top: "84%", scale: 0.8, opacity: 0.55, duration: 100, delay: -62 },
  { top: "92%", scale: 1.2, opacity: 0.32, duration: 134, delay: -48, reverse: true },
];

const SPARKS = [
  { left: "8%", size: 7, delay: 0, duration: 15, color: "#FFC53D" },
  { left: "21%", size: 5, delay: 4.5, duration: 18, color: "#FF5C93" },
  { left: "37%", size: 6, delay: 9, duration: 14, color: "#3FB0E5" },
  { left: "52%", size: 4, delay: 2, duration: 20, color: "#F2600A" },
  { left: "68%", size: 7, delay: 11, duration: 16, color: "#3FC4A0" },
  { left: "81%", size: 5, delay: 6.5, duration: 19, color: "#8B5CF6" },
  { left: "93%", size: 6, delay: 13, duration: 17, color: "#FFC53D" },
];

/** Céu de fundo: gradiente quente, brilho de sol, nuvens em parallax e faíscas subindo. */
export function SkyBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* base */}
      <div className="absolute inset-0 bg-[linear-gradient(175deg,#FFF9F1_0%,#FFF4E6_38%,#FDF0E3_62%,#F6F1E6_100%)]" />

      {/* sol quente no canto superior direito */}
      <div
        className="animate-glow absolute -right-24 -top-32 h-[34rem] w-[34rem] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(255,197,61,0.55) 0%, rgba(242,96,10,0.22) 45%, transparent 72%)",
        }}
      />

      {/* brilho frio na base */}
      <div
        className="animate-glow absolute -bottom-40 -left-24 h-[30rem] w-[30rem] rounded-full blur-3xl"
        style={{
          animationDelay: "3.5s",
          background:
            "radial-gradient(circle, rgba(63,176,229,0.32) 0%, rgba(255,92,147,0.18) 50%, transparent 74%)",
        }}
      />

      {/* nuvens em deriva */}
      {CLOUDS.map((cloud, index) => (
        <svg
          key={index}
          viewBox="0 0 120 72"
          className="absolute w-48"
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

      {/* faíscas subindo */}
      {SPARKS.map((spark, index) => (
        <span
          key={index}
          className="absolute bottom-0 block rounded-full"
          style={{
            left: spark.left,
            width: spark.size,
            height: spark.size,
            background: spark.color,
            opacity: 0,
            animation: `rise ${spark.duration}s ease-in ${spark.delay}s infinite`,
          }}
        />
      ))}

      {/* textura pontilhada bem sutil */}
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: "radial-gradient(rgba(180,130,80,0.18) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />
    </div>
  );
}

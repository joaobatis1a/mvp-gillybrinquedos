import { ToyArt, type ToyArtKey } from "@/components/toys/toy-art";
import type { CategoryAccent } from "@/lib/types";

const ACCENT: Record<CategoryAccent, { bg: string; blob: string; dot: string }> = {
  gilly: { bg: "from-gilly-light to-gilly-tint", blob: "bg-gilly/15", dot: "bg-gilly/25" },
  sky: { bg: "from-sky-light to-white", blob: "bg-sky/15", dot: "bg-sky/25" },
  candy: { bg: "from-candy-light to-white", blob: "bg-candy/15", dot: "bg-candy/25" },
  sun: { bg: "from-sun-light to-white", blob: "bg-sun/25", dot: "bg-sun/35" },
  mint: { bg: "from-mint-light to-white", blob: "bg-mint/15", dot: "bg-mint/25" },
  grape: { bg: "from-grape-light to-white", blob: "bg-grape/15", dot: "bg-grape/25" },
};

const GRADIENT_DIR = ["bg-gradient-to-br", "bg-gradient-to-tr", "bg-gradient-to-b"] as const;
const ART_ROTATION = ["-6deg", "0deg", "7deg"] as const;

/** Espalha variações a partir do id do produto para que itens da mesma
 *  categoria não fiquem com o cartão idêntico. */
function seedOf(seed: string | undefined) {
  if (!seed) return 0;
  let total = 0;
  for (let i = 0; i < seed.length; i += 1) total += seed.charCodeAt(i);
  return total % 3;
}

export function ProductArt({
  art,
  accent,
  className,
  artSize = 130,
  floating = true,
  seed,
}: {
  art: ToyArtKey;
  accent: CategoryAccent;
  className?: string;
  artSize?: number;
  floating?: boolean;
  seed?: string;
}) {
  const tone = ACCENT[accent];
  const variant = seedOf(seed);

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden rounded-[1.4rem] ${GRADIENT_DIR[variant]} ${tone.bg} ${className ?? ""}`}
    >
      {/* halo */}
      <div className={`absolute h-[62%] w-[62%] rounded-full blur-2xl ${tone.blob}`} />

      {/* anel decorativo */}
      <div className="absolute inset-[12%] rounded-full border-2 border-dashed border-white/60 opacity-70" />

      {/* pontinhos */}
      <span className={`absolute left-[14%] top-[18%] h-2 w-2 rounded-full ${tone.dot}`} />
      <span className={`absolute right-[16%] top-[26%] h-3 w-3 rounded-full ${tone.dot}`} />
      <span className={`absolute bottom-[18%] left-[22%] h-2.5 w-2.5 rounded-full ${tone.dot}`} />

      <span
        className={`relative drop-shadow-[0_10px_16px_rgba(105,62,20,0.18)] transition-transform duration-500 ease-out group-hover:scale-110 ${
          floating ? "animate-float" : ""
        }`}
        style={{ animationDelay: `${variant * 0.9}s` }}
      >
        <span
          className="block transition-transform duration-500 ease-out group-hover:rotate-0"
          style={{ transform: `rotate(${ART_ROTATION[variant]})` }}
        >
          <ToyArt art={art} size={artSize} />
        </span>
      </span>
    </div>
  );
}

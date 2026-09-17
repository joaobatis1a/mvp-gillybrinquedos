import type { ReactNode } from "react";

type BadgeTone = "gilly" | "sky" | "candy" | "sun" | "success" | "danger" | "neutral";

const toneClasses: Record<BadgeTone, string> = {
  gilly: "bg-gilly-light text-gilly-dark",
  sky: "bg-sky-light text-sky",
  candy: "bg-candy-light text-candy",
  sun: "bg-sun-light text-[#8a6110]",
  success: "bg-success-light text-success",
  danger: "bg-danger-light text-danger",
  neutral: "bg-black/5 text-ink-soft",
};

export function Badge({ tone = "neutral", children }: { tone?: BadgeTone; children: ReactNode }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${toneClasses[tone]}`}
    >
      {children}
    </span>
  );
}

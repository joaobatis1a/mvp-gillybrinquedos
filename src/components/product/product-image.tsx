import type { CategoryAccent } from "@/lib/types";

const ACCENT_BG: Record<CategoryAccent, string> = {
  gilly: "bg-gilly-light",
  sky: "bg-sky-light",
  candy: "bg-candy-light",
  sun: "bg-sun-light",
};

export function ProductImage({
  emoji,
  accent,
  className,
  emojiClassName,
}: {
  emoji: string;
  accent: CategoryAccent;
  className?: string;
  emojiClassName?: string;
}) {
  return (
    <div
      className={`flex items-center justify-center overflow-hidden rounded-2xl ${ACCENT_BG[accent]} ${className ?? ""}`}
    >
      <span className={emojiClassName ?? "text-6xl"} aria-hidden>
        {emoji}
      </span>
    </div>
  );
}

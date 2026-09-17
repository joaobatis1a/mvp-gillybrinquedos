import Link from "next/link";
import { GillyMark } from "@/components/brand/gilly-mark";

type LogoProps = {
  size?: "sm" | "md" | "lg";
  tone?: "default" | "light";
  href?: string | null;
  className?: string;
};

const MARK_SIZE = { sm: 36, md: 44, lg: 60 } as const;
const WORD_SIZE = {
  sm: "text-lg",
  md: "text-[1.45rem]",
  lg: "text-3xl",
} as const;
const SUB_SIZE = {
  sm: "text-[0.5rem] tracking-[0.34em]",
  md: "text-[0.55rem] tracking-[0.38em]",
  lg: "text-[0.7rem] tracking-[0.4em]",
} as const;

export function GillyLogo({ size = "md", tone = "default", href = "/", className }: LogoProps) {
  const wordColor = tone === "light" ? "text-white" : "text-gilly";
  const subColor = tone === "light" ? "text-white/70" : "text-ink-soft";

  const content = (
    <span className={`group/logo flex shrink-0 items-center gap-2.5 ${className ?? ""}`}>
      <span className="transition-transform duration-500 ease-out group-hover/logo:-rotate-6 group-hover/logo:scale-105">
        <GillyMark size={MARK_SIZE[size]} />
      </span>
      <span className="flex flex-col leading-none">
        <span className={`font-display font-extrabold ${WORD_SIZE[size]} ${wordColor}`}>
          Gilly
        </span>
        <span className={`font-semibold uppercase ${SUB_SIZE[size]} ${subColor}`}>
          Brinquedos
        </span>
      </span>
    </span>
  );

  if (!href) return content;

  return (
    <Link href={href} aria-label="Gilly Brinquedos — página inicial">
      {content}
    </Link>
  );
}

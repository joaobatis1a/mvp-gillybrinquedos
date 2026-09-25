import Link from "next/link";

const CLOUD_PATH =
  "M18 60 A12 12 0 0 1 8 44 A20 20 0 0 1 34 22 A26 26 0 0 1 82 20 A18 18 0 0 1 110 46 A11 11 0 0 1 104 60 Z";

type LogoProps = {
  size?: "sm" | "md" | "lg";
  href?: string | null;
  className?: string;
  /** "light" troca a cor do texto para uso sobre fundo escuro (ex.: rodapé) */
  tone?: "default" | "light";
};

const MARK_SIZE = { sm: 36, md: 44, lg: 60 } as const;
const WORD_SIZE = {
  sm: "text-lg",
  md: "text-[1.45rem]",
  lg: "text-3xl",
} as const;

export function GillyLogo({ size = "md", href = "/", className, tone = "default" }: LogoProps) {
  const wordColor = tone === "light" ? "text-white" : "text-gilly";
  const restColor = tone === "light" ? "text-white/80" : "text-ink";

  const content = (
    <span className={`group/logo flex shrink-0 items-center gap-2.5 ${className ?? ""}`}>
      <span
        className="flex shrink-0 items-center justify-center rounded-full bg-gilly shadow-[0_2px_6px_rgba(105,62,20,0.25)] transition-transform duration-500 ease-out group-hover/logo:-rotate-6 group-hover/logo:scale-105"
        style={{ width: MARK_SIZE[size], height: MARK_SIZE[size] }}
        aria-hidden
      >
        <svg viewBox="0 0 120 72" className="h-[62%] w-[62%] text-white">
          <path d={CLOUD_PATH} fill="currentColor" />
        </svg>
      </span>
      <span className={`font-display font-extrabold leading-none ${WORD_SIZE[size]}`}>
        <span className={wordColor}>Nina</span>
        <span className={restColor}>brinquedos</span>
      </span>
    </span>
  );

  if (!href) return content;

  return (
    <Link href={href} aria-label="Ir para a página inicial da Nina Brinquedos">
      {content}
    </Link>
  );
}

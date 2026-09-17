import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/brand/gilly-logo.png";

type LogoProps = {
  size?: "sm" | "md" | "lg";
  href?: string | null;
  className?: string;
  /** esconde a legenda "Loja de brinquedos" ao lado da marca */
  hideCaption?: boolean;
  /** "light" ajusta a legenda para textos sobre fundo escuro (ex.: rodapé) */
  tone?: "default" | "light";
};

const MARK_SIZE = { sm: 38, md: 46, lg: 64 } as const;
const CAPTION_SIZE = {
  sm: "text-[0.6rem]",
  md: "text-[0.65rem]",
  lg: "text-xs",
} as const;

export function GillyLogo({
  size = "md",
  href = "/",
  className,
  hideCaption,
  tone = "default",
}: LogoProps) {
  const content = (
    <span className={`group/logo flex shrink-0 items-center gap-2.5 ${className ?? ""}`}>
      <Image
        src={logo}
        alt="Gilly Brinquedos"
        width={MARK_SIZE[size]}
        height={MARK_SIZE[size]}
        priority
        className="rounded-full shadow-[0_2px_6px_rgba(105,62,20,0.25)] transition-transform duration-500 ease-out group-hover/logo:-rotate-6 group-hover/logo:scale-105"
      />
      {!hideCaption && (
        <span
          className={`hidden font-semibold uppercase tracking-[0.16em] sm:inline ${CAPTION_SIZE[size]} ${
            tone === "light" ? "text-white/60" : "text-ink-soft"
          }`}
        >
          Loja de brinquedos
        </span>
      )}
    </span>
  );

  if (!href) return content;

  return (
    <Link href={href} aria-label="Gilly Brinquedos — página inicial">
      {content}
    </Link>
  );
}

import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/brand/gilly-logo.png";

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
      <Image
        src={logo}
        alt=""
        width={MARK_SIZE[size]}
        height={MARK_SIZE[size]}
        priority
        className="rounded-full shadow-[0_2px_6px_rgba(105,62,20,0.25)] transition-transform duration-500 ease-out group-hover/logo:-rotate-6 group-hover/logo:scale-105"
      />
      <span className={`font-display font-extrabold leading-none ${WORD_SIZE[size]}`}>
        <span className={wordColor}>Gilly</span>
        <span className={restColor}>brinquedos</span>
      </span>
    </span>
  );

  if (!href) return content;

  return (
    <Link href={href} aria-label="Ir para a página inicial da Gilly Brinquedos">
      {content}
    </Link>
  );
}

import Link from "next/link";
import { GillyLogo } from "@/components/brand/gilly-logo";
import { categories } from "@/lib/data/categories";
import {
  PinIcon,
  ClockIcon,
  WhatsAppIcon,
  WhatsAppBadgeIcon,
  InstagramIcon,
  PixIcon,
  CardIcon,
  ShieldIcon,
  TruckIcon,
  SparkleIcon,
} from "@/components/icons";

const SPARKLES = [
  { className: "left-[12%] top-[10%]", size: 13, delay: "0s" },
  { className: "right-[18%] top-[20%]", size: 10, delay: "1.4s" },
  { className: "left-[42%] bottom-[14%]", size: 11, delay: "2.4s" },
] as const;

const ACCOUNT_LINKS = [
  { href: "/conta/login", label: "Entrar" },
  { href: "/conta/cadastro", label: "Criar conta" },
  { href: "/conta/pedidos", label: "Meus pedidos" },
  { href: "/conta/enderecos", label: "Meus endereços" },
  { href: "/favoritos", label: "Favoritos" },
  { href: "/carrinho", label: "Carrinho" },
];

const HELP_LINKS = [
  { href: "/categorias", label: "Todas as categorias" },
  { href: "/busca?q=promo", label: "Ofertas da semana" },
  { href: "/busca?q=novidade", label: "Novidades" },
];

export function Footer() {
  return (
    <footer className="promo-surface relative mt-16 overflow-hidden text-white/80">
      {/* listras diagonais correndo devagar, no mesmo estilo do banner de ofertas */}
      <div className="stripes-diagonal pointer-events-none absolute inset-0 opacity-[0.06]" />
      {SPARKLES.map((sparkle, index) => (
        <span
          key={index}
          className={`animate-sparkle pointer-events-none absolute hidden text-white/70 sm:block ${sparkle.className}`}
          style={{ animationDelay: sparkle.delay }}
        >
          <SparkleIcon size={sparkle.size} />
        </span>
      ))}

      <div className="relative mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.3fr_0.9fr_0.9fr_1.1fr]">
        <div>
          <GillyLogo size="lg" tone="light" />
          <p className="mt-3 max-w-xs leading-relaxed text-white/60">
            Loja de bairro em Paulista, atendendo a Grande Recife e enviando pra todo o Brasil.
          </p>
          <div className="mt-4 flex gap-2.5">
            <a
              href="https://wa.me/558140028922"
              aria-label="Chamar a Nina Brinquedos no WhatsApp"
              className="squish"
            >
              <WhatsAppBadgeIcon size={40} />
            </a>
            <a
              href="https://www.instagram.com/ninabrinquedos/"
              aria-label="Ver o Instagram da Nina Brinquedos"
              className="squish flex h-10 w-10 items-center justify-center rounded-full text-white"
              style={{
                background:
                  "radial-gradient(circle at 30% 105%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)",
              }}
            >
              <InstagramIcon size={20} />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-extrabold uppercase tracking-[0.14em] text-white">
            Categorias
          </h3>
          <ul className="mt-3 space-y-2 text-sm">
            {categories.slice(0, 6).map((category) => (
              <li key={category.slug}>
                <Link href={`/categoria/${category.slug}`} className="link-draw hover:text-white">
                  {category.shortName}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-extrabold uppercase tracking-[0.14em] text-white">
            Sua conta
          </h3>
          <ul className="mt-3 space-y-2 text-sm">
            {ACCOUNT_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="link-draw hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <h3 className="mt-4 text-sm font-extrabold uppercase tracking-[0.14em] text-white">
            Ajuda
          </h3>
          <ul className="mt-3 space-y-2 text-sm">
            {HELP_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="link-draw hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-extrabold uppercase tracking-[0.14em] text-white">A loja</h3>
          <ul className="mt-3 space-y-2.5 text-sm">
            <li className="flex gap-2.5">
              <PinIcon size={18} className="mt-0.5 shrink-0 text-white/50" />
              <span>
                Avenida das Palmeiras, nº 480
                <br />
                Centro, Paulista, PE
              </span>
            </li>
            <li className="flex gap-2.5">
              <ClockIcon size={18} className="mt-0.5 shrink-0 text-white/50" />
              <span>Segunda a sábado, das 9h às 18h</span>
            </li>
            <li className="flex gap-2.5">
              <TruckIcon size={18} className="mt-0.5 shrink-0 text-white/50" />
              <span>Entrega para toda a Região Metropolitana do Recife</span>
            </li>
            <li className="flex gap-2.5">
              <WhatsAppIcon size={18} className="mt-0.5 shrink-0 text-white/50" />
              <a href="https://wa.me/558140028922" className="link-draw hover:text-white">
                (81) 4002-8922
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-4 sm:flex-row sm:px-6">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} Nina Brinquedos. Feito com carinho em Pernambuco.
          </p>
          <div className="flex items-center gap-4 text-xs font-semibold text-white/60">
            <span className="flex items-center gap-1.5">
              <PixIcon size={16} />
              Pix
            </span>
            <span className="flex items-center gap-1.5">
              <CardIcon size={16} />
              Cartão em 10x
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldIcon size={16} />
              Compra segura
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

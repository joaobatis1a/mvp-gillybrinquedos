import Link from "next/link";
import { GillyLogo } from "@/components/brand/gilly-logo";
import { GillyMascot } from "@/components/mascot/gilly-mascot";
import { categories } from "@/lib/data/categories";
import {
  PinIcon,
  ClockIcon,
  WhatsAppIcon,
  InstagramIcon,
  PixIcon,
  CardIcon,
  ShieldIcon,
  ArrowRightIcon,
  TruckIcon,
} from "@/components/icons";

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
    <footer className="relative mt-16 bg-ink text-white/80">
      {/* faixa de contato com a mascote — é o toque pessoal do rodapé */}
      <div className="relative border-b border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-5 px-4 py-8 sm:flex-row sm:justify-between sm:px-6">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <GillyMascot mood="wave" size={56} className="hidden shrink-0 sm:block" />
            <div>
              <p className="font-display text-xl font-extrabold text-white sm:text-2xl">
                Ficou com dúvida sobre algum brinquedo?
              </p>
              <p className="mt-1 text-sm text-white/60">
                Fala com a gente no WhatsApp, respondemos rapidinho e sem robô.
              </p>
            </div>
          </div>
          <a
            href="https://wa.me/558198930095"
            className="shine squish group inline-flex shrink-0 items-center gap-2 rounded-full bg-mint px-6 py-3.5 font-extrabold text-ink transition-colors hover:brightness-95"
          >
            <WhatsAppIcon size={19} />
            Chamar no WhatsApp
            <ArrowRightIcon
              size={17}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
        </div>
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.3fr_0.9fr_0.9fr_1.1fr]">
        <div>
          <GillyLogo size="lg" tone="light" />
          <p className="mt-4 max-w-xs leading-relaxed text-white/60">
            Loja de bairro em Paulista, atendendo a Grande Recife e enviando pra todo o Brasil.
          </p>
          <div className="mt-5 flex gap-2">
            <a
              href="https://wa.me/558198930095"
              aria-label="Chamar a Gilly Brinquedos no WhatsApp"
              className="squish flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-mint hover:text-mint"
            >
              <WhatsAppIcon size={20} />
            </a>
            <a
              href="https://www.instagram.com/gillybrinquedos/"
              aria-label="Ver o Instagram da Gilly Brinquedos"
              className="squish flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-candy hover:text-candy"
            >
              <InstagramIcon size={20} />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-extrabold uppercase tracking-[0.14em] text-white">
            Categorias
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
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
          <ul className="mt-4 space-y-2.5 text-sm">
            {ACCOUNT_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="link-draw hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <h3 className="mt-6 text-sm font-extrabold uppercase tracking-[0.14em] text-white">
            Ajuda
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
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
          <ul className="mt-4 space-y-3.5 text-sm">
            <li className="flex gap-2.5">
              <PinIcon size={18} className="mt-0.5 shrink-0 text-white/50" />
              <span>
                Rodovia PE-15, Km 16,5, nº 242
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
              <a href="https://wa.me/558198930095" className="link-draw hover:text-white">
                (81) 9893-0095
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row sm:px-6">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} Gilly Brinquedos. Feito com carinho em Pernambuco.
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

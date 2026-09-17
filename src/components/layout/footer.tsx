import Link from "next/link";
import { GillyLogo } from "@/components/brand/gilly-logo";
import { categories } from "@/lib/data/categories";
import {
  PinIcon,
  ClockIcon,
  WhatsAppIcon,
  InstagramIcon,
  PixIcon,
  CardIcon,
  ShieldIcon,
} from "@/components/icons";

const ACCOUNT_LINKS = [
  { href: "/conta/login", label: "Entrar" },
  { href: "/conta/cadastro", label: "Criar conta" },
  { href: "/conta/pedidos", label: "Meus pedidos" },
  { href: "/conta/enderecos", label: "Meus endereços" },
  { href: "/carrinho", label: "Carrinho" },
];

export function Footer() {
  return (
    <footer className="relative mt-10 border-t-2 border-border bg-white/80 backdrop-blur">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <GillyLogo size="lg" />
          <p className="mt-4 max-w-xs leading-relaxed text-ink-soft">
            Diversão sem limites, brinquedos sem igual. Loja de bairro em Paulista, PE, atendendo a
            Grande Recife e enviando pro Brasil todo.
          </p>
          <div className="mt-5 flex gap-2">
            <a
              href="https://wa.me/558198930095"
              aria-label="WhatsApp da Gilly Brinquedos"
              className="squish flex h-11 w-11 items-center justify-center rounded-2xl bg-mint-light text-mint transition-colors hover:bg-mint hover:text-white"
            >
              <WhatsAppIcon size={21} />
            </a>
            <a
              href="https://www.instagram.com/gillybrinquedos/"
              aria-label="Instagram da Gilly Brinquedos"
              className="squish flex h-11 w-11 items-center justify-center rounded-2xl bg-candy-light text-candy transition-colors hover:bg-candy hover:text-white"
            >
              <InstagramIcon size={21} />
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-display text-sm font-extrabold uppercase tracking-[0.14em] text-ink">
            Categorias
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm text-ink-soft">
            {categories.slice(0, 6).map((category) => (
              <li key={category.slug}>
                <Link href={`/categoria/${category.slug}`} className="link-draw hover:text-gilly">
                  {category.shortName}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-extrabold uppercase tracking-[0.14em] text-ink">
            Sua conta
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm text-ink-soft">
            {ACCOUNT_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="link-draw hover:text-gilly">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-extrabold uppercase tracking-[0.14em] text-ink">
            A loja
          </h3>
          <ul className="mt-4 space-y-3.5 text-sm text-ink-soft">
            <li className="flex gap-2.5">
              <PinIcon size={18} className="mt-0.5 shrink-0 text-gilly" />
              <span>
                Rodovia PE-15, Km 16,5, nº 242
                <br />
                Centro, Paulista — PE
              </span>
            </li>
            <li className="flex gap-2.5">
              <ClockIcon size={18} className="mt-0.5 shrink-0 text-gilly" />
              <span>Segunda a sábado, das 9h às 18h</span>
            </li>
            <li className="flex gap-2.5">
              <WhatsAppIcon size={18} className="mt-0.5 shrink-0 text-gilly" />
              <a href="https://wa.me/558198930095" className="link-draw hover:text-gilly">
                (81) 9893-0095
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row sm:px-6">
          <p className="text-xs text-ink-faint">
            © {new Date().getFullYear()} Gilly Brinquedos. Feito com carinho em Pernambuco.
          </p>
          <div className="flex items-center gap-4 text-xs font-semibold text-ink-soft">
            <span className="flex items-center gap-1.5">
              <PixIcon size={16} className="text-mint" />
              Pix
            </span>
            <span className="flex items-center gap-1.5">
              <CardIcon size={16} className="text-sky-deep" />
              Cartão em 10x
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldIcon size={16} className="text-gilly" />
              Compra segura
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";
import { GillyMascot } from "@/components/mascot/gilly-mascot";
import { categories } from "@/lib/data/categories";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-border bg-surface">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2">
            <GillyMascot mood="love" size={40} />
            <span className="font-display text-xl font-extrabold text-gilly">
              Gilly<span className="text-ink">brinquedos</span>
            </span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-ink-soft">
            Diversão sem limites, brinquedos sem igual! Loja física em Paulista, PE, e
            entrega para todo o Brasil.
          </p>
        </div>

        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-wide text-ink">
            Categorias
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-ink-soft">
            {categories.slice(0, 5).map((category) => (
              <li key={category.slug}>
                <Link href={`/categoria/${category.slug}`} className="hover:text-gilly">
                  {category.shortName}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-wide text-ink">
            Minha conta
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-ink-soft">
            <li><Link href="/conta/login" className="hover:text-gilly">Entrar</Link></li>
            <li><Link href="/conta/cadastro" className="hover:text-gilly">Criar conta</Link></li>
            <li><Link href="/conta/pedidos" className="hover:text-gilly">Meus pedidos</Link></li>
            <li><Link href="/carrinho" className="hover:text-gilly">Carrinho</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-wide text-ink">
            Fale com a gente
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-ink-soft">
            <li>Rodovia PE-15, Km 16,5, Nº 242</li>
            <li>Centro, Paulista - PE</li>
            <li>
              <a href="https://wa.me/558198930095" className="hover:text-gilly">
                WhatsApp (81) 9893-0095
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/gillybrinquedos/" className="hover:text-gilly">
                @gillybrinquedos
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-4 text-center text-xs text-ink-soft">
        © {new Date().getFullYear()} Gilly Brinquedos. Todos os direitos reservados.
      </div>
    </footer>
  );
}

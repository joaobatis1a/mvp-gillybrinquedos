import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCategoryBySlug, categories } from "@/lib/data/categories";
import { products } from "@/lib/data/products";
import { FilteredProducts } from "@/components/filters/filtered-products";
import { ToyArt } from "@/components/toys/toy-art";
import { Reveal } from "@/components/effects/reveal";
import { ChevronRightIcon } from "@/components/icons";
import type { CategoryAccent } from "@/lib/types";

type Props = { params: Promise<{ slug: string }> };

const HERO_TONE: Record<CategoryAccent, string> = {
  gilly: "from-gilly-light to-white",
  sky: "from-sky-light to-white",
  candy: "from-candy-light to-white",
  sun: "from-sun-light to-white",
  mint: "from-mint-light to-white",
  grape: "from-grape-light to-white",
};

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  return {
    title: category ? category.name : "Categoria",
    description: category?.description,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const items = products.filter((product) => product.categorySlug === category.slug);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <nav className="flex items-center gap-1 text-sm text-ink-soft">
        <Link href="/" className="link-draw hover:text-gilly">
          Início
        </Link>
        <ChevronRightIcon size={15} className="text-ink-faint" />
        <Link href="/categorias" className="link-draw hover:text-gilly">
          Categorias
        </Link>
        <ChevronRightIcon size={15} className="text-ink-faint" />
        <span className="font-semibold text-ink">{category.shortName}</span>
      </nav>

      <Reveal>
        <div
          className={`relative mt-4 overflow-hidden rounded-[2rem] border-2 border-border bg-gradient-to-br p-7 sm:p-9 ${HERO_TONE[category.accent]}`}
        >
          <div className="relative flex flex-wrap items-center gap-5">
            <span className="flex h-24 w-24 shrink-0 items-center justify-center rounded-[1.6rem] bg-white shadow-[var(--shadow-soft)]">
              <ToyArt art={category.art} size={62} className="animate-float" />
            </span>
            <div className="min-w-0">
              <h1 className="font-display text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
                {category.name}
              </h1>
              <p className="mt-2 max-w-xl text-ink-soft">{category.description}</p>
            </div>
          </div>
        </div>
      </Reveal>

      <div className="mt-8">
        {items.length > 0 ? (
          <FilteredProducts products={items} />
        ) : (
          <p className="rounded-[2rem] border-2 border-dashed border-border bg-white/60 py-16 text-center text-ink-soft">
            Ainda não temos nada cadastrado aqui. Volte em breve.
          </p>
        )}
      </div>
    </div>
  );
}

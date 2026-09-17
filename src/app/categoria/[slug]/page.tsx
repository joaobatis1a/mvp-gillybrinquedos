import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCategoryBySlug, categories } from "@/lib/data/categories";
import { products } from "@/lib/data/products";
import { FilteredProducts } from "@/components/filters/filtered-products";
import { CategoryThumb } from "@/components/category/category-thumb";
import { Reveal } from "@/components/effects/reveal";
import { ChevronRightIcon } from "@/components/icons";

type Props = { params: Promise<{ slug: string }> };

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
        <div className="relative mt-4 flex flex-wrap items-center gap-5 rounded-xl border border-border bg-white p-7 sm:p-9">
          <CategoryThumb category={category} size={88} />
          <div className="min-w-0">
            <h1 className="font-display text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
              {category.name}
            </h1>
            <p className="mt-2 max-w-xl text-ink-soft">{category.description}</p>
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

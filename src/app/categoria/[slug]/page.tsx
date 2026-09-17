import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCategoryBySlug, categories } from "@/lib/data/categories";
import { products } from "@/lib/data/products";
import { ProductGrid } from "@/components/product/product-grid";
import { GillyMascot } from "@/components/mascot/gilly-mascot";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  return { title: category ? `${category.name} - Gilly Brinquedos` : "Categoria" };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const items = products.filter((product) => product.categorySlug === category.slug);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <nav className="text-sm text-ink-soft">
        <Link href="/" className="hover:text-gilly">
          Início
        </Link>{" "}
        / <span className="text-ink">{category.name}</span>
      </nav>

      <div className="mt-4 flex items-center gap-3">
        <span className="flex h-14 w-14 items-center justify-center rounded-3xl bg-gilly-light text-3xl">
          {category.emoji}
        </span>
        <div>
          <h1 className="font-display text-3xl font-extrabold text-ink">{category.name}</h1>
          <p className="text-ink-soft">{category.description}</p>
        </div>
      </div>

      <div className="mt-8">
        {items.length > 0 ? (
          <ProductGrid products={items} />
        ) : (
          <div className="flex flex-col items-center gap-4 rounded-3xl border border-dashed border-border py-16 text-center">
            <GillyMascot mood="sleepy" size={120} />
            <p className="font-display text-lg font-bold text-ink">
              Ainda não temos produtos por aqui
            </p>
            <p className="max-w-sm text-ink-soft">
              A Gilly está providenciando novidades para esta categoria. Volte em breve!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

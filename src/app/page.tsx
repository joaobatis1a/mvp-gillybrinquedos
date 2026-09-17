import { Hero } from "@/components/home/hero";
import { CategoryGrid } from "@/components/home/category-grid";
import { BenefitsStrip } from "@/components/home/benefits-strip";
import { ProductSection } from "@/components/home/product-section";
import { products } from "@/lib/data/products";

export default function Home() {
  const bestSellers = products.filter((p) => p.tags?.includes("mais-vendido"));
  const news = products.filter((p) => p.tags?.includes("novidade"));
  const deals = products.filter((p) => p.originalPrice);

  return (
    <>
      <Hero />
      <CategoryGrid />
      <ProductSection
        title="Mais vendidos"
        subtitle="Os queridinhos da criançada"
        products={bestSellers}
        href="/busca?q=mais-vendido"
      />
      <BenefitsStrip />
      <ProductSection
        title="Novidades na loja"
        subtitle="Acabou de chegar"
        products={news}
        href="/busca?q=novidade"
      />
      <ProductSection
        title="Ofertas imperdíveis"
        subtitle="Aproveite antes que acabe"
        products={deals}
      />
    </>
  );
}

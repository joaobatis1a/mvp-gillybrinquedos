import { Hero } from "@/components/home/hero";
import { CategoryGrid } from "@/components/home/category-grid";
import { BenefitsStrip } from "@/components/home/benefits-strip";
import { ProductSection } from "@/components/home/product-section";
import { PromoBanner } from "@/components/home/promo-banner";
import { StoreCard } from "@/components/home/store-card";
import { products } from "@/lib/data/products";

export default function Home() {
  const bestSellers = products.filter((p) => p.tags?.includes("mais-vendido"));
  const news = products.filter((p) => p.tags?.includes("novidade"));
  const deals = products.filter((p) => p.originalPrice).slice(0, 8);
  const underHundred = products
    .filter((p) => p.price <= 100)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);

  return (
    <>
      <Hero />
      <BenefitsStrip />
      <CategoryGrid />

      <ProductSection
        eyebrow="Sai da prateleira toda semana"
        title="Os que a criançada mais leva"
        subtitle="Se você está na dúvida, começa por aqui. Esses aqui a gente repõe direto."
        products={bestSellers}
        href="/busca?q=mais-vendido"
      />

      <PromoBanner />

      <ProductSection
        eyebrow="Novidade"
        title="Chegou essa semana"
        subtitle="Acabou de sair da caixa e já foi pra vitrine."
        products={news}
        href="/busca?q=novidade"
        linkLabel="Ver novidades"
      />

      <ProductSection
        eyebrow="Presente sem estourar o orçamento"
        title="Tudo até R$ 100"
        subtitle="Pra aniversário de colega, amigo secreto ou aquele mimo de terça-feira."
        products={underHundred}
        href="/categorias"
        linkLabel="Explorar mais"
      />

      <ProductSection
        eyebrow="Oferta"
        title="Tá com desconto agora"
        products={deals}
        href="/busca?q=promo"
      />

      <StoreCard />
    </>
  );
}

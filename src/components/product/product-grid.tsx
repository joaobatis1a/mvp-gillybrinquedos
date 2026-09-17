import type { Product } from "@/lib/types";
import { ProductCard } from "@/components/product/product-card";
import { Reveal } from "@/components/effects/reveal";

export function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) return null;

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {products.map((product, index) => (
        <Reveal key={product.id} variant="zoom" delay={Math.min(index, 7) * 70}>
          <ProductCard product={product} />
        </Reveal>
      ))}
    </div>
  );
}

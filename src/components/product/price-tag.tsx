import { formatBRL } from "@/lib/format";

export function PriceTag({
  price,
  originalPrice,
  installmentsMax,
  size = "md",
}: {
  price: number;
  originalPrice?: number;
  installmentsMax?: number;
  size?: "sm" | "md" | "lg";
}) {
  const installmentValue = installmentsMax ? price / installmentsMax : null;
  const priceClass = size === "lg" ? "text-3xl" : size === "sm" ? "text-lg" : "text-2xl";

  return (
    <div>
      {originalPrice && originalPrice > price && (
        <p className="text-sm text-ink-soft line-through">{formatBRL(originalPrice)}</p>
      )}
      <p className={`font-display font-bold text-ink ${priceClass}`}>{formatBRL(price)}</p>
      {installmentValue && installmentsMax && installmentsMax > 1 && (
        <p className="text-xs text-ink-soft">
          ou {installmentsMax}x de {formatBRL(installmentValue)} sem juros
        </p>
      )}
    </div>
  );
}

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
  const priceClass =
    size === "lg" ? "text-[2.1rem]" : size === "sm" ? "text-lg" : "text-[1.4rem]";

  return (
    <div>
      {originalPrice && originalPrice > price && (
        <p className="text-xs font-semibold text-ink-faint line-through">
          {formatBRL(originalPrice)}
        </p>
      )}
      <p className={`font-display font-extrabold leading-none text-ink ${priceClass}`}>
        {formatBRL(price)}
      </p>
      {installmentValue && installmentsMax && installmentsMax > 1 && (
        <p className="mt-1 text-xs text-ink-soft">
          <span className="font-bold text-ink">
            {installmentsMax}x de {formatBRL(installmentValue)}
          </span>{" "}
          sem juros
        </p>
      )}
    </div>
  );
}

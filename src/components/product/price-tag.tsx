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

  const hasDiscount = Boolean(originalPrice && originalPrice > price);
  const hasInstallments = Boolean(installmentValue && installmentsMax && installmentsMax > 1);

  return (
    <div>
      <p className={`text-xs font-semibold text-ink-faint line-through ${hasDiscount ? "" : "invisible"}`}>
        {formatBRL(originalPrice ?? price)}
      </p>
      <p className={`font-display font-extrabold leading-none text-ink ${priceClass}`}>
        {formatBRL(price)}
      </p>
      <p className={`mt-1 text-xs text-ink-soft ${hasInstallments ? "" : "invisible"}`}>
        <span className="font-bold text-ink">
          {installmentsMax ?? 1}x de {formatBRL(installmentValue ?? price)}
        </span>{" "}
        sem juros
      </p>
    </div>
  );
}

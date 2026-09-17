import { StarIcon } from "@/components/icons";

export function Rating({
  value,
  count,
  size = 14,
}: {
  value: number;
  count?: number;
  size?: number;
}) {
  const rounded = Math.round(value);

  return (
    <div className="flex items-center gap-1.5 text-sm">
      <span aria-hidden className="flex items-center gap-0.5 text-sun">
        {Array.from({ length: 5 }).map((_, index) => (
          <StarIcon
            key={index}
            size={size}
            filled={index < rounded}
            className={index < rounded ? "" : "opacity-35"}
          />
        ))}
      </span>
      <span className="sr-only">{value.toFixed(1)} de 5 estrelas</span>
      <span className="text-xs font-bold text-ink-soft">{value.toFixed(1)}</span>
      {count !== undefined && <span className="text-xs text-ink-faint">({count})</span>}
    </div>
  );
}

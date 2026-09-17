export function Rating({ value, count }: { value: number; count?: number }) {
  const fullStars = Math.round(value);
  return (
    <div className="flex items-center gap-1.5 text-sm">
      <div aria-hidden className="flex text-sun">
        {Array.from({ length: 5 }).map((_, index) => (
          <span key={index}>{index < fullStars ? "★" : "☆"}</span>
        ))}
      </div>
      <span className="sr-only">{value} de 5 estrelas</span>
      {count !== undefined && <span className="text-ink-soft">({count})</span>}
    </div>
  );
}

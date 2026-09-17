const STEPS = [
  { id: "endereco", label: "Endereço" },
  { id: "frete", label: "Frete" },
  { id: "pagamento", label: "Pagamento" },
  { id: "confirmacao", label: "Confirmação" },
] as const;

export function CheckoutStepper({ current }: { current: (typeof STEPS)[number]["id"] }) {
  const currentIndex = STEPS.findIndex((step) => step.id === current);

  return (
    <ol className="flex items-center gap-2 sm:gap-4">
      {STEPS.map((step, index) => {
        const done = index < currentIndex;
        const active = index === currentIndex;
        return (
          <li key={step.id} className="flex flex-1 items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2">
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                  done
                    ? "bg-success text-white"
                    : active
                      ? "bg-gilly text-white"
                      : "bg-black/5 text-ink-soft"
                }`}
              >
                {done ? "✓" : index + 1}
              </span>
              <span
                className={`hidden text-sm font-bold sm:inline ${
                  active ? "text-ink" : "text-ink-soft"
                }`}
              >
                {step.label}
              </span>
            </div>
            {index < STEPS.length - 1 && (
              <div className={`h-0.5 flex-1 ${done ? "bg-success" : "bg-black/10"}`} />
            )}
          </li>
        );
      })}
    </ol>
  );
}

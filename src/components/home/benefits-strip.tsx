const BENEFITS = [
  { icon: "🏬", title: "Retire na loja", text: "Grátis em Paulista, PE" },
  { icon: "💳", title: "Parcele suas compras", text: "Em até 10x sem juros" },
  { icon: "⚡", title: "Pix na hora", text: "Aprovação instantânea" },
  { icon: "💬", title: "Fale com a gente", text: "Atendimento no WhatsApp" },
];

export function BenefitsStrip() {
  return (
    <section className="border-y border-border bg-surface">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-8 sm:px-6 md:grid-cols-4">
        {BENEFITS.map((benefit) => (
          <div key={benefit.title} className="flex items-center gap-3">
            <span className="text-3xl" aria-hidden>
              {benefit.icon}
            </span>
            <div>
              <p className="font-display text-sm font-bold text-ink">{benefit.title}</p>
              <p className="text-xs text-ink-soft">{benefit.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

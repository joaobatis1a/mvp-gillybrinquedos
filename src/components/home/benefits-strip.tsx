import { StoreIcon, PixIcon, WhatsAppBadgeIcon } from "@/components/icons";

const BENEFITS = [
  {
    Icon: StoreIcon,
    tone: "bg-gilly",
    title: "Retira na loja",
    text: "Comprou de manhã, pega à tarde. Sem frete.",
  },
  {
    title: "Parcela em 10x",
    text: "Sem juros no cartão, direto no checkout.",
    badge: "10x",
    tone: "bg-sky-deep",
  },
  {
    Icon: PixIcon,
    tone: "bg-mint",
    title: "Pix aprova na hora",
    text: "Pagou, já separamos o pedido.",
  },
  {
    title: "Dúvida de presente?",
    text: "Chama no WhatsApp que a gente ajuda a escolher.",
    whatsapp: true,
  },
] as const;

function BenefitCard({ benefit, index }: { benefit: (typeof BENEFITS)[number]; index: number }) {
  return (
    <div className="group flex h-full w-72 shrink-0 flex-col items-start gap-3 rounded-3xl border-2 border-border bg-white p-5 transition-all duration-300 hover:-translate-y-1.5 hover:border-gilly-light hover:shadow-[var(--shadow-lift)]">
      <span
        className="animate-float-sm inline-block shrink-0 transition-transform duration-300 group-hover:[animation:bobble_0.6s_ease-in-out]"
        style={{ animationDelay: `${index * 0.3}s` }}
      >
        {"whatsapp" in benefit ? (
          <WhatsAppBadgeIcon size={52} />
        ) : "badge" in benefit ? (
          <span
            className={`flex h-14 w-14 items-center justify-center rounded-2xl font-display text-base font-extrabold text-white ${benefit.tone}`}
          >
            {benefit.badge}
          </span>
        ) : (
          <span className={`flex h-14 w-14 items-center justify-center rounded-2xl text-white ${benefit.tone}`}>
            <benefit.Icon size={26} />
          </span>
        )}
      </span>
      <div>
        <p className="font-display text-base font-extrabold text-ink">{benefit.title}</p>
        <p className="mt-0.5 text-sm leading-snug text-ink-soft">{benefit.text}</p>
      </div>
    </div>
  );
}

export function BenefitsStrip() {
  return (
    <section
      className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden border-y-4 border-dashed border-white/70 py-8"
      style={{
        backgroundImage:
          "linear-gradient(90deg, var(--color-candy-light) 0%, var(--color-sky-light) 34%, var(--color-mint-light) 67%, var(--color-sun-light) 100%)",
      }}
    >
      <div className="flex w-max gap-4" style={{ animation: "marquee 26s linear infinite" }}>
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 gap-4 pl-4" aria-hidden={copy === 1}>
            {BENEFITS.map((benefit, index) => (
              <BenefitCard key={`${copy}-${benefit.title}`} benefit={benefit} index={index} />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

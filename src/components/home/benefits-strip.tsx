import { StoreIcon, PixIcon, WhatsAppBadgeIcon } from "@/components/icons";

const BENEFITS = [
  {
    Icon: StoreIcon,
    tone: "bg-gilly",
    pole: "from-gilly",
    title: "Retira na loja",
    text: "Comprou de manhã, pega à tarde. Sem frete.",
  },
  {
    title: "Parcela em 10x",
    text: "Sem juros no cartão, direto no checkout.",
    badge: "10x",
    tone: "bg-sky-deep",
    pole: "from-sky-deep",
  },
  {
    Icon: PixIcon,
    tone: "bg-mint",
    pole: "from-mint",
    title: "Pix aprova na hora",
    text: "Pagou, já separamos o pedido.",
  },
  {
    title: "Dúvida de presente?",
    text: "Chama no WhatsApp que a gente ajuda a escolher.",
    whatsapp: true,
    pole: "from-candy",
  },
] as const;

function Medallion({ benefit }: { benefit: (typeof BENEFITS)[number] }) {
  if ("whatsapp" in benefit) {
    return (
      <span className="flex h-14 w-14 items-center justify-center rounded-full border-[3px] border-white bg-white shadow-[0_8px_16px_-6px_rgba(105,62,20,0.35)]">
        <WhatsAppBadgeIcon size={36} />
      </span>
    );
  }
  if ("badge" in benefit) {
    return (
      <span
        className={`flex h-14 w-14 items-center justify-center rounded-full border-[3px] border-white font-display text-sm font-extrabold text-white shadow-[0_8px_16px_-6px_rgba(105,62,20,0.35)] ${benefit.tone}`}
      >
        {benefit.badge}
      </span>
    );
  }
  return (
    <span
      className={`flex h-14 w-14 items-center justify-center rounded-full border-[3px] border-white text-white shadow-[0_8px_16px_-6px_rgba(105,62,20,0.35)] ${benefit.tone}`}
    >
      <benefit.Icon size={24} />
    </span>
  );
}

function BenefitCard({ benefit, index }: { benefit: (typeof BENEFITS)[number]; index: number }) {
  return (
    <div
      className="animate-carousel-bob relative mr-5 flex h-full w-56 shrink-0 flex-col items-center gap-1 pt-7"
      style={{ animationDelay: `${index * 0.16}s` }}
    >
      {/* mastro do carrossel, ligando o medalhão à barra de cima */}
      <span
        aria-hidden
        className={`absolute -top-6 h-6 w-1 rounded-full bg-gradient-to-b ${benefit.pole} to-transparent opacity-70`}
      />
      <span className="relative z-10">
        <Medallion benefit={benefit} />
      </span>
      <div className="-mt-1 flex w-full flex-1 flex-col items-center rounded-[1.75rem] bg-white/95 px-4 pb-4 pt-6 text-center shadow-[var(--shadow-soft)]">
        <p className="font-display text-sm font-extrabold text-ink">{benefit.title}</p>
        <p className="mt-0.5 text-xs leading-snug text-ink-soft">{benefit.text}</p>
      </div>
    </div>
  );
}

export function BenefitsStrip() {
  return (
    <section
      className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden border-y-4 border-dashed border-white/70 pb-8 pt-12"
      style={{
        backgroundImage:
          "linear-gradient(90deg, var(--color-candy-light) 0%, var(--color-sky-light) 34%, var(--color-mint-light) 67%, var(--color-sun-light) 100%)",
      }}
    >
      <div className="flex w-max" style={{ animation: "marquee 26s linear infinite" }}>
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0" aria-hidden={copy === 1}>
            {BENEFITS.map((benefit, index) => (
              <BenefitCard key={`${copy}-${benefit.title}`} benefit={benefit} index={index} />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

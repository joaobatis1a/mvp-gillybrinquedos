import { StoreIcon, PixIcon, WhatsAppBadgeIcon } from "@/components/icons";
import { Reveal } from "@/components/effects/reveal";

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

export function BenefitsStrip() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {BENEFITS.map((benefit, index) => (
          <Reveal key={benefit.title} delay={index * 80}>
            <div className="group flex h-full flex-col items-start gap-3 rounded-3xl border-2 border-border bg-white p-5 transition-all duration-300 hover:-translate-y-1.5 hover:border-gilly-light hover:shadow-[var(--shadow-lift)]">
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
          </Reveal>
        ))}
      </div>
    </section>
  );
}

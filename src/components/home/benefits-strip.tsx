import { StoreIcon, PixBadgeIcon, WhatsAppBadgeIcon } from "@/components/icons";
import { Reveal } from "@/components/effects/reveal";

const BENEFITS = [
  {
    Icon: StoreIcon,
    iconTone: "text-gilly-dark",
    title: "Retira na loja",
    text: "Comprou de manhã, pega à tarde. Sem frete.",
  },
  {
    title: "Parcela em 10x",
    text: "Sem juros no cartão, direto no checkout.",
    badge: "10x",
    badgeTone: "bg-sky-deep",
  },
  {
    Icon: PixBadgeIcon,
    title: "Pix aprova na hora",
    text: "Pagou, já separamos o pedido.",
  },
  {
    Icon: WhatsAppBadgeIcon,
    title: "Dúvida de presente?",
    text: "Chama no WhatsApp que a gente ajuda a escolher.",
  },
] as const;

export function BenefitsStrip() {
  return (
    <section className="border-y-2 border-border bg-white/70 backdrop-blur">
      <div className="mx-auto grid max-w-7xl divide-y divide-border sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
        {BENEFITS.map((benefit, index) => (
          <Reveal key={benefit.title} delay={index * 80}>
            <div className="flex items-start gap-3 px-6 py-7">
              {"badge" in benefit ? (
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg font-display text-sm font-extrabold text-white ${benefit.badgeTone}`}
                >
                  {benefit.badge}
                </span>
              ) : (
                <benefit.Icon size={26} className={"iconTone" in benefit ? benefit.iconTone : ""} />
              )}
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

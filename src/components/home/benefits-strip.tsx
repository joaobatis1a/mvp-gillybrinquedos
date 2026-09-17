import { StoreIcon, CardIcon, PixIcon, WhatsAppIcon } from "@/components/icons";
import { Reveal } from "@/components/effects/reveal";

const BENEFITS = [
  {
    Icon: StoreIcon,
    title: "Retira na loja",
    text: "Comprou de manhã, pega à tarde. Sem frete.",
    tone: "bg-gilly-light text-gilly-dark",
  },
  {
    Icon: CardIcon,
    title: "Parcela em 10x",
    text: "Sem juros no cartão, direto no checkout.",
    tone: "bg-sky-light text-sky-deep",
  },
  {
    Icon: PixIcon,
    title: "Pix aprova na hora",
    text: "Pagou, já separamos o pedido.",
    tone: "bg-mint-light text-mint",
  },
  {
    Icon: WhatsAppIcon,
    title: "Dúvida de presente?",
    text: "Chama no WhatsApp que a gente ajuda a escolher.",
    tone: "bg-sun-light text-[#8a6110]",
  },
];

export function BenefitsStrip() {
  return (
    <section className="border-y-2 border-border bg-white/70 backdrop-blur">
      <div className="mx-auto grid max-w-7xl gap-4 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        {BENEFITS.map(({ Icon, title, text, tone }, index) => (
          <Reveal key={title} delay={index * 80}>
            <div className="group flex items-start gap-3.5">
              <span
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition-transform duration-400 group-hover:-rotate-6 group-hover:scale-110 ${tone}`}
              >
                <Icon size={23} />
              </span>
              <div>
                <p className="font-display text-base font-extrabold text-ink">{title}</p>
                <p className="mt-0.5 text-sm leading-snug text-ink-soft">{text}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

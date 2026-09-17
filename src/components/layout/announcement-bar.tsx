import { StoreIcon, TruckIcon, CardIcon, WhatsAppIcon, PixIcon } from "@/components/icons";

const ITEMS = [
  { Icon: StoreIcon, text: "Retire na loja em Paulista no mesmo dia" },
  { Icon: TruckIcon, text: "Entregamos na Região Metropolitana do Recife" },
  { Icon: CardIcon, text: "Parcelamos em até 10x sem juros" },
  { Icon: PixIcon, text: "No Pix a aprovação sai na hora" },
  { Icon: WhatsAppIcon, text: "Dúvida? Chama no WhatsApp (81) 9893-0095" },
];

export function AnnouncementBar() {
  return (
    <div className="overflow-hidden bg-gilly text-white">
      <div className="marquee-track py-2">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1}>
            {ITEMS.map(({ Icon, text }) => (
              <span
                key={text}
                className="flex items-center gap-2 whitespace-nowrap px-6 text-xs font-semibold tracking-wide"
              >
                <Icon size={15} className="opacity-90" />
                {text}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

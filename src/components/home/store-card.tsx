import { GillyMascot } from "@/components/mascot/gilly-mascot";
import { Reveal } from "@/components/effects/reveal";
import { PinIcon, ClockIcon, WhatsAppBadgeIcon, InstagramIcon, ArrowRightIcon } from "@/components/icons";

const MAPS_QUERY = encodeURIComponent(
  "Rodovia PE-15, Km 16,5, Nº 242, Centro, Paulista, PE",
);

export function StoreCard() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <Reveal variant="zoom">
        <div className="overflow-hidden rounded-[2.5rem] border-2 border-border bg-cream-deep shadow-[var(--shadow-soft)]">
          <div className="grid items-stretch lg:grid-cols-[1.15fr_1fr]">
            <div className="relative p-8 sm:p-12">
              <div
                aria-hidden
                className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-gilly-light/50 blur-2xl"
              />

              <p className="relative inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.2em] text-gilly">
                <span className="h-1.5 w-1.5 rounded-full bg-gilly" />
                Passa lá na loja
              </p>
              <h2 className="relative mt-2 font-display text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
                A gente existe de verdade, com prateleira, balcão e tudo
              </h2>
              <p className="relative mt-4 max-w-xl leading-relaxed text-ink-soft">
                Se você mora perto, vale a visita: dá pra pegar na mão, ver o tamanho real e a gente
                ainda embrulha pra presente. Se não der, a gente manda pra sua casa.
              </p>

              {/* ticket da loja: endereço e horário como um bilhete, com perfuração no meio */}
              <div className="relative mt-7 flex overflow-hidden rounded-2xl border border-border/70 bg-white shadow-[var(--shadow-soft)]">
                <div className="flex flex-1 items-start gap-2.5 p-4">
                  <PinIcon size={18} className="mt-0.5 shrink-0 text-gilly" />
                  <div>
                    <p className="font-display text-xs font-extrabold uppercase tracking-wide text-ink-faint">
                      Onde fica
                    </p>
                    <p className="text-sm font-semibold text-ink">
                      Rodovia PE-15, Km 16,5, nº 242
                      <br />
                      Centro, Paulista, PE
                    </p>
                  </div>
                </div>

                <div className="relative w-px shrink-0 bg-[repeating-linear-gradient(to_bottom,var(--color-border)_0,var(--color-border)_6px,transparent_6px,transparent_12px)]">
                  <span className="absolute -top-2.5 left-1/2 h-5 w-5 -translate-x-1/2 rounded-full bg-cream-deep" />
                  <span className="absolute -bottom-2.5 left-1/2 h-5 w-5 -translate-x-1/2 rounded-full bg-cream-deep" />
                </div>

                <div className="flex flex-1 items-start gap-2.5 p-4">
                  <ClockIcon size={18} className="mt-0.5 shrink-0 text-gilly" />
                  <div>
                    <p className="font-display text-xs font-extrabold uppercase tracking-wide text-ink-faint">
                      Horário
                    </p>
                    <p className="text-sm font-semibold text-ink">
                      Seg a sáb, 9h às 18h
                      <br />
                      Domingo a loja descansa
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative mt-8 flex flex-wrap gap-3">
                <a
                  href="https://wa.me/558198930095"
                  className="shine squish group inline-flex items-center gap-3 rounded-full bg-mint py-2.5 pl-2.5 pr-6 font-extrabold text-white shadow-[0_14px_26px_-12px_rgba(63,196,160,0.85)] transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_30px_-12px_rgba(63,196,160,0.95)]"
                >
                  <WhatsAppBadgeIcon size={30} className="shrink-0" />
                  Chamar no WhatsApp
                  <ArrowRightIcon
                    size={17}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </a>
                <a
                  href="https://www.instagram.com/gillybrinquedos/"
                  className="squish inline-flex items-center gap-2.5 rounded-full py-2.5 pl-2.5 pr-6 font-extrabold text-white shadow-[0_14px_26px_-12px_rgba(214,36,159,0.55)] transition-all hover:-translate-y-0.5"
                  style={{
                    background:
                      "radial-gradient(circle at 30% 105%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)",
                  }}
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/25">
                    <InstagramIcon size={17} />
                  </span>
                  @gillybrinquedos
                </a>
              </div>
            </div>

            <div className="relative min-h-[280px] border-t-2 border-border lg:min-h-full lg:border-l-2 lg:border-t-0">
              <iframe
                title="Localização da Gilly Brinquedos no mapa"
                src={`https://www.google.com/maps?q=${MAPS_QUERY}&output=embed`}
                loading="lazy"
                className="absolute inset-0 h-full w-full grayscale-[15%]"
                style={{ border: 0 }}
              />
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${MAPS_QUERY}`}
                target="_blank"
                rel="noreferrer"
                className="squish absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3 rounded-2xl bg-white/95 px-4 py-3 shadow-[var(--shadow-soft)] backdrop-blur-sm sm:right-auto"
              >
                <span className="flex items-center gap-2 text-sm font-extrabold text-ink">
                  <GillyMascot mood="love" size={32} />
                  Ver rota no mapa
                </span>
                <ArrowRightIcon size={16} className="text-gilly" />
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

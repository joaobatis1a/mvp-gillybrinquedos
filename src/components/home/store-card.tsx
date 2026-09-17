import { GillyMascot } from "@/components/mascot/gilly-mascot";
import { Reveal } from "@/components/effects/reveal";
import { PinIcon, ClockIcon, WhatsAppIcon, InstagramIcon, ArrowRightIcon } from "@/components/icons";

export function StoreCard() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <Reveal variant="zoom">
        <div className="relative overflow-hidden rounded-[2.5rem] border-2 border-border bg-gradient-to-br from-white via-cream to-gilly-tint p-8 shadow-[var(--shadow-soft)] sm:p-12">
          {/* decoração */}
          <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-gilly/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-sky/10 blur-3xl" />

          <div className="relative grid items-center gap-10 lg:grid-cols-[1.3fr_1fr]">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-gilly">
                Passa lá na loja
              </p>
              <h2 className="mt-2 font-display text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
                A gente existe de verdade, com prateleira, balcão e tudo
              </h2>
              <p className="mt-4 max-w-xl leading-relaxed text-ink-soft">
                Se você mora perto, vale a visita — dá pra pegar na mão, ver o tamanho real e a gente
                ainda embrulha pra presente. Se não der, mandamos pra sua casa.
              </p>

              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                <div className="flex items-start gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gilly-light text-gilly-dark">
                    <PinIcon size={21} />
                  </span>
                  <div>
                    <p className="font-display text-sm font-extrabold text-ink">Onde fica</p>
                    <p className="text-sm text-ink-soft">
                      Rodovia PE-15, Km 16,5, nº 242
                      <br />
                      Centro, Paulista — PE
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-sky-light text-sky-deep">
                    <ClockIcon size={21} />
                  </span>
                  <div>
                    <p className="font-display text-sm font-extrabold text-ink">Horário</p>
                    <p className="text-sm text-ink-soft">
                      Seg a sáb, 9h às 18h
                      <br />
                      Domingo a loja descansa
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="https://wa.me/558198930095"
                  className="shine squish group inline-flex items-center gap-2 rounded-full bg-mint px-6 py-3.5 font-extrabold text-white transition-colors hover:brightness-95"
                >
                  <WhatsAppIcon size={19} />
                  Chamar no WhatsApp
                  <ArrowRightIcon
                    size={17}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </a>
                <a
                  href="https://www.instagram.com/gillybrinquedos/"
                  className="squish inline-flex items-center gap-2 rounded-full border-2 border-border bg-white px-6 py-3.5 font-extrabold text-ink transition-colors hover:border-candy hover:text-candy"
                >
                  <InstagramIcon size={19} />
                  @gillybrinquedos
                </a>
              </div>
            </div>

            <div className="relative flex justify-center">
              <div className="absolute inset-8 animate-spin-slow rounded-[45%_55%_52%_48%/48%_45%_55%_52%] border-[3px] border-dashed border-gilly/25" />
              <GillyMascot mood="love" size={260} className="relative" />
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

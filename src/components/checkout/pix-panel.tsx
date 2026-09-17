"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { formatBRL } from "@/lib/format";

const PIX_CODE =
  "00020126580014BR.GOV.BCB.PIX0136gilly-brinquedos-mvp-000102030405";

function QrPattern() {
  const cells = useMemo(
    () => Array.from({ length: 121 }, (_, i) => (i * 37) % 5 === 0 || (i * 13) % 7 === 0),
    []
  );
  return (
    <div className="grid grid-cols-11 gap-0.5 rounded-xl bg-white p-3">
      {cells.map((filled, index) => (
        <span
          key={index}
          className={`aspect-square rounded-[2px] ${filled ? "bg-ink" : "bg-transparent"}`}
        />
      ))}
    </div>
  );
}

export function PixPanel({ amount, onConfirm }: { amount: number; onConfirm: () => void }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(PIX_CODE);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <div className="w-48">
        <QrPattern />
      </div>
      <p className="text-sm text-ink-soft">
        Escaneie o QR Code no app do seu banco ou copie o código abaixo.
      </p>
      <div className="flex w-full max-w-sm items-center gap-2">
        <input
          readOnly
          value={PIX_CODE}
          className="min-w-0 flex-1 truncate rounded-full border-2 border-border bg-cream px-4 py-2 text-xs text-ink-soft"
        />
        <button
          onClick={handleCopy}
          className="shrink-0 rounded-full bg-ink px-4 py-2 text-xs font-bold text-white hover:bg-ink/85 cursor-pointer"
        >
          {copied ? "Copiado!" : "Copiar"}
        </button>
      </div>
      <p className="font-display text-2xl font-bold text-ink">{formatBRL(amount)}</p>
      <Button size="lg" className="w-full max-w-sm" onClick={onConfirm}>
        Confirmar pagamento Pix
      </Button>
      <p className="max-w-sm text-xs text-ink-soft">
        Ambiente de demonstração: nenhuma cobrança real é gerada. Em produção, a
        confirmação chega automaticamente via Mercado Pago.
      </p>
    </div>
  );
}

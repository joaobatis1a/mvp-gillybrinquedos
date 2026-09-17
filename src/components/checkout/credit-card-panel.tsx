"use client";

import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { formatCardExpiry, formatCardNumber, formatBRL } from "@/lib/format";

const MAX_INSTALLMENTS = 10;
const INTEREST_FREE_UP_TO = 6;
const MONTHLY_INTEREST = 0.0199;

const cardSchema = z.object({
  holderName: z.string().min(3, "Informe o nome como está no cartão"),
  number: z
    .string()
    .min(19, "Número do cartão incompleto")
    .max(19, "Número do cartão inválido"),
  expiry: z.string().length(5, "Use o formato MM/AA"),
  cvv: z.string().min(3, "CVV inválido").max(4, "CVV inválido"),
});

type CardFormValues = z.infer<typeof cardSchema>;

function installmentValue(amount: number, installments: number) {
  if (installments <= INTEREST_FREE_UP_TO) return amount / installments;
  const factor = Math.pow(1 + MONTHLY_INTEREST, installments);
  const withInterest = (amount * MONTHLY_INTEREST * factor) / (factor - 1);
  return withInterest;
}

export function CreditCardPanel({
  amount,
  installments,
  onInstallmentsChange,
  onConfirm,
}: {
  amount: number;
  installments: number;
  onInstallmentsChange: (value: number) => void;
  onConfirm: () => void;
}) {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<CardFormValues>({
    resolver: zodResolver(cardSchema),
    defaultValues: { holderName: "", number: "", expiry: "", cvv: "" },
  });

  const numberValue = useWatch({ control, name: "number" });
  const expiryValue = useWatch({ control, name: "expiry" });

  return (
    <form onSubmit={handleSubmit(onConfirm)} className="flex flex-col gap-4">
      <Field label="Nome impresso no cartão" error={errors.holderName?.message}>
        <input {...register("holderName")} placeholder="Como está no cartão" className={inputClass} />
      </Field>

      <Field label="Número do cartão" error={errors.number?.message}>
        <input
          {...register("number")}
          value={numberValue}
          onChange={(event) =>
            setValue("number", formatCardNumber(event.target.value), { shouldValidate: true })
          }
          placeholder="0000 0000 0000 0000"
          inputMode="numeric"
          className={inputClass}
        />
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Validade" error={errors.expiry?.message}>
          <input
            {...register("expiry")}
            value={expiryValue}
            onChange={(event) =>
              setValue("expiry", formatCardExpiry(event.target.value), { shouldValidate: true })
            }
            placeholder="MM/AA"
            inputMode="numeric"
            className={inputClass}
          />
        </Field>
        <Field label="CVV" error={errors.cvv?.message}>
          <input
            {...register("cvv")}
            placeholder="123"
            inputMode="numeric"
            maxLength={4}
            className={inputClass}
          />
        </Field>
      </div>

      <div>
        <label className="mb-1 block text-sm font-semibold text-ink">Parcelamento</label>
        <select
          value={installments}
          onChange={(event) => onInstallmentsChange(Number(event.target.value))}
          className={inputClass}
        >
          {Array.from({ length: MAX_INSTALLMENTS }, (_, i) => i + 1).map((n) => {
            const value = installmentValue(amount, n);
            return (
              <option key={n} value={n}>
                {n}x de {formatBRL(value)} {n > INTEREST_FREE_UP_TO ? "(com juros)" : "sem juros"}
              </option>
            );
          })}
        </select>
      </div>

      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
        Finalizar compra
      </Button>
      <p className="text-center text-xs text-ink-soft">
        Ambiente de demonstração: nenhuma cobrança real é feita no cartão.
      </p>
    </form>
  );
}

const inputClass =
  "w-full rounded-xl border-2 border-border bg-cream px-4 py-2.5 text-sm text-ink placeholder:text-ink-soft focus:border-gilly focus:outline-none";

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1 block text-sm font-semibold text-ink">{label}</label>
      {children}
      {error && <p className="mt-1 text-xs font-semibold text-danger">{error}</p>}
    </div>
  );
}

export { installmentValue };

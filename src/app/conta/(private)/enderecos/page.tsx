"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { formatCep } from "@/lib/format";
import { GillyMascot } from "@/components/mascot/gilly-mascot";

const schema = z.object({
  label: z.string().min(1, "Dê um nome para este endereço"),
  recipient: z.string().min(3, "Informe o nome do destinatário"),
  cep: z.string().min(9, "CEP inválido"),
  street: z.string().min(3, "Informe a rua"),
  number: z.string().min(1, "Informe o número"),
  complement: z.string().optional(),
  neighborhood: z.string().min(2, "Informe o bairro"),
  city: z.string().min(2, "Informe a cidade"),
  state: z.string().length(2, "Use a sigla do estado").transform((v) => v.toUpperCase()),
});
type FormValues = z.infer<typeof schema>;

export default function EnderecosPage() {
  const { addresses, addAddress, removeAddress } = useAuth();
  const [showForm, setShowForm] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: { label: "Casa" } });

  const cepValue = useWatch({ control, name: "cep" }) ?? "";

  function onSubmit(data: FormValues) {
    addAddress(data);
    reset({ label: "Casa", cep: "", state: "" });
    setShowForm(false);
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-ink">Meus endereços</h1>
          <p className="mt-1 text-ink-soft">Gerencie os endereços de entrega da sua conta.</p>
        </div>
        <Button variant="outline" onClick={() => setShowForm((v) => !v)}>
          {showForm ? "Cancelar" : "Adicionar endereço"}
        </Button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 grid gap-4 rounded-2xl border border-border p-5 sm:grid-cols-2">
          <Field label="Nome do endereço" error={errors.label?.message} className="sm:col-span-2">
            <input {...register("label")} className={inputClass} />
          </Field>
          <Field label="Destinatário" error={errors.recipient?.message} className="sm:col-span-2">
            <input {...register("recipient")} className={inputClass} />
          </Field>
          <Field label="CEP" error={errors.cep?.message}>
            <input
              {...register("cep")}
              value={cepValue}
              onChange={(event) =>
                setValue("cep", formatCep(event.target.value), { shouldValidate: true })
              }
              className={inputClass}
              inputMode="numeric"
            />
          </Field>
          <Field label="Estado (UF)" error={errors.state?.message}>
            <input {...register("state")} maxLength={2} className={inputClass} />
          </Field>
          <Field label="Rua" error={errors.street?.message} className="sm:col-span-2">
            <input {...register("street")} className={inputClass} />
          </Field>
          <Field label="Número" error={errors.number?.message}>
            <input {...register("number")} className={inputClass} />
          </Field>
          <Field label="Complemento (opcional)">
            <input {...register("complement")} className={inputClass} />
          </Field>
          <Field label="Bairro" error={errors.neighborhood?.message}>
            <input {...register("neighborhood")} className={inputClass} />
          </Field>
          <Field label="Cidade" error={errors.city?.message}>
            <input {...register("city")} className={inputClass} />
          </Field>
          <div className="sm:col-span-2">
            <Button type="submit" disabled={isSubmitting}>
              Salvar endereço
            </Button>
          </div>
        </form>
      )}

      <div className="mt-6 space-y-3">
        {addresses.length === 0 && !showForm && (
          <div className="flex flex-col items-center gap-3 rounded-3xl border border-dashed border-border py-12 text-center">
            <GillyMascot mood="sleepy" size={100} />
            <p className="text-ink-soft">Você ainda não tem endereços salvos.</p>
          </div>
        )}
        {addresses.map((address) => (
          <div key={address.id} className="flex items-start justify-between gap-3 rounded-2xl border border-border p-4">
            <div className="text-sm">
              <p className="font-bold text-ink">
                {address.label} · {address.recipient}
              </p>
              <p className="text-ink-soft">
                {address.street}, {address.number}
                {address.complement ? ` - ${address.complement}` : ""} · {address.neighborhood}
              </p>
              <p className="text-ink-soft">
                {address.city}/{address.state} · CEP {address.cep}
              </p>
            </div>
            <button
              onClick={() => removeAddress(address.id)}
              className="shrink-0 text-sm font-semibold text-danger hover:underline cursor-pointer"
            >
              Remover
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border-2 border-border bg-cream px-4 py-2.5 text-sm text-ink placeholder:text-ink-soft focus:border-gilly focus:outline-none";

function Field({
  label,
  error,
  children,
  className,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="mb-1 block text-sm font-semibold text-ink">{label}</label>
      {children}
      {error && <p className="mt-1 text-xs font-semibold text-danger">{error}</p>}
    </div>
  );
}

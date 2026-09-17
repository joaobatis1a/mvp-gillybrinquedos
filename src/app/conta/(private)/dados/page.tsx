"use client";

import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { formatPhone } from "@/lib/format";

const schema = z.object({
  name: z.string().min(3, "Informe seu nome completo"),
  phone: z.string().min(14, "Telefone incompleto"),
});
type FormValues = z.infer<typeof schema>;

export default function DadosPage() {
  const { user, updateProfile } = useAuth();
  const [saved, setSaved] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  useEffect(() => {
    if (user) reset({ name: user.name, phone: user.phone });
  }, [user, reset]);

  const phoneValue = useWatch({ control, name: "phone" }) ?? "";

  function onSubmit(data: FormValues) {
    updateProfile(data);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  if (!user) return null;

  return (
    <div>
      <h1 className="font-display text-2xl font-extrabold text-ink">Meus dados</h1>
      <p className="mt-1 text-ink-soft">Mantenha suas informações sempre atualizadas.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 max-w-md space-y-4">
        <div>
          <label className="mb-1 block text-sm font-semibold text-ink">Nome completo</label>
          <input {...register("name")} className={inputClass} />
          {errors.name && <p className="mt-1 text-xs font-semibold text-danger">{errors.name.message}</p>}
        </div>

        <div>
          <label className="mb-1 block text-sm font-semibold text-ink">E-mail</label>
          <input value={user.email} disabled className={`${inputClass} cursor-not-allowed opacity-60`} />
        </div>

        <div>
          <label className="mb-1 block text-sm font-semibold text-ink">Telefone</label>
          <input
            {...register("phone")}
            value={phoneValue}
            onChange={(event) =>
              setValue("phone", formatPhone(event.target.value), { shouldValidate: true })
            }
            className={inputClass}
            inputMode="numeric"
          />
          {errors.phone && <p className="mt-1 text-xs font-semibold text-danger">{errors.phone.message}</p>}
        </div>

        {saved && <p className="text-sm font-semibold text-success">Dados atualizados!</p>}

        <Button type="submit" disabled={isSubmitting}>
          Salvar alterações
        </Button>
      </form>
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border-2 border-border bg-cream px-4 py-2.5 text-sm text-ink placeholder:text-ink-soft focus:border-gilly focus:outline-none";

import Link from "next/link";
import { GillyMascot } from "@/components/mascot/gilly-mascot";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 shrink-0">
      <GillyMascot mood="happy" size={44} />
      <span className="font-display text-2xl font-extrabold text-gilly">
        Gilly<span className="text-ink">brinquedos</span>
      </span>
    </Link>
  );
}

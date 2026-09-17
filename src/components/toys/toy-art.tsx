import type { JSX } from "react";

export type ToyArtKey =
  | "brick"
  | "doll"
  | "racecar"
  | "plush"
  | "blaster"
  | "dough"
  | "figure"
  | "dino"
  | "kitchen"
  | "babydoll"
  | "boardgame"
  | "rc"
  | "capsule"
  | "rattle"
  | "guitar"
  | "rideon"
  | "puzzle"
  | "ball"
  | "unicorn"
  | "robot";

const INK = "#2B2018";

/** Chunky hand-drawn toy illustrations — one per product family. */
const ART: Record<ToyArtKey, JSX.Element> = {
  brick: (
    <g>
      <rect x="20" y="70" width="80" height="26" rx="5" fill="#E8453C" />
      <rect x="20" y="70" width="80" height="8" rx="4" fill="#FF6B61" />
      <g fill="#E8453C">
        <rect x="27" y="62" width="14" height="10" rx="4" />
        <rect x="49" y="62" width="14" height="10" rx="4" />
        <rect x="71" y="62" width="14" height="10" rx="4" />
      </g>
      <rect x="32" y="38" width="56" height="25" rx="5" fill="#FFC53D" />
      <rect x="32" y="38" width="56" height="8" rx="4" fill="#FFD772" />
      <g fill="#FFC53D">
        <rect x="39" y="30" width="14" height="10" rx="4" />
        <rect x="61" y="30" width="14" height="10" rx="4" />
      </g>
      <rect x="44" y="12" width="32" height="20" rx="5" fill="#3FB0E5" />
      <rect x="44" y="12" width="32" height="7" rx="3.5" fill="#6FC8F0" />
      <rect x="53" y="5" width="14" height="9" rx="4" fill="#3FB0E5" />
    </g>
  ),
  doll: (
    <g>
      <path d="M60 20c-14 0-21 10-21 22 0 10 4 14 4 14h34s4-4 4-14c0-12-7-22-21-22z" fill="#F7B267" />
      <circle cx="60" cy="38" r="15" fill="#FFDDC1" />
      <path d="M45 36c0-11 7-18 15-18s15 7 15 18c0-6-6-9-15-9s-15 3-15 9z" fill="#8A4B2A" />
      <circle cx="54" cy="38" r="2.2" fill={INK} />
      <circle cx="66" cy="38" r="2.2" fill={INK} />
      <path d="M56 45q4 3.5 8 0" stroke={INK} strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M60 53l22 16-8 33H46l-8-33z" fill="#FF5C93" />
      <path d="M46 102h28l3 12H43z" fill="#FF83AE" />
      <rect x="50" y="110" width="7" height="8" rx="3" fill="#FFDDC1" />
      <rect x="63" y="110" width="7" height="8" rx="3" fill="#FFDDC1" />
      <circle cx="60" cy="72" r="4" fill="#FFC53D" />
    </g>
  ),
  racecar: (
    <g>
      <path d="M14 76c0-8 8-11 16-12l12-16c2-3 5-4 8-4h20c4 0 7 2 9 5l9 15c8 1 18 4 18 12v8H14z" fill="#E8453C" />
      <path d="M46 52h16l7 12H41z" fill="#BFE7FA" />
      <path d="M14 76h92v5a4 4 0 0 1-4 4H18a4 4 0 0 1-4-4z" fill="#B8261F" />
      <rect x="86" y="43" width="24" height="7" rx="3.5" fill="#2B2018" />
      <circle cx="35" cy="86" r="13" fill="#2B2018" />
      <circle cx="35" cy="86" r="5.5" fill="#D9D9D9" />
      <circle cx="87" cy="86" r="13" fill="#2B2018" />
      <circle cx="87" cy="86" r="5.5" fill="#D9D9D9" />
      <path d="M22 66h12v6H22z" fill="#FFC53D" />
    </g>
  ),
  plush: (
    <g>
      <circle cx="33" cy="36" r="13" fill="#B0764A" />
      <circle cx="33" cy="36" r="6.5" fill="#D9A273" />
      <circle cx="87" cy="36" r="13" fill="#B0764A" />
      <circle cx="87" cy="36" r="6.5" fill="#D9A273" />
      <ellipse cx="60" cy="74" rx="34" ry="32" fill="#C98B57" />
      <ellipse cx="60" cy="82" rx="21" ry="18" fill="#EBC79C" />
      <circle cx="60" cy="42" r="30" fill="#C98B57" />
      <ellipse cx="60" cy="52" rx="15" ry="12" fill="#EBC79C" />
      <ellipse cx="60" cy="46" rx="5.5" ry="4.2" fill={INK} />
      <path d="M60 50v5m0 0q-4 4-8 1m8-1q4 4 8 1" stroke={INK} strokeWidth="2.4" fill="none" strokeLinecap="round" />
      <circle cx="48" cy="36" r="3.4" fill={INK} />
      <circle cx="72" cy="36" r="3.4" fill={INK} />
      <circle cx="49.4" cy="34.6" r="1.2" fill="#fff" />
      <circle cx="73.4" cy="34.6" r="1.2" fill="#fff" />
      <path d="M40 96c6 5 34 5 40 0" stroke="#A8703F" strokeWidth="2.4" fill="none" strokeLinecap="round" />
    </g>
  ),
  blaster: (
    <g>
      <path d="M18 46h56l8 10h16a6 6 0 0 1 6 6v6a6 6 0 0 1-6 6H80l-6 6H46v14a6 6 0 0 1-6 6h-8a6 6 0 0 1-6-6V80H18a6 6 0 0 1-6-6V52a6 6 0 0 1 6-6z" fill="#FFC53D" />
      <path d="M82 56h16a6 6 0 0 1 6 6v6a6 6 0 0 1-6 6H82z" fill="#F2600A" />
      <rect x="22" y="54" width="34" height="14" rx="4" fill="#3FB0E5" />
      <circle cx="66" cy="62" r="6" fill="#2B2018" opacity="0.15" />
      <rect x="30" y="86" width="16" height="6" rx="3" fill="#2B2018" opacity="0.2" />
      <path d="M100 62h12" stroke="#F2600A" strokeWidth="7" strokeLinecap="round" />
    </g>
  ),
  dough: (
    <g>
      <g>
        <rect x="12" y="52" width="32" height="42" rx="4" fill="#FFC53D" />
        <ellipse cx="28" cy="52" rx="16" ry="6" fill="#E8453C" />
        <rect x="12" y="66" width="32" height="12" fill="#fff" opacity="0.65" />
      </g>
      <g>
        <rect x="46" y="44" width="32" height="50" rx="4" fill="#3FB0E5" />
        <ellipse cx="62" cy="44" rx="16" ry="6" fill="#FFC53D" />
        <rect x="46" y="60" width="32" height="12" fill="#fff" opacity="0.65" />
      </g>
      <g>
        <rect x="80" y="56" width="30" height="38" rx="4" fill="#3FC4A0" />
        <ellipse cx="95" cy="56" rx="15" ry="5.5" fill="#FF5C93" />
        <rect x="80" y="68" width="30" height="11" fill="#fff" opacity="0.65" />
      </g>
      <path d="M8 94h104" stroke={INK} strokeWidth="3" strokeLinecap="round" opacity="0.15" />
    </g>
  ),
  figure: (
    <g>
      <path d="M60 36l30 8-8 46-22 8-22-8-8-46z" fill="#E8453C" opacity="0.35" />
      <circle cx="60" cy="30" r="14" fill="#FFDDC1" />
      <path d="M46 28a14 14 0 0 1 28 0z" fill="#3FB0E5" />
      <path d="M48 30h10l-2 5h-6zM62 30h10l-2 5h-6z" fill="#fff" />
      <path d="M52 40h16l8 10-4 30H48l-4-30z" fill="#3FB0E5" />
      <path d="M56 46h8l-2 14h-4z" fill="#FFC53D" />
      <path d="M44 50L26 66l6 8 16-14zM76 50l18 16-6 8-16-14z" fill="#FFDDC1" />
      <path d="M50 80h8v26h-8zM62 80h8v26h-8z" fill="#2B2018" />
      <path d="M46 104h14v8H46zM60 104h14v8H60z" fill="#E8453C" />
    </g>
  ),
  dino: (
    <g>
      <path d="M22 88c-6 0-10-4-10-10 0-12 10-18 22-20 4-14 16-24 32-24 18 0 30 12 30 28 0 4-1 8-3 11l8 15H88l-4-6-8 6H60l-4-8-8 8z" fill="#3FC4A0" />
      <path d="M52 50c0-8 6-14 14-14s14 6 14 14-6 14-14 14-14-6-14-14z" fill="#66D9BB" opacity="0.6" />
      <circle cx="78" cy="46" r="4" fill={INK} />
      <circle cx="79.4" cy="44.6" r="1.4" fill="#fff" />
      <path d="M86 56h12" stroke={INK} strokeWidth="2.6" strokeLinecap="round" />
      <path d="M44 34l6-10 6 10zM58 28l6-11 6 11z" fill="#2AA588" />
      <path d="M26 78h10l-2 10H28zM44 80h10l-2 8h-6z" fill="#2AA588" />
    </g>
  ),
  kitchen: (
    <g>
      <rect x="18" y="40" width="84" height="66" rx="8" fill="#FF5C93" />
      <rect x="18" y="40" width="84" height="16" rx="8" fill="#FF83AE" />
      <rect x="26" y="62" width="30" height="36" rx="6" fill="#FFF2F6" />
      <circle cx="41" cy="80" r="10" fill="#FFC53D" opacity="0.7" />
      <rect x="62" y="62" width="32" height="36" rx="6" fill="#FFF2F6" />
      <path d="M70 84h16v6H70z" fill="#3FB0E5" />
      <circle cx="30" cy="48" r="4" fill="#fff" />
      <circle cx="44" cy="48" r="4" fill="#fff" />
      <circle cx="58" cy="48" r="4" fill="#fff" />
      <path d="M62 30h34v10H62z" fill="#C0C7CE" />
      <path d="M70 18c0 6 8 6 8 12M84 16c0 6 8 6 8 12" stroke="#C0C7CE" strokeWidth="3.4" strokeLinecap="round" fill="none" opacity="0.8" />
      <rect x="66" y="26" width="26" height="6" rx="3" fill="#8E969E" />
    </g>
  ),
  babydoll: (
    <g>
      <path d="M32 66c0-6 6-10 14-10h28c8 0 14 4 14 10l6 40H26z" fill="#BFE7FA" />
      <circle cx="60" cy="42" r="24" fill="#FFDDC1" />
      <path d="M40 34c2-10 10-16 20-16s18 6 20 16c-4-4-11-6-20-6s-16 2-20 6z" fill="#F7D6A0" />
      <circle cx="51" cy="42" r="3.2" fill={INK} />
      <circle cx="69" cy="42" r="3.2" fill={INK} />
      <circle cx="52.2" cy="40.8" r="1.1" fill="#fff" />
      <circle cx="70.2" cy="40.8" r="1.1" fill="#fff" />
      <ellipse cx="42" cy="48" rx="5" ry="3.6" fill="#FFB3B3" opacity="0.8" />
      <ellipse cx="78" cy="48" rx="5" ry="3.6" fill="#FFB3B3" opacity="0.8" />
      <ellipse cx="60" cy="52" rx="7" ry="5" fill="#FF9BAE" />
      <rect x="54" y="48" width="12" height="5" rx="2.5" fill="#FF5C93" />
      <path d="M38 78h44" stroke="#8FD3F0" strokeWidth="4" strokeLinecap="round" />
      <rect x="88" y="62" width="16" height="30" rx="8" fill="#FFF2F6" />
      <rect x="92" y="54" width="8" height="10" rx="3" fill="#FFC53D" />
    </g>
  ),
  boardgame: (
    <g>
      <rect x="14" y="44" width="76" height="54" rx="6" fill="#3FB0E5" />
      <rect x="14" y="44" width="76" height="14" rx="6" fill="#1B83BB" />
      <g fill="#FFF">
        <rect x="24" y="64" width="18" height="18" rx="3" opacity="0.85" />
        <rect x="48" y="64" width="18" height="18" rx="3" opacity="0.5" />
        <rect x="24" y="86" width="18" height="8" rx="3" opacity="0.5" />
        <rect x="48" y="86" width="42" height="8" rx="3" opacity="0.85" />
        <rect x="72" y="64" width="18" height="18" rx="3" opacity="0.7" />
      </g>
      <rect x="84" y="62" width="26" height="26" rx="6" fill="#FFF" transform="rotate(14 97 75)" />
      <g fill={INK} transform="rotate(14 97 75)">
        <circle cx="91" cy="69" r="2.6" />
        <circle cx="103" cy="69" r="2.6" />
        <circle cx="97" cy="75" r="2.6" />
        <circle cx="91" cy="81" r="2.6" />
        <circle cx="103" cy="81" r="2.6" />
      </g>
      <path d="M62 30c0-5 4-9 9-9s9 4 9 9c0 6-9 14-9 14s-9-8-9-14z" fill="#E8453C" />
    </g>
  ),
  rc: (
    <g>
      <path d="M16 72c0-10 10-14 22-15l10-12c2-3 5-4 8-4h14c4 0 7 2 9 5l7 11c9 1 16 6 16 15v6H16z" fill="#8B5CF6" />
      <path d="M50 46h12l6 10H46z" fill="#DCCBFF" />
      <circle cx="36" cy="80" r="13" fill="#2B2018" />
      <circle cx="36" cy="80" r="5" fill="#B6B6B6" />
      <circle cx="84" cy="80" r="13" fill="#2B2018" />
      <circle cx="84" cy="80" r="5" fill="#B6B6B6" />
      <rect x="82" y="92" width="30" height="22" rx="6" fill="#2B2018" />
      <circle cx="91" cy="103" r="4" fill="#FFC53D" />
      <circle cx="103" cy="103" r="4" fill="#E8453C" />
      <path d="M108 92V76" stroke="#2B2018" strokeWidth="3.4" strokeLinecap="round" />
      <circle cx="108" cy="73" r="3" fill="#E8453C" />
    </g>
  ),
  capsule: (
    <g>
      <circle cx="60" cy="64" r="36" fill="#FFC53D" />
      <path d="M24 64a36 36 0 0 1 72 0z" fill="#FF5C93" />
      <rect x="20" y="60" width="80" height="9" rx="4.5" fill="#FFF6DE" />
      <circle cx="60" cy="64" r="8" fill="#FFF6DE" />
      <circle cx="60" cy="64" r="4" fill="#F2600A" />
      <g fill="#FFC53D">
        <path d="M18 24l2.6 6 6 2.6-6 2.6L18 41l-2.6-5.8-6-2.6 6-2.6z" />
        <path d="M100 20l2 4.6 4.6 2-4.6 2-2 4.6-2-4.6-4.6-2 4.6-2z" />
        <path d="M104 96l1.7 4 4 1.7-4 1.7-1.7 4-1.7-4-4-1.7 4-1.7z" />
      </g>
    </g>
  ),
  rattle: (
    <g>
      <circle cx="60" cy="46" r="28" fill="none" stroke="#FF5C93" strokeWidth="12" />
      <circle cx="60" cy="46" r="15" fill="#FFF2F6" />
      <circle cx="54" cy="43" r="3.4" fill={INK} />
      <circle cx="66" cy="43" r="3.4" fill={INK} />
      <path d="M55 52q5 4 10 0" stroke={INK} strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <rect x="53" y="74" width="14" height="34" rx="7" fill="#3FB0E5" />
      <circle cx="33" cy="30" r="8" fill="#FFC53D" />
      <circle cx="88" cy="32" r="7" fill="#3FC4A0" />
      <circle cx="32" cy="62" r="6.5" fill="#8B5CF6" />
      <circle cx="90" cy="62" r="6" fill="#E8453C" />
    </g>
  ),
  guitar: (
    <g>
      <path d="M46 64c0-14 10-22 22-22s22 8 22 22-10 26-22 26-22-12-22-26z" fill="#E8453C" />
      <path d="M52 64c0-10 7-16 16-16s16 6 16 16-7 20-16 20-16-10-16-20z" fill="#FF6B61" opacity="0.6" />
      <circle cx="68" cy="64" r="8" fill="#2B2018" />
      <rect x="16" y="58" width="44" height="12" rx="4" fill="#8A4B2A" />
      <rect x="8" y="52" width="14" height="24" rx="5" fill="#2B2018" />
      <g stroke="#FFC53D" strokeWidth="1.4">
        <path d="M22 61h60M22 64.5h60M22 68h60" />
      </g>
      <g fill="#C0C7CE">
        <circle cx="12" cy="57" r="2.6" />
        <circle cx="12" cy="64" r="2.6" />
        <circle cx="12" cy="71" r="2.6" />
      </g>
      <rect x="76" y="76" width="18" height="6" rx="3" fill="#2B2018" />
    </g>
  ),
  rideon: (
    <g>
      <path d="M12 82c0-14 8-20 20-22l12-18c3-4 7-6 12-6h20c6 0 11 3 13 8l8 16c8 2 13 8 13 18v6H12z" fill="#3FB0E5" />
      <path d="M46 44h22l8 16H40z" fill="#DFF2FD" />
      <rect x="54" y="30" width="26" height="18" rx="6" fill="#1B83BB" />
      <rect x="34" y="62" width="22" height="14" rx="5" fill="#FFC53D" />
      <circle cx="34" cy="90" r="14" fill="#2B2018" />
      <circle cx="34" cy="90" r="5.5" fill="#E7E7E7" />
      <circle cx="90" cy="90" r="14" fill="#2B2018" />
      <circle cx="90" cy="90" r="5.5" fill="#E7E7E7" />
      <path d="M100 68h10" stroke="#FFC53D" strokeWidth="6" strokeLinecap="round" />
    </g>
  ),
  puzzle: (
    <g>
      <path d="M20 22h30v10a6 6 0 1 1 0 12v10H20V22z" fill="#E8453C" />
      <path d="M54 22h30v32H62a6 6 0 1 0-8 0V22z" fill="#FFC53D" />
      <path d="M20 58h30v10a6 6 0 1 0 0 12v10H20V58z" fill="#3FB0E5" />
      <path d="M54 58h30v32H62a6 6 0 1 1-8 0V58z" fill="#3FC4A0" />
      <path d="M88 44h22v32H94a5 5 0 1 0-6 0z" fill="#8B5CF6" opacity="0.85" />
    </g>
  ),
  ball: (
    <g>
      <circle cx="60" cy="62" r="40" fill="#FFFFFF" stroke={INK} strokeWidth="3" />
      <path d="M60 36l13 9.5-5 15.5H52l-5-15.5z" fill={INK} />
      <path d="M60 22l-13 6 4-6zM26 52l12 4-4 14zM94 52l-12 4 4 14zM42 96l6-12 12 6zM78 96l-6-12-12 6z" fill={INK} opacity="0.85" />
      <path d="M60 22v14M26 52l12 4M94 52l-12 4M48 84l-6 12M72 84l6 12" stroke={INK} strokeWidth="2.6" />
    </g>
  ),
  unicorn: (
    <g>
      <path d="M34 92c-8-8-12-18-12-30 0-20 16-34 36-34 18 0 32 12 32 28 0 20-14 36-30 36z" fill="#FFF2F6" />
      <path d="M66 30l6-24 10 24z" fill="#FFC53D" />
      <path d="M72 6l10 24" stroke="#F2A93B" strokeWidth="2" />
      <path d="M52 26c-10 0-18 8-18 18 0 14 8 22 8 22s-14-4-18-16c-4-14 6-28 20-30 8-1 14 2 18 6z" fill="#FF5C93" />
      <path d="M46 34c-8 4-12 12-10 22 2 8 8 12 8 12s-12-2-16-12c-4-12 4-20 12-24z" fill="#8B5CF6" opacity="0.7" />
      <path d="M86 40c6-4 14-2 14 6 0 6-6 10-12 10" fill="#FFE3CC" />
      <circle cx="78" cy="56" r="4" fill={INK} />
      <circle cx="79.4" cy="54.6" r="1.4" fill="#fff" />
      <ellipse cx="88" cy="70" rx="9" ry="7" fill="#FFDDE8" />
      <circle cx="86" cy="69" r="1.8" fill={INK} />
      <circle cx="91" cy="69" r="1.8" fill={INK} />
    </g>
  ),
  robot: (
    <g>
      <rect x="34" y="34" width="52" height="42" rx="10" fill="#C0C7CE" />
      <rect x="42" y="44" width="36" height="20" rx="6" fill="#2B2018" />
      <circle cx="53" cy="54" r="5" fill="#3FB0E5" />
      <circle cx="67" cy="54" r="5" fill="#3FB0E5" />
      <circle cx="54.4" cy="52.4" r="1.6" fill="#fff" />
      <circle cx="68.4" cy="52.4" r="1.6" fill="#fff" />
      <path d="M50 70h20" stroke="#8E969E" strokeWidth="3" strokeLinecap="round" />
      <rect x="40" y="80" width="40" height="28" rx="8" fill="#8E969E" />
      <circle cx="60" cy="94" r="7" fill="#FFC53D" />
      <rect x="18" y="82" width="18" height="10" rx="5" fill="#C0C7CE" />
      <rect x="84" y="82" width="18" height="10" rx="5" fill="#C0C7CE" />
      <path d="M60 34V22" stroke="#8E969E" strokeWidth="4" strokeLinecap="round" />
      <circle cx="60" cy="18" r="6" fill="#E8453C" />
    </g>
  ),
};

export function ToyArt({
  art,
  size = 120,
  className,
}: {
  art: ToyArtKey;
  size?: number;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      className={className}
      role="presentation"
      aria-hidden
    >
      {ART[art]}
    </svg>
  );
}

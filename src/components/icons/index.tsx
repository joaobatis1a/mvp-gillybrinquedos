import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Icon({ size = 22, children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      {children}
    </svg>
  );
}

export const SearchIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="M20 20l-4.3-4.3" />
  </Icon>
);

export const CartIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M2.5 3h2.1l2.3 11.2a1.9 1.9 0 0 0 1.9 1.5h8.4a1.9 1.9 0 0 0 1.9-1.5L21 7.4H6" />
    <circle cx="9.5" cy="20" r="1.4" fill="currentColor" stroke="none" />
    <circle cx="18" cy="20" r="1.4" fill="currentColor" stroke="none" />
  </Icon>
);

export const UserIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="8.2" r="3.8" />
    <path d="M4.6 20c1.5-3.9 4.3-5.9 7.4-5.9s5.9 2 7.4 5.9" />
  </Icon>
);

export const HeartIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 20s-7.5-4.4-7.5-9.4A4.1 4.1 0 0 1 12 8a4.1 4.1 0 0 1 7.5 2.6c0 5-7.5 9.4-7.5 9.4z" />
  </Icon>
);

export const MenuIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4 7h16M4 12h16M4 17h10" />
  </Icon>
);

export const CloseIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M6 6l12 12M18 6L6 18" />
  </Icon>
);

export const ChevronDownIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M6 9.5l6 6 6-6" />
  </Icon>
);

export const ChevronRightIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M9.5 5l6.5 7-6.5 7" />
  </Icon>
);

export const ArrowRightIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4 12h15" />
    <path d="M13.5 6.5L19.5 12l-6 5.5" />
  </Icon>
);

export const StarIcon = ({ filled = false, ...p }: IconProps & { filled?: boolean }) => (
  <Icon {...p} fill={filled ? "currentColor" : "none"}>
    <path d="M12 3.6l2.5 5.2 5.6.8-4 4 1 5.7-5.1-2.8-5.1 2.8 1-5.7-4-4 5.6-.8z" />
  </Icon>
);

export const TruckIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M2.8 6.4h10.4v9.2H2.8z" />
    <path d="M13.2 9.4h3.6l3 3v3.2h-6.6z" />
    <circle cx="7" cy="18" r="1.9" />
    <circle cx="17" cy="18" r="1.9" />
  </Icon>
);

export const StoreIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4 10.2V20h16v-9.8" />
    <path d="M3 10.2l1.7-5.4h14.6L21 10.2a3 3 0 0 1-5.6 1.6 3 3 0 0 1-5.6 0 3 3 0 0 1-5.6-1.6z" />
    <path d="M10 20v-4.6h4V20" />
  </Icon>
);

export const CardIcon = (p: IconProps) => (
  <Icon {...p}>
    <rect x="2.8" y="5.4" width="18.4" height="13.2" rx="2.6" />
    <path d="M2.8 10h18.4" />
    <path d="M6.6 15h3.2" />
  </Icon>
);

export const PixIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 3.4l3.5 3.5a2.4 2.4 0 0 1 0 3.4L12 13.8 8.5 10.3a2.4 2.4 0 0 1 0-3.4z" />
    <path d="M12 10.2l3.5 3.5a2.4 2.4 0 0 1 0 3.4L12 20.6l-3.5-3.5a2.4 2.4 0 0 1 0-3.4z" />
  </Icon>
);

export const WhatsAppIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M20 11.7A7.9 7.9 0 0 1 8.2 18.8L4 20l1.3-4.1A7.9 7.9 0 1 1 20 11.7z" />
    <path d="M9.3 9.2c.4 2.6 2.6 4.6 5.2 5 .5.1 1-.2 1.2-.7l.2-.6-1.9-.9-.7.8a5 5 0 0 1-2.4-2.3l.8-.7-.9-1.9-.6.2c-.5.2-.8.6-.9 1.1z" />
  </Icon>
);

export const InstagramIcon = (p: IconProps) => (
  <Icon {...p}>
    <rect x="3.6" y="3.6" width="16.8" height="16.8" rx="5" />
    <circle cx="12" cy="12" r="3.8" />
    <circle cx="17" cy="7" r="1" fill="currentColor" stroke="none" />
  </Icon>
);

export const FilterIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4 6.5h16M7 12h10M10 17.5h4" />
  </Icon>
);

export const SlidersIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M5 4v6M5 14v6M12 4v3M12 11v9M19 4v9M19 17v3" />
    <circle cx="5" cy="12" r="2" />
    <circle cx="12" cy="9" r="2" />
    <circle cx="19" cy="15" r="2" />
  </Icon>
);

export const CheckIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M5 12.6l4.3 4.2L19 7.2" />
  </Icon>
);

export const PlusIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 5.5v13M5.5 12h13" />
  </Icon>
);

export const MinusIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M5.5 12h13" />
  </Icon>
);

export const TrashIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4.5 6.6h15" />
    <path d="M9.4 6.6V4.9h5.2v1.7" />
    <path d="M6.6 6.6l.9 12a1.6 1.6 0 0 0 1.6 1.5h5.8a1.6 1.6 0 0 0 1.6-1.5l.9-12" />
  </Icon>
);

export const SparkleIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 3.5l1.9 4.6 4.6 1.9-4.6 1.9L12 16.5l-1.9-4.6L5.5 10l4.6-1.9z" />
    <path d="M18.5 15.5l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z" />
  </Icon>
);

export const GiftIcon = (p: IconProps) => (
  <Icon {...p}>
    <rect x="3.6" y="9.4" width="16.8" height="10.6" rx="2" />
    <path d="M2.6 6.2h18.8v3.2H2.6zM12 6.2V20" />
    <path d="M12 6.2S10.8 3 8.8 3a2 2 0 1 0 0 3.2zM12 6.2S13.2 3 15.2 3a2 2 0 1 1 0 3.2z" />
  </Icon>
);

export const TagIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M11 3.5H20v9l-8.4 8.4a1.8 1.8 0 0 1-2.5 0l-6.5-6.5a1.8 1.8 0 0 1 0-2.5z" />
    <circle cx="16.2" cy="7.8" r="1.5" />
  </Icon>
);

export const ShieldIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 3.2l7 2.6v5.4c0 4.4-2.9 7.6-7 9.6-4.1-2-7-5.2-7-9.6V5.8z" />
    <path d="M9 12l2.2 2.2L15.4 10" />
  </Icon>
);

export const ClockIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="8.4" />
    <path d="M12 7.4V12l3 1.8" />
  </Icon>
);

export const PinIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 21s6.4-5.6 6.4-10.2a6.4 6.4 0 1 0-12.8 0C5.6 15.4 12 21 12 21z" />
    <circle cx="12" cy="10.6" r="2.5" />
  </Icon>
);

export const PackageIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 3l8 4.2v9.6L12 21l-8-4.2V7.2z" />
    <path d="M4 7.2l8 4.2 8-4.2M12 11.4V21" />
  </Icon>
);

export const AgeIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="8.6" />
    <path d="M9 10h.01M15 10h.01" />
    <path d="M8.8 14.4a4.4 4.4 0 0 0 6.4 0" />
  </Icon>
);

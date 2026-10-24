import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function base(size: number, props: SVGProps<SVGSVGElement>) {
  return {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    ...props,
  };
}

export function PhoneIcon({ size = 20, ...rest }: IconProps) {
  return (
    <svg {...base(size, rest)}>
      <path d="M21 16.5v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 1.12 3.8 2 2 0 0 1 3.11 1.6h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L7.1 9.5a16 16 0 0 0 6 6l1.26-1.26a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7a2 2 0 0 1 1.72 2Z" />
    </svg>
  );
}

export function WhatsAppIcon({ size = 20, ...rest }: IconProps) {
  return (
    <svg {...base(size, rest)} fill="currentColor" stroke="none">
      <path d="M17.6 14.2c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.6.1l-.9 1.1c-.2.2-.4.2-.7.1-.9-.4-1.7-.9-2.4-1.6-.7-.7-1.2-1.5-1.6-2.4-.1-.3 0-.5.1-.6l.7-.7.4-.7v-.3l-.9-2c-.1-.3-.3-.4-.5-.4h-.7c-.2 0-.5.1-.7.3-.6.5-1 1.3-1 2.1 0 1.4.9 2.7 1.1 2.9 1.5 2.2 3.1 3.7 5.4 4.6.7.3 1.3.5 1.8.6.6.1 1.2.1 1.7-.1.5-.2 1.5-.7 1.8-1.4.2-.5.3-1 .2-1.5-.1-.1-.2-.2-.5-.3Z M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3.1.8.8-3-.2-.3a8.2 8.2 0 1 1 7 3.9Z" />
    </svg>
  );
}

export function ArrowRight({ size = 16, ...rest }: IconProps) {
  return (
    <svg {...base(size, rest)}>
      <path d="M3 12h16M13 5l7 7-7 7" />
    </svg>
  );
}

export function ArrowDown({ size = 16, ...rest }: IconProps) {
  return (
    <svg {...base(size, rest)}>
      <path d="M12 3v16M5 13l7 7 7-7" />
    </svg>
  );
}

export function CheckIcon({ size = 16, ...rest }: IconProps) {
  return (
    <svg {...base(size, rest)}>
      <path d="M4 12.5L9 17.5L20 6.5" />
    </svg>
  );
}

export function MailIcon({ size = 20, ...rest }: IconProps) {
  return (
    <svg {...base(size, rest)}>
      <rect x="2.5" y="4.5" width="19" height="15" rx="2" />
      <path d="M3 6.5l9 6.5 9-6.5" />
    </svg>
  );
}

export function MenuIcon({ size = 24, ...rest }: IconProps) {
  return (
    <svg {...base(size, rest)}>
      <path d="M4 7h16M4 17h16" />
    </svg>
  );
}

export function CloseIcon({ size = 24, ...rest }: IconProps) {
  return (
    <svg {...base(size, rest)}>
      <path d="M5 5l14 14M19 5L5 19" />
    </svg>
  );
}

export function ShieldIcon({ size = 20, ...rest }: IconProps) {
  return (
    <svg {...base(size, rest)}>
      <path d="M12 3l8 3v6c0 4.5-3.5 8.5-8 9-4.5-.5-8-4.5-8-9V6l8-3Z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

export function MapPinIcon({ size = 20, ...rest }: IconProps) {
  return (
    <svg {...base(size, rest)}>
      <path d="M12 22s7-7 7-12a7 7 0 0 0-14 0c0 5 7 12 7 12Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

export function ClockIcon({ size = 20, ...rest }: IconProps) {
  return (
    <svg {...base(size, rest)}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

export function TruckIcon({ size = 24, ...rest }: IconProps) {
  return (
    <svg {...base(size, rest)}>
      <path d="M2 17V7h11v10" />
      <path d="M13 10h4l4 4v3h-8" />
      <circle cx="6" cy="18" r="2" />
      <circle cx="17" cy="18" r="2" />
    </svg>
  );
}

export function BoxIcon({ size = 24, ...rest }: IconProps) {
  return (
    <svg {...base(size, rest)}>
      <path d="M21 8l-9-5-9 5 9 5 9-5Z" />
      <path d="M3 8v8l9 5 9-5V8" />
      <path d="M12 13v8" />
    </svg>
  );
}

export function ElevatorIcon({ size = 24, ...rest }: IconProps) {
  return (
    <svg {...base(size, rest)}>
      <rect x="4" y="3" width="16" height="18" rx="1" />
      <path d="M12 3v18" />
      <path d="M9 9l-2 2-2-2M9 15l-2-2-2 2" />
    </svg>
  );
}

export function PianoIcon({ size = 24, ...rest }: IconProps) {
  return (
    <svg {...base(size, rest)}>
      <rect x="3" y="6" width="18" height="13" rx="1" />
      <path d="M8 6v8M12 6v8M16 6v8M3 14h18" />
    </svg>
  );
}

export function PackageTapeIcon({ size = 24, ...rest }: IconProps) {
  return (
    <svg {...base(size, rest)}>
      <rect x="3" y="6" width="18" height="14" rx="1.5" />
      <path d="M3 11h18" />
      <path d="M9 6V4h6v2" />
    </svg>
  );
}

export function WarehouseIcon({ size = 24, ...rest }: IconProps) {
  return (
    <svg {...base(size, rest)}>
      <path d="M3 9l9-5 9 5v11H3V9Z" />
      <path d="M7 20v-7h10v7" />
      <path d="M7 16h10" />
    </svg>
  );
}

export function StarIcon({ size = 14, filled = false, ...rest }: IconProps & { filled?: boolean }) {
  return (
    <svg {...base(size, rest)} fill={filled ? "currentColor" : "none"}>
      <path d="m12 3 2.7 5.5L20.5 9.5l-4.3 4.2 1 6L12 16.8 6.7 19.7l1-6L3.5 9.5l5.8-1L12 3Z" />
    </svg>
  );
}

export function PinIcon({ size = 16, ...rest }: IconProps) {
  return (
    <svg {...base(size, rest)}>
      <circle cx="12" cy="10" r="3.5" />
      <path d="M12 21s5.5-6.5 5.5-11a5.5 5.5 0 1 0-11 0c0 4.5 5.5 11 5.5 11Z" />
    </svg>
  );
}

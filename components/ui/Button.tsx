import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Icon, type IconName } from "./Icon";

type Variant = "primary" | "secondary" | "ghost" | "light";
type Size = "md" | "lg";

const base =
  "group relative inline-flex items-center justify-center gap-2.5 rounded-full text-center font-medium tracking-[-0.01em] transition-[background-color,border-color,color,box-shadow,transform] duration-300 ease-[var(--ease-out-expo)] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent-strong text-white shadow-[0_0_0_1px_rgb(255_255_255/0.08)_inset,0_8px_24px_-8px_rgb(61_102_245/0.6)] hover:shadow-[0_0_0_1px_rgb(255_255_255/0.14)_inset,0_12px_36px_-8px_rgb(61_102_245/0.85)]",
  secondary: "border border-line-strong bg-white/[0.02] text-fg hover:border-white/30 hover:bg-white/[0.06]",
  ghost: "text-fg hover:text-white",
  light: "bg-fg text-ink hover:bg-white",
};

const sizes: Record<Size, string> = {
  md: "min-h-11 px-5 py-2.5 text-[0.9rem] leading-tight",
  lg: "min-h-13 px-7 py-3 text-[0.95rem] leading-tight",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "md", className?: string) {
  return cn(base, variants[variant], sizes[size], variant === "ghost" && "min-h-0 px-0 py-0", className);
}

function ButtonContent({ children, icon }: { children: ReactNode; icon?: IconName | false }) {
  return (
    <>
      <span>{children}</span>
      {icon !== false && (
        <span className="relative -mr-1 inline-flex size-4 shrink-0 overflow-hidden">
          <Icon
            name={icon ?? "arrowRight"}
            className="size-4 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-[120%]"
          />
          <Icon
            name={icon ?? "arrowRight"}
            className="absolute inset-0 size-4 -translate-x-[120%] transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-0"
          />
        </span>
      )}
    </>
  );
}

type ButtonLinkProps = ComponentProps<typeof Link> & { variant?: Variant; size?: Size; icon?: IconName | false };

export function ButtonLink({ variant, size, icon, className, children, ...props }: ButtonLinkProps) {
  return (
    <Link className={buttonClasses(variant, size, className)} {...props}>
      <ButtonContent icon={icon}>{children}</ButtonContent>
    </Link>
  );
}

type ButtonProps = ComponentProps<"button"> & { variant?: Variant; size?: Size; icon?: IconName | false };

export function Button({ variant, size, icon, className, children, ...props }: ButtonProps) {
  return (
    <button className={buttonClasses(variant, size, className)} {...props}>
      <ButtonContent icon={icon}>{children}</ButtonContent>
    </button>
  );
}

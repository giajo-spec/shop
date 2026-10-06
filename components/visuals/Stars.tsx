import { cn } from "@/lib/cn";

export function Stars({ className, size = "size-3.5" }: { className?: string; size?: string }) {
  return (
    <span className={cn("inline-flex gap-0.5", className)} aria-hidden="true">
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 20 20" className={size} fill="currentColor">
          <path d="m10 1.8 2.5 5.2 5.7.8-4.1 4 1 5.6L10 14.7l-5.1 2.7 1-5.6-4.1-4 5.7-.8L10 1.8Z" />
        </svg>
      ))}
    </span>
  );
}

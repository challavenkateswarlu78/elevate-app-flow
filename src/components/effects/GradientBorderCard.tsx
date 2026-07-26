import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface GradientBorderCardProps {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
}

/**
 * Card with a rotating conic-gradient border using site palette (primary → violet).
 */
export function GradientBorderCard({ children, className, innerClassName }: GradientBorderCardProps) {
  return (
    <div className={cn("relative overflow-hidden rounded-2xl p-[1.5px]", className)}>
      {/* Rotating gradient ring */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[220%] w-[160px] -translate-x-1/2 -translate-y-1/2 animate-spin-slow"
        style={{
          backgroundImage:
            "linear-gradient(180deg, hsl(var(--primary)), hsl(var(--violet)))",
        }}
      />
      <div className={cn("relative rounded-[calc(1rem-1.5px)] bg-card h-full w-full", innerClassName)}>
        {children}
      </div>
    </div>
  );
}

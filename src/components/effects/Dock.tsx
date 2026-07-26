import { useRef, ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform, MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

export interface DockItemDef {
  icon: ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

interface DockProps {
  items: DockItemDef[];
  className?: string;
  iconSize?: number;
  magnification?: number;
  distance?: number;
}

function Item({
  item,
  mouseX,
  iconSize,
  magnification,
  distance,
}: {
  item: DockItemDef;
  mouseX: MotionValue<number>;
  iconSize: number;
  magnification: number;
  distance: number;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const d = useTransform(mouseX, (val) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return distance * 2;
    return Math.abs(val - (rect.left + rect.width / 2));
  });
  const sizeRaw = useTransform(d, (v) => {
    const g = (magnification - 1) * Math.exp(-(v * v) / (2 * distance * distance)) + 1;
    return iconSize * g;
  });
  const size = useSpring(sizeRaw, { stiffness: 400, damping: 25, mass: 0.4 });

  return (
    <motion.button
      ref={ref}
      onClick={item.onClick}
      aria-label={item.label}
      style={{ width: size, height: size }}
      className={cn(
        "flex items-center justify-center rounded-xl transition-colors",
        item.active
          ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
          : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
      )}
    >
      <span className="[&_svg]:size-[55%] flex items-center justify-center w-full h-full">
        {item.icon}
      </span>
    </motion.button>
  );
}

export function Dock({
  items,
  className,
  iconSize = 44,
  magnification = 1.6,
  distance = 100,
}: DockProps) {
  const mouseX = useMotionValue(Infinity);
  return (
    <div
      onMouseMove={(e) => mouseX.set(e.clientX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "inline-flex items-end gap-2 rounded-2xl border border-border bg-card/80 backdrop-blur-md p-2 shadow-lg",
        className
      )}
    >
      {items.map((item, i) => (
        <Item
          key={i}
          item={item}
          mouseX={mouseX}
          iconSize={iconSize}
          magnification={magnification}
          distance={distance}
        />
      ))}
    </div>
  );
}

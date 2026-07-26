import { motion } from "framer-motion";

const row1 = [
  "Meridian Co.", "Stackflow", "BluePeak Ventures", "Orion Health", "Lattice Systems",
  "Crestwave", "Vantex Group", "Pulsar AI", "Novu Labs", "Arctis Media",
];

const row2 = [
  "Inkwell Agency", "ZeroBase Studio", "Helix Analytics", "Folio Works", "Brightloop",
  "Draftline", "Quartzfield", "Moonpath Travel", "Cobalt Security", "Renova Digital",
];

function MarqueeRow({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className="relative overflow-hidden py-3">
      {/* Edge fade masks — orbital focus feel */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 z-10 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 z-10 bg-gradient-to-l from-background to-transparent" />
      <div className={`flex gap-8 ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`} style={{ width: "max-content" }}>
        {doubled.map((name, i) => (
          <div
            key={`${name}-${i}`}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-card border border-border/50 text-muted-foreground text-sm font-medium whitespace-nowrap hover:border-primary/30 hover:text-foreground hover:scale-105 transition-all duration-300"
          >
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-primary/20 to-violet/20 flex items-center justify-center text-xs font-bold text-primary">
              {name[0]}
            </div>
            {name}
          </div>
        ))}
      </div>
    </div>
  );
}


export function TrustStrip() {
  return (
    <section className="py-16 bg-background overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <p className="text-muted-foreground text-sm font-medium uppercase tracking-wider">
          We're proud to be defined by the company we keep
        </p>
      </motion.div>
      <MarqueeRow items={row1} />
      <MarqueeRow items={row2} reverse />
    </section>
  );
}

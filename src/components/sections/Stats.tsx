import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Award } from "lucide-react";

const stats = [
  { value: 7043, label: "Active teams worldwide", sub: "Across 54 countries" },
  { value: 14, label: "Saved in SaaS costs", sub: "Collectively by customers in 2024", prefix: "$", suffix: "M+" },
  { value: 120, label: "Native integrations", sub: "Added 18 new in Q1 2025", suffix: "+" },
  { value: 62, label: "Avg. SaaS cost reduction", sub: "vs. running equivalent separate tools", suffix: "%" },
  { value: 99.9, label: "Uptime SLA", sub: "8.7M+ minutes of zero downtime", suffix: "%" },
  { value: 4.8, label: "Customer satisfaction", sub: "Based on 2,300+ verified reviews", suffix: "/5" },
];

const badges = [
  "🏅 G2 Leader — Winter 2025",
  "🏅 Product Hunt — #1 of the Day",
  "🏅 SOC 2 Type II Certified",
  "🏅 Forbes Cloud 100 — Watchlist",
];

function CountUp({ end, prefix = "", suffix = "", duration = 2000 }: { end: number; prefix?: string; suffix?: string; duration?: number }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const start = Date.now();
        const tick = () => {
          const elapsed = Date.now() - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setVal(Number((eased * end).toFixed(end % 1 !== 0 ? 1 : 0)));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [end, duration]);

  return (
    <span ref={ref} className="font-display font-bold text-3xl md:text-4xl">
      {prefix}{typeof val === "number" ? val.toLocaleString() : val}{suffix}
    </span>
  );
}

export function Stats() {
  return (
    <section className="py-24 hero-gradient text-primary-foreground">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-cyan text-sm font-semibold uppercase tracking-wider mb-3">Our Impact</p>
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">Numbers that speak for themselves</h2>
          <p className="text-primary-foreground/60 max-w-xl mx-auto">
            Every metric below is a real team that stopped juggling tools and started actually working.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="text-center p-6 rounded-2xl bg-primary-foreground/5 border border-primary-foreground/10"
            >
              <CountUp end={s.value} prefix={s.prefix} suffix={s.suffix} />
              <p className="text-primary-foreground/80 text-sm font-medium mt-2">{s.label}</p>
              <p className="text-primary-foreground/40 text-xs mt-1">{s.sub}</p>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {badges.map((b) => (
            <div key={b} className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/5 border border-primary-foreground/10 text-sm text-primary-foreground/70">
              {b}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

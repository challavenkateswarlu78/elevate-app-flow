import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Play } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden hero-gradient">
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "4s" }} />
        {/* Dot grid overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
      </div>

      <div className="container relative z-10 mx-auto px-4 pt-24 pb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary-foreground/80 text-sm mb-8">
            <span className="w-2 h-2 rounded-full bg-green animate-pulse" />
            Now serving 7,043 teams across 54 countries
          </div>

          <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-primary-foreground leading-[1.1] tracking-tight max-w-4xl mx-auto mb-6">
            One workspace.{" "}
            <span className="bg-gradient-to-r from-primary via-cyan to-violet bg-clip-text text-transparent">
              Every tool
            </span>{" "}
            your team needs.
          </h1>

          <p className="text-lg md:text-xl text-primary-foreground/60 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
            NexaCloud unifies communication, collaboration, file management, and security into a single intelligent hub — replacing Slack, Notion, Zoom, Dropbox & more.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/signup">
              <Button variant="hero-white" size="xl">
                Start free — no card needed <ArrowRight className="ml-1" />
              </Button>
            </Link>
            <Button variant="hero-ghost" size="xl" className="text-primary-foreground/80 border-primary-foreground/20">
              <Play className="mr-1 h-4 w-4" /> Watch demo
            </Button>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-12 text-primary-foreground/40 text-xs">
            <span>🔒 SOC 2 Certified</span>
            <span>🇪🇺 GDPR Compliant</span>
            <span>⚡ 99.9% Uptime</span>
            <span>🛡️ End-to-end encrypted</span>
          </div>
        </motion.div>

        {/* Dashboard mockup */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="mt-16 relative max-w-5xl mx-auto"
        >
          <div className="rounded-2xl border border-primary-foreground/10 bg-primary-foreground/5 backdrop-blur-sm p-2 shadow-2xl shadow-primary/10">
            <div className="rounded-xl bg-gradient-to-b from-primary-foreground/10 to-transparent aspect-[16/9] flex items-center justify-center">
              <div className="grid grid-cols-3 gap-4 p-8 w-full max-w-3xl">
                {/* Mock dashboard cards */}
                {[
                  { label: "Active Projects", value: "24", color: "bg-primary/30" },
                  { label: "Team Members", value: "48", color: "bg-cyan/30" },
                  { label: "Storage Used", value: "847 GB", color: "bg-violet/30" },
                ].map((card) => (
                  <div key={card.label} className={`${card.color} rounded-xl p-4 backdrop-blur-sm animate-float`}>
                    <p className="text-primary-foreground/50 text-xs">{card.label}</p>
                    <p className="text-primary-foreground font-display font-bold text-2xl mt-1">{card.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Glow effect below */}
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-20 bg-primary/20 blur-3xl rounded-full" />
        </motion.div>
      </div>
    </section>
  );
}

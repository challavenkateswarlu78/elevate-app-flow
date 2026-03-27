import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Play } from "lucide-react";
import dashboardPreview from "@/assets/dashboard-preview.jpg";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden hero-gradient">
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "4s" }} />
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

        {/* Dashboard Preview - Real Screenshot */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="mt-16 relative max-w-5xl mx-auto"
        >
          <div className="rounded-2xl border border-primary-foreground/10 bg-primary-foreground/5 backdrop-blur-sm p-1.5 shadow-2xl shadow-primary/20 glow-shadow">
            {/* macOS-style title bar */}
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-primary-foreground/10">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-destructive/80" />
                <div className="w-3 h-3 rounded-full bg-amber" />
                <div className="w-3 h-3 rounded-full bg-green" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="px-6 py-1 rounded-md bg-primary-foreground/5 text-primary-foreground/30 text-xs font-mono">
                  app.nexacloud.io/dashboard
                </div>
              </div>
              <div className="w-12" />
            </div>
            {/* Dashboard image */}
            <img
              src={dashboardPreview}
              alt="NexaCloud dashboard showing project management, team collaboration, calendar, and real-time chat"
              width={1920}
              height={1080}
              className="rounded-b-xl w-full h-auto"
            />
          </div>
          {/* Glow effect below */}
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-20 bg-primary/30 blur-3xl rounded-full" />
        </motion.div>
      </div>
    </section>
  );
}

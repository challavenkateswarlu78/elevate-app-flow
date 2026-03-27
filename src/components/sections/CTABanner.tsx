import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function CTABanner() {
  return (
    <section className="py-24 cta-gradient relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-violet/10 rounded-full blur-3xl" />
      </div>
      <div className="container relative z-10 mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-cyan text-sm font-semibold uppercase tracking-wider mb-4">Start today — it's free</p>
          <h2 className="font-display font-bold text-3xl md:text-5xl text-primary-foreground mb-6 max-w-3xl mx-auto leading-tight">
            Your team deserves better than 6 different tabs
          </h2>
          <p className="text-primary-foreground/60 max-w-xl mx-auto mb-10 text-lg">
            Join 7,000+ teams who replaced their entire tool stack with NexaCloud. Set up in minutes. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/signup">
              <Button variant="hero-white" size="xl">
                Start free — no card needed <ArrowRight className="ml-1" />
              </Button>
            </Link>
            <Button variant="hero-ghost" size="xl" className="text-primary-foreground/80 border-primary-foreground/20">
              Talk to sales
            </Button>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-primary-foreground/40 text-xs">
            <span>🔒 SOC 2 Certified</span>
            <span>🇪🇺 GDPR Compliant</span>
            <span>⚡ 99.9% Uptime</span>
            <span>🛡️ End-to-end encrypted</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

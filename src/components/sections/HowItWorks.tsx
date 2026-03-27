import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UserPlus, Plug, Rocket } from "lucide-react";

const steps = [
  {
    num: "01",
    title: "Create your workspace",
    desc: "Sign up in 30 seconds. Invite your team via email or link. No credit card required — start on our generous free plan.",
    icon: UserPlus,
    detail: "Set up team channels, roles, and permissions in minutes. NexaCloud's smart onboarding wizard guides you through every step.",
  },
  {
    num: "02",
    title: "Connect your tools",
    desc: "Link your existing stack — Salesforce, Google Drive, Slack history, and 120+ more. OAuth click, no dev required.",
    icon: Plug,
    detail: "Auto-sync keeps everything fresh. Real-time, hourly, or daily — you choose. We handle API changes so you never notice a thing.",
  },
  {
    num: "03",
    title: "Work from one place",
    desc: "Chat, call, share files, manage projects — all in NexaCloud. One login. One bill. One place where your team actually lives.",
    icon: Rocket,
    detail: "Watch your team's productivity soar as context-switching drops. Average teams save 62% on SaaS costs within 3 months.",
  },
];

export function HowItWorks() {
  const [active, setActive] = useState(0);

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-primary text-sm font-semibold uppercase tracking-wider mb-3">How it works</p>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4">
            Up and running in under 10 minutes
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Three steps. That's all it takes to replace your entire tool stack.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
          {/* Step selectors */}
          <div className="space-y-4">
            {steps.map((step, i) => (
              <motion.button
                key={step.num}
                onClick={() => setActive(i)}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`w-full text-left p-5 rounded-xl border transition-all duration-300 ${
                  active === i
                    ? "border-primary/30 bg-primary/5 shadow-lg shadow-primary/5"
                    : "border-border hover:border-primary/20 bg-card"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-2.5 rounded-lg ${active === i ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"} transition-colors`}>
                    <step.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-mono mb-1">{step.num}</p>
                    <h3 className="font-display font-semibold text-foreground mb-1">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.desc}</p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Detail panel */}
          <div className="lg:sticky lg:top-24">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="rounded-2xl border border-border bg-card p-8"
              >
                <div className="p-4 rounded-xl bg-primary/5 mb-6">
                  {(() => {
                    const Icon = steps[active].icon;
                    return <Icon className="h-12 w-12 text-primary" />;
                  })()}
                </div>
                <h3 className="font-display font-bold text-xl text-foreground mb-3">{steps[active].title}</h3>
                <p className="text-muted-foreground leading-relaxed">{steps[active].detail}</p>
                <div className="mt-6 h-32 rounded-lg bg-gradient-to-br from-primary/10 to-violet/10 flex items-center justify-center">
                  <span className="text-muted-foreground text-sm">Interactive preview</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

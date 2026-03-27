import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Video, FileBox, Shield, Users, Zap } from "lucide-react";
import featureChat from "@/assets/feature-chat.jpg";
import featureVideo from "@/assets/feature-video.jpg";
import featureVault from "@/assets/feature-vault.jpg";
import featureSecurity from "@/assets/feature-security.jpg";
import featureWorkspace from "@/assets/feature-workspace.jpg";
import featureOnboarding from "@/assets/feature-onboarding.jpg";

const features = [
  {
    icon: MessageSquare,
    title: "Chat & Threads",
    desc: "Team channels, DMs, threaded replies. Rich media, reactions, pinned messages — everything you loved about Slack, built natively.",
    highlights: ["Threaded conversations", "Rich media sharing", "Pinned messages & bookmarks"],
    image: featureChat,
  },
  {
    icon: Video,
    title: "Voice Calling",
    desc: "HD video & voice calls with recording, transcription, and AI-generated meeting summaries. No extra app needed.",
    highlights: ["HD video & audio", "Auto transcription", "AI meeting summaries"],
    image: featureVideo,
  },
  {
    icon: FileBox,
    title: "Media Vault",
    desc: "1 TB cloud storage with 40+ file previews, version history, and granular permissions. Your team's single source of truth.",
    highlights: ["1 TB storage included", "40+ file type previews", "Version history"],
    image: featureVault,
  },
  {
    icon: Shield,
    title: "SSO & Security",
    desc: "SAML 2.0, Google, Microsoft SSO. Real-time endpoint monitoring, threat alerts, and compliance-ready audit logs.",
    highlights: ["SAML 2.0 SSO", "Endpoint monitoring", "SOC 2 compliant"],
    image: featureSecurity,
  },
  {
    icon: Users,
    title: "Multi-Workspace",
    desc: "Manage multiple teams or clients from one dashboard. Sub-accounts with isolated workspaces and per-client billing.",
    highlights: ["Client sub-accounts", "Isolated workspaces", "Per-client billing"],
    image: featureWorkspace,
  },
  {
    icon: Zap,
    title: "Smart Onboarding",
    desc: "AI-driven engagement score, churn risk alerts, and next-best-action recommendations to keep your team productive.",
    highlights: ["Engagement scoring", "Churn risk alerts", "Next-best-action AI"],
    image: featureOnboarding,
  },
];

export function Features() {
  const [active, setActive] = useState(0);

  return (
    <section id="features" className="py-24 bg-card/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-primary text-sm font-semibold uppercase tracking-wider mb-3">Features</p>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4">
            Everything your team needs, nothing it doesn't
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            13 products across 5 categories — from communication to security. All in one workspace.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[280px_1fr] gap-8 max-w-6xl mx-auto">
          {/* Feature tabs */}
          <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
            {features.map((f, i) => (
              <button
                key={f.title}
                onClick={() => setActive(i)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left whitespace-nowrap transition-all duration-300 ${
                  active === i
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                <f.icon className="h-5 w-5 shrink-0" />
                <span className="text-sm font-medium">{f.title}</span>
              </button>
            ))}
          </div>

          {/* Feature content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 20, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -20, scale: 0.98 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="rounded-2xl border border-border bg-card p-8 lg:p-10 overflow-hidden"
            >
              <div className="flex items-center gap-3 mb-4">
                {(() => {
                  const Icon = features[active].icon;
                  return (
                    <motion.div
                      initial={{ rotate: -10, scale: 0.8 }}
                      animate={{ rotate: 0, scale: 1 }}
                      className="p-2.5 rounded-xl bg-primary/10"
                    >
                      <Icon className="h-6 w-6 text-primary" />
                    </motion.div>
                  );
                })()}
                <h3 className="font-display font-bold text-2xl text-foreground">{features[active].title}</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-6">{features[active].desc}</p>
              <div className="grid sm:grid-cols-3 gap-3 mb-8">
                {features[active].highlights.map((h, i) => (
                  <motion.div
                    key={h}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-2 text-sm"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-green shrink-0" />
                    <span className="text-foreground">{h}</span>
                  </motion.div>
                ))}
              </div>
              {/* Feature image preview */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="rounded-xl overflow-hidden border border-border/50 shadow-lg shadow-primary/5"
              >
                <img
                  src={features[active].image}
                  alt={`${features[active].title} preview`}
                  loading="lazy"
                  width={1024}
                  height={640}
                  className="w-full h-auto"
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

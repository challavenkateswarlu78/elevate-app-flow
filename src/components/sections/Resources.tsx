import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, FileText, Newspaper, Video, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const tabs = [
  {
    label: "Docs & Guides",
    icon: BookOpen,
    headline: "Up and running in under 10 minutes",
    body: "Step-by-step guides, API references, and video walkthroughs for every NexaCloud feature.",
    cards: [
      { title: "Getting started with NexaCloud", tag: "Beginner", time: "5 min read" },
      { title: "Connecting your CRM to NexaCloud", tag: "Integration", time: "8 min read" },
      { title: "Setting up SSO with SAML 2.0", tag: "Security", time: "12 min read" },
    ],
    cta: "Browse all docs →",
  },
  {
    label: "Case Studies",
    icon: FileText,
    headline: "Real teams. Real results.",
    body: "See how teams like yours replaced their entire tool stack with NexaCloud.",
    cards: [
      { title: "Stackflow Agency — Replaced 6 tools, cut SaaS spend by 62%", tag: "Agency", time: "" },
      { title: "Meridian Co. — IT onboarding: 2 days → 20 min with SSO", tag: "Enterprise", time: "" },
      { title: "BluePeak Ventures — Manages 14 client workspaces from one dashboard", tag: "FinTech", time: "" },
    ],
    cta: "Read all case studies →",
  },
  {
    label: "Blog",
    icon: Newspaper,
    headline: "Insights for modern teams",
    body: "Practical advice on remote collaboration, SaaS cost optimization, team security.",
    cards: [
      { title: "Why your team needs a unified workspace in 2025", tag: "Productivity", time: "Mar 12" },
      { title: "The hidden cost of tool sprawl (and how to fix it)", tag: "SaaS Strategy", time: "Feb 28" },
      { title: "SSO explained: A non-technical guide for team leads", tag: "Security", time: "Feb 14" },
    ],
    cta: "Visit the blog →",
  },
  {
    label: "Video Tutorials",
    icon: Video,
    headline: "See NexaCloud in action",
    body: "Short, focused video walkthroughs so your team can learn visually.",
    cards: [
      { title: "NexaCloud full product tour", tag: "Product Tour", time: "2:14" },
      { title: "Setting up your first workspace", tag: "Onboarding", time: "3:42" },
      { title: "Managing clients with sub-accounts", tag: "Agencies", time: "4:08" },
    ],
    cta: "Watch all tutorials →",
  },
];

export function Resources() {
  const [active, setActive] = useState(0);

  return (
    <section id="resources" className="py-24 bg-card/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-primary text-sm font-semibold uppercase tracking-wider mb-3">Learn & Grow</p>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4">
            Everything you need to get the most out of NexaCloud
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            From quick-start guides to deep-dive case studies — we've got you covered at every stage.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {tabs.map((t, i) => (
            <button
              key={t.label}
              onClick={() => setActive(i)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                active === i
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              <t.icon className="h-4 w-4" />
              {t.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-8">
              <h3 className="font-display font-bold text-xl text-foreground mb-2">{tabs[active].headline}</h3>
              <p className="text-muted-foreground text-sm">{tabs[active].body}</p>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {tabs[active].cards.map((card) => (
                <div
                  key={card.title}
                  className="p-5 rounded-xl border border-border bg-card hover:border-primary/30 hover:-translate-y-1 transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-xs font-medium">{card.tag}</span>
                    {card.time && (
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" /> {card.time}
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{card.title}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-6">
              <Button variant="ghost">{tabs[active].cta}</Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

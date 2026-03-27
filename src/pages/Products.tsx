import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/sections/Footer";
import { motion } from "framer-motion";
import { MessageSquare, Video, FileBox, Shield, Users, Zap, BarChart3, Globe, Lock, Workflow, Layers, BrainCircuit, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import featureChat from "@/assets/feature-chat.jpg";
import featureVideo from "@/assets/feature-video.jpg";
import featureVault from "@/assets/feature-vault.jpg";
import featureSecurity from "@/assets/feature-security.jpg";
import featureWorkspace from "@/assets/feature-workspace.jpg";
import featureOnboarding from "@/assets/feature-onboarding.jpg";

const products = [
  {
    icon: MessageSquare,
    title: "NexaChat",
    desc: "Real-time team messaging with channels, threads, reactions, and rich media. Replace Slack with built-in intelligent routing.",
    image: featureChat,
    color: "from-primary/20 to-cyan/10",
  },
  {
    icon: Video,
    title: "NexaMeet",
    desc: "Crystal-clear HD video & voice with recording, live transcription, and AI meeting summaries. No more Zoom tab.",
    image: featureVideo,
    color: "from-cyan/20 to-green/10",
  },
  {
    icon: FileBox,
    title: "NexaVault",
    desc: "1 TB cloud storage with 40+ file previews, granular permissions, version history, and team-wide search.",
    image: featureVault,
    color: "from-violet/20 to-primary/10",
  },
  {
    icon: Shield,
    title: "NexaShield",
    desc: "Enterprise-grade security — SAML SSO, endpoint monitoring, threat alerts, and SOC 2 compliant audit trails.",
    image: featureSecurity,
    color: "from-green/20 to-cyan/10",
  },
  {
    icon: Users,
    title: "NexaSpaces",
    desc: "Multi-workspace management with isolated environments, per-client billing, and centralized admin controls.",
    image: featureWorkspace,
    color: "from-amber/20 to-primary/10",
  },
  {
    icon: Zap,
    title: "NexaIQ",
    desc: "AI-powered engagement scoring, churn prediction, and next-best-action recommendations for your team.",
    image: featureOnboarding,
    color: "from-primary/20 to-violet/10",
  },
];

const capabilities = [
  { icon: BarChart3, title: "Advanced Analytics", desc: "Real-time dashboards and reports" },
  { icon: Globe, title: "Global CDN", desc: "Lightning-fast access worldwide" },
  { icon: Lock, title: "Zero-Trust Security", desc: "Every request verified" },
  { icon: Workflow, title: "Workflow Automation", desc: "If-this-then-that rules engine" },
  { icon: Layers, title: "API-First", desc: "RESTful APIs for everything" },
  { icon: BrainCircuit, title: "AI Copilot", desc: "Smart suggestions everywhere" },
];

const Products = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero */}
      <section className="relative pt-32 pb-20 hero-gradient overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/15 rounded-full blur-3xl animate-pulse-glow" />
          <div className="absolute bottom-1/4 right-1/3 w-72 h-72 bg-violet/15 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "2s" }} />
        </div>
        <div className="container relative z-10 mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary-foreground/80 text-sm mb-6">
              <Layers className="h-4 w-4" /> 13 products, one platform
            </div>
            <h1 className="font-display font-extrabold text-4xl md:text-6xl text-primary-foreground leading-tight max-w-3xl mx-auto mb-6">
              The complete{" "}
              <span className="bg-gradient-to-r from-primary via-cyan to-violet bg-clip-text text-transparent">
                workspace suite
              </span>
            </h1>
            <p className="text-lg text-primary-foreground/60 max-w-2xl mx-auto mb-8">
              Everything your team needs — from chat to cloud storage to security — unified in one intelligent platform.
            </p>
            <Link to="/signup">
              <Button variant="hero-white" size="xl">
                Try all products free <ArrowRight className="ml-1" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Product Cards */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="space-y-32 max-w-6xl mx-auto">
            {products.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7 }}
                className={`grid lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? "lg:direction-rtl" : ""}`}
              >
                <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                    <p.icon className="h-4 w-4" /> {p.title}
                  </div>
                  <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4">{p.title}</h2>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-6">{p.desc}</p>
                  <Link to="/signup">
                    <Button variant="outline" className="group">
                      Learn more <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
                <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                  <motion.div
                    whileHover={{ scale: 1.02, y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className={`rounded-2xl bg-gradient-to-br ${p.color} p-1.5 shadow-2xl shadow-primary/10`}
                  >
                    <div className="rounded-xl overflow-hidden border border-border/30">
                      <img
                        src={p.image}
                        alt={`${p.title} product preview`}
                        loading="lazy"
                        width={1024}
                        height={640}
                        className="w-full h-auto"
                      />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Capabilities */}
      <section className="py-24 bg-card/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className="text-primary text-sm font-semibold uppercase tracking-wider mb-3">And More</p>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4">Built-in capabilities across every product</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {capabilities.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ scale: 1.05, y: -4 }}
                className="p-6 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all cursor-default group"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                  <c.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-1">{c.title}</h3>
                <p className="text-sm text-muted-foreground">{c.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Products;

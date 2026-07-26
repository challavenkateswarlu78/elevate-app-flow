import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const cycles = ["Monthly", "Annual", "Biennial"];
const discounts: Record<string, number> = { Monthly: 1, Annual: 0.85, Biennial: 0.75 };

const plans = [
  {
    name: "Free",
    price: 0,
    desc: "For small teams getting started",
    features: ["Up to 3 users", "1 workspace", "5 GB vault", "Voice calls (30 min)", "Basic chat"],
    cta: "Get started free",
    popular: false,
  },
  {
    name: "Starter",
    price: 35,
    desc: "For growing teams that need more",
    features: ["Up to 25 users", "3 workspaces", "100 GB vault", "Unlimited voice", "Live collaboration", "Auto backup", "Email support (48h SLA)"],
    cta: "Start free trial",
    popular: false,
  },
  {
    name: "Pro",
    price: 89,
    desc: "For teams that want it all",
    features: ["Unlimited users", "Unlimited workspaces", "1 TB vault + versioning", "SSO (SAML 2.0)", "Endpoint security", "CRM integration", "Sub-accounts", "Priority support (4h SLA)"],
    cta: "Start free trial",
    popular: true,
  },
  {
    name: "Enterprise",
    price: -1,
    desc: "For large-scale organizations",
    features: ["Dedicated infrastructure", "Custom SLA (99.99%)", "On-prem or private cloud", "HIPAA/SOC 2/GDPR", "Dedicated CSM", "Security audits"],
    cta: "Talk to sales",
    popular: false,
  },
];

export function Pricing() {
  const [cycle, setCycle] = useState("Monthly");

  return (
    <section id="pricing" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-primary text-sm font-semibold uppercase tracking-wider mb-3">Pricing</p>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4">
            Simple pricing, no surprises
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Start free. Upgrade when you're ready. All plans include a 14-day Pro trial.
          </p>

          {/* Billing toggle */}
          <div className="inline-flex items-center bg-secondary rounded-full p-1">
            {cycles.map((c) => (
              <button
                key={c}
                onClick={() => setCycle(c)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  cycle === c ? "bg-primary text-primary-foreground shadow-md" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {c}
                {c === "Annual" && <span className="ml-1 text-xs opacity-70">-15%</span>}
                {c === "Biennial" && <span className="ml-1 text-xs opacity-70">-25%</span>}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative rounded-2xl border p-6 flex flex-col overflow-hidden ${
                plan.popular
                  ? "border-primary/40 bg-card shadow-xl shadow-primary/20 scale-[1.02]"
                  : "border-border bg-card"
              }`}
            >
              {plan.popular && (
                <>
                  {/* Animated blob backdrop */}
                  <div aria-hidden className="pointer-events-none absolute inset-0 -z-0 overflow-hidden">
                    <div
                      className="absolute -top-16 -left-10 w-56 h-56 rounded-full blur-3xl opacity-40 animate-blob-drift"
                      style={{ background: "radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)" }}
                    />
                    <div
                      className="absolute -bottom-16 -right-10 w-56 h-56 rounded-full blur-3xl opacity-40 animate-blob-drift"
                      style={{
                        background: "radial-gradient(circle, hsl(var(--violet)) 0%, transparent 70%)",
                        animationDelay: "3s",
                      }}
                    />
                  </div>
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full z-10">
                    Most Popular
                  </div>
                </>
              )}
              <div className="relative z-10 flex flex-col flex-1">

              <h3 className="font-display font-bold text-lg text-foreground">{plan.name}</h3>
              <p className="text-sm text-muted-foreground mt-1 mb-4">{plan.desc}</p>
              <div className="mb-6">
                {plan.price === -1 ? (
                  <span className="font-display font-bold text-3xl text-foreground">Custom</span>
                ) : plan.price === 0 ? (
                  <span className="font-display font-bold text-3xl text-foreground">$0</span>
                ) : (
                  <>
                    <span className="font-display font-bold text-3xl text-foreground">
                      ${Math.round(plan.price * discounts[cycle])}
                    </span>
                    <span className="text-muted-foreground text-sm">/mo</span>
                  </>
                )}
              </div>
              <ul className="space-y-2.5 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-foreground">
                    <Check className="h-4 w-4 text-green shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link to="/signup">
                <Button
                  variant={plan.popular ? "hero" : "outline"}
                  className="w-full"
                >
                  {plan.cta} <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
              </div>
            </motion.div>

          ))}
        </div>
      </div>
    </section>
  );
}

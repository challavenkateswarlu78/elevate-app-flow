import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "What happens when my 14-day trial ends?", a: "You'll move to the Free plan automatically — no charge, no card needed. Upgrade anytime." },
  { q: "Can I switch between plans anytime?", a: "Yes. Upgrade or downgrade instantly. Billing is pro-rated to the day." },
  { q: "What payment methods do you accept?", a: "Credit cards (Visa, Mastercard, Amex), bank transfer (automatic), electronic check, and mailed check for annual contracts." },
  { q: "Is my data safe if I cancel?", a: "Yes — 30-day data export window. All data deleted from servers after 60 days." },
  { q: "Do you offer discounts for nonprofits or startups?", a: "Yes — 40% off for verified nonprofits and early-stage startups (under 2 years, under $1M ARR)." },
  { q: "How does SSO setup work?", a: "NexaCloud supports SAML 2.0, Google Workspace, and Microsoft Entra. Setup takes under 15 minutes." },
  { q: "Can I manage multiple client workspaces?", a: "Yes — Pro plan includes Sub-Accounts: up to 10 isolated client workspaces from one dashboard." },
  { q: "What integrations does NexaCloud support?", a: "120+ tools including Salesforce, HubSpot, Google Drive, Slack (import), and more via REST API." },
];

export function FAQ() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-primary text-sm font-semibold uppercase tracking-wider mb-3">Got questions?</p>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4">Everything you might want to know</h2>
          <p className="text-muted-foreground">Can't find your answer? We reply in under 4 hours.</p>
        </motion.div>

        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <AccordionItem value={`faq-${i}`} className="border border-border rounded-xl px-5 bg-card">
                <AccordionTrigger className="font-medium text-foreground text-left hover:no-underline">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

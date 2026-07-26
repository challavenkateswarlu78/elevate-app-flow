import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SpotlightCard } from "@/components/effects/SpotlightCard";
import { MagneticButton } from "@/components/effects/MagneticButton";


const categories: Record<string, string[]> = {
  "All": [],
  "CRM & Sales": ["Salesforce", "HubSpot", "Pipedrive", "Zoho CRM", "Monday.com", "Copper CRM", "Close", "Freshsales"],
  "Marketing": ["Google Ads", "Meta Ads", "Mailchimp", "ActiveCampaign", "Google Analytics", "Semrush", "Ahrefs", "Klaviyo"],
  "Communication": ["Slack", "Microsoft Teams", "Zoom", "Intercom", "Zendesk", "Twilio", "Front", "Loom"],
  "Storage": ["Google Drive", "Dropbox", "OneDrive", "Box", "Notion", "Confluence", "SharePoint", "Airtable"],
  "Finance": ["Stripe", "QuickBooks", "Xero", "Chargebee", "Paddle", "FreshBooks", "Brex", "Ramp"],
  "Security": ["Okta", "Microsoft Entra", "JumpCloud", "1Password", "CrowdStrike", "Jamf", "Vanta", "Snyk"],
  "Dev Tools": ["GitHub", "GitLab", "Jira", "Linear", "PagerDuty", "Datadog", "Sentry", "Vercel"],
  "Productivity": ["Google Workspace", "Microsoft 365", "Asana", "ClickUp", "Trello", "Zapier", "Make", "Calendly"],
};

const allTools = Object.entries(categories)
  .filter(([k]) => k !== "All")
  .flatMap(([_, v]) => v);

export function Integrations() {
  const [active, setActive] = useState("All");
  const tools = active === "All" ? allTools : categories[active];

  return (
    <section id="integrations" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-primary text-sm font-semibold uppercase tracking-wider mb-3">120+ Integrations</p>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4">
            NexaCloud works where your team already works
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-6">
            Connect your entire tool stack in a few clicks. No engineers, no custom code, no maintenance.
          </p>
          <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground">
            <span>120+ native integrations</span>
            <span>•</span>
            <span>Set up in under 5 minutes</span>
            <span>•</span>
            <span>99.9% connector uptime</span>
          </div>
        </motion.div>

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {Object.keys(categories).map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                active === cat
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Tools grid */}
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 max-w-5xl mx-auto"
        >
          {tools.map((tool) => (
            <motion.div
              key={tool}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-2.5 p-3 rounded-xl border border-border bg-card hover:border-primary/30 hover:-translate-y-1 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-xs font-bold text-primary shrink-0">
                {tool[0]}
              </div>
              <span className="text-sm text-foreground truncate">{tool}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA — spotlight card + magnetic button */}
        <div className="max-w-3xl mx-auto mt-14">
          <SpotlightCard className="p-8 md:p-10 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
              <Sparkles className="h-3.5 w-3.5" />
              New integrations monthly
            </div>
            <h3 className="font-display font-bold text-2xl text-foreground mb-2">
              Don't see your tool?
            </h3>
            <p className="text-muted-foreground text-sm mb-6 max-w-md mx-auto">
              Request a native integration or build your own with our REST API. We ship connectors on a rolling basis.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <MagneticButton>
                <Button variant="hero" size="lg">
                  Request an integration <ExternalLink className="ml-1 h-4 w-4" />
                </Button>
              </MagneticButton>
              <MagneticButton strength={0.25}>
                <Button variant="outline" size="lg">
                  View API docs →
                </Button>
              </MagneticButton>
            </div>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
}


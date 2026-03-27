import { motion } from "framer-motion";
import { Star } from "lucide-react";
import avatar1 from "@/assets/avatar-1.jpg";
import avatar2 from "@/assets/avatar-2.jpg";
import avatar3 from "@/assets/avatar-3.jpg";

const testimonials = [
  { quote: "We were on 6 tools and paying $2,200/month. NexaCloud cut that to $89 and now our whole team actually knows where everything is.", name: "Priya M.", role: "Founder", company: "Stackflow Agency", avatar: avatar1 },
  { quote: "The SSO + endpoint security bundle alone justified the switch. IT onboarding went from 2 days to 20 minutes.", name: "James C.", role: "VP Engineering", company: "Meridian Co.", avatar: avatar2 },
  { quote: "Sub-accounts changed how we manage clients. Each one gets their own space, their own files, their own billing.", name: "Sofia R.", role: "Ops Lead", company: "BluePeak Ventures", avatar: avatar3 },
  { quote: "We started on the free plan. Within 3 months the whole team was on Pro — it just became where we work.", name: "Arjun T.", role: "CEO", company: "Orion Health", avatar: avatar2 },
  { quote: "I manage 14 client dashboards from one tab. I didn't think that was possible before NexaCloud.", name: "Marcus L.", role: "Director", company: "Inkwell Agency", avatar: avatar3 },
  { quote: "The engagement score feature told us we were underusing the vault. We turned it on — game changer.", name: "Elena K.", role: "COO", company: "Helix Analytics", avatar: avatar1 },
];

export function Testimonials() {
  return (
    <section className="py-24 bg-card/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-primary text-sm font-semibold uppercase tracking-wider mb-3">Testimonials</p>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4">Don't just take our word for it</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">Thousands of teams switched. Here's what they said.</p>
        </motion.div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 max-w-6xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="break-inside-avoid mb-4 p-6 rounded-2xl border border-border bg-card hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
            >
              <div className="flex gap-0.5 mb-3">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-amber text-amber" />
                ))}
              </div>
              <p className="text-foreground leading-relaxed mb-4 text-sm">"{t.quote}"</p>
              <div className="flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  loading="lazy"
                  width={36}
                  height={36}
                  className="w-9 h-9 rounded-full object-cover ring-2 ring-border"
                />
                <div>
                  <p className="text-sm font-medium text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role} · {t.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

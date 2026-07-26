import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeSwitch } from "@/components/unlumen-ui/theme-switch";
import { Menu, X, ChevronDown, MessageSquare, Video, FileBox, Shield, Users, Zap, BookOpen, FileText, Newspaper, HelpCircle, ArrowRight, Check, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface DropdownItem {
  icon: React.ElementType;
  title: string;
  desc: string;
  href: string;
}

const productItems: DropdownItem[] = [
  { icon: MessageSquare, title: "NexaChat", desc: "Team messaging & threads", href: "/products" },
  { icon: Video, title: "NexaMeet", desc: "HD video & voice calls", href: "/products" },
  { icon: FileBox, title: "NexaVault", desc: "1 TB cloud storage", href: "/products" },
  { icon: Shield, title: "NexaShield", desc: "SSO & endpoint security", href: "/products" },
  { icon: Users, title: "NexaSpaces", desc: "Multi-workspace management", href: "/products" },
  { icon: Zap, title: "NexaIQ", desc: "AI-powered analytics", href: "/products" },
];

const pricingItems: DropdownItem[] = [
  { icon: Sparkles, title: "Free", desc: "Up to 3 users, basic features", href: "/#pricing" },
  { icon: Zap, title: "Starter — $35/mo", desc: "Growing teams, 25 users", href: "/#pricing" },
  { icon: Shield, title: "Pro — $89/mo", desc: "Unlimited, SSO, priority support", href: "/#pricing" },
  { icon: Users, title: "Enterprise", desc: "Custom SLA, dedicated infra", href: "/#pricing" },
];

const resourceItems: DropdownItem[] = [
  { icon: BookOpen, title: "Docs & Guides", desc: "Quick-start tutorials & API ref", href: "/#resources" },
  { icon: FileText, title: "Case Studies", desc: "Real results from real teams", href: "/#resources" },
  { icon: Newspaper, title: "Blog", desc: "Insights for modern teams", href: "/#resources" },
  { icon: HelpCircle, title: "Help Center", desc: "FAQs & support tickets", href: "/#faq" },
];

function MegaMenu({ items, isOpen, onClose, featured }: { items: DropdownItem[]; isOpen: boolean; onClose: () => void; featured?: { title: string; desc: string; href: string } }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    if (isOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 8, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.96 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[540px] rounded-2xl border border-border bg-card/95 backdrop-blur-xl shadow-2xl shadow-primary/10 p-2 z-50"
        >
          {/* Glow accent */}
          <div className="absolute -top-px left-1/2 -translate-x-1/2 w-24 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent" />
          
          <div className="grid grid-cols-2 gap-1">
            {items.map((item) => (
              <Link
                key={item.title}
                to={item.href}
                onClick={onClose}
                className="flex items-start gap-3 p-3 rounded-xl hover:bg-primary/5 transition-all duration-200 group"
              >
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-200">
                  <item.icon className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{item.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                </div>
              </Link>
            ))}
          </div>

          {featured && (
            <div className="mt-1 mx-1 p-3 rounded-xl bg-gradient-to-r from-primary/5 to-accent/5 border border-border/50">
              <Link to={featured.href} onClick={onClose} className="flex items-center justify-between group">
                <div>
                  <p className="text-sm font-medium text-foreground">{featured.title}</p>
                  <p className="text-xs text-muted-foreground">{featured.desc}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </Link>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
  }, [location]);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    setOpenMenu(null);
    if (href.startsWith("/#")) {
      const id = href.slice(2);
      if (isHome) {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      } else {
        window.location.href = href;
      }
    }
  };

  const handleMenuEnter = (menu: string) => {
    clearTimeout(timeoutRef.current);
    setOpenMenu(menu);
  };

  const handleMenuLeave = () => {
    timeoutRef.current = setTimeout(() => setOpenMenu(null), 200);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between h-16 px-4 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center group-hover:shadow-lg group-hover:shadow-primary/30 transition-shadow duration-300">
            <span className="text-primary-foreground font-display font-bold text-sm">N</span>
          </div>
          <span className="font-display font-bold text-lg text-foreground">NexaCloud</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1">
          {/* Products dropdown */}
          <div
            className="relative"
            onMouseEnter={() => handleMenuEnter("products")}
            onMouseLeave={handleMenuLeave}
          >
            <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary/50">
              Products <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${openMenu === "products" ? "rotate-180" : ""}`} />
            </button>
            <MegaMenu
              items={productItems}
              isOpen={openMenu === "products"}
              onClose={() => setOpenMenu(null)}
              featured={{ title: "See all products →", desc: "Explore the complete NexaCloud suite", href: "/products" }}
            />
          </div>

          {/* Features */}
          <button
            onClick={() => handleNavClick("/#features")}
            className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary/50"
          >
            Features
          </button>

          {/* Integrations */}
          <button
            onClick={() => handleNavClick("/#integrations")}
            className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary/50"
          >
            Integrations
          </button>

          {/* Pricing dropdown */}
          <div
            className="relative"
            onMouseEnter={() => handleMenuEnter("pricing")}
            onMouseLeave={handleMenuLeave}
          >
            <button
              onClick={() => handleNavClick("/#pricing")}
              className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary/50"
            >
              Pricing <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${openMenu === "pricing" ? "rotate-180" : ""}`} />
            </button>
            <MegaMenu
              items={pricingItems}
              isOpen={openMenu === "pricing"}
              onClose={() => setOpenMenu(null)}
              featured={{ title: "Compare all plans →", desc: "Find the perfect plan for your team", href: "/#pricing" }}
            />
          </div>

          {/* Resources dropdown */}
          <div
            className="relative"
            onMouseEnter={() => handleMenuEnter("resources")}
            onMouseLeave={handleMenuLeave}
          >
            <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary/50">
              Resources <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${openMenu === "resources" ? "rotate-180" : ""}`} />
            </button>
            <MegaMenu
              items={resourceItems}
              isOpen={openMenu === "resources"}
              onClose={() => setOpenMenu(null)}
            />
          </div>

          {/* Organisation */}
          <Link
            to="/organisation"
            className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary/50"
          >
            Organisation
          </Link>
        </div>

        {/* Right side */}
        <div className="hidden lg:flex items-center gap-3">
          <ThemeSwitch />
          <Link to="/login">
            <Button variant="ghost" size="sm">Log in</Button>
          </Link>
          <Link to="/signup">
            <Button variant="hero" size="sm" className="shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-shadow">Start free →</Button>
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex lg:hidden items-center gap-2">
          <ThemeSwitch />
          <Button variant="ghost" size="icon" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass border-t border-border/50"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
              <Link to="/products" onClick={() => setMobileOpen(false)} className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground text-left rounded-lg hover:bg-secondary/50">Products</Link>
              <button onClick={() => handleNavClick("/#features")} className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground text-left rounded-lg hover:bg-secondary/50">Features</button>
              <button onClick={() => handleNavClick("/#integrations")} className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground text-left rounded-lg hover:bg-secondary/50">Integrations</button>
              <button onClick={() => handleNavClick("/#pricing")} className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground text-left rounded-lg hover:bg-secondary/50">Pricing</button>
              <button onClick={() => handleNavClick("/#resources")} className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground text-left rounded-lg hover:bg-secondary/50">Resources</button>
              <Link to="/organisation" onClick={() => setMobileOpen(false)} className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground text-left rounded-lg hover:bg-secondary/50">Organisation</Link>
              <div className="flex gap-2 mt-2">
                <Link to="/login" className="flex-1">
                  <Button variant="outline" className="w-full" onClick={() => setMobileOpen(false)}>Log in</Button>
                </Link>
                <Link to="/signup" className="flex-1">
                  <Button variant="hero" className="w-full" onClick={() => setMobileOpen(false)}>Start free</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

import { Link } from "react-router-dom";

const columns = [
  {
    title: "Product",
    links: ["Features", "Pricing", "Add-ons", "Integrations", "Changelog", "Status page"],
  },
  {
    title: "Solutions",
    links: ["For Startups", "For Agencies", "For Enterprise", "For Remote Teams", "Security & Compliance"],
  },
  {
    title: "Resources",
    links: ["Documentation", "Blog", "Case Studies", "Video Tutorials", "API Reference", "Community"],
  },
  {
    title: "Company",
    links: ["About NexaCloud", "Careers 🟢", "Press Kit", "Privacy Policy", "Terms of Service", "Cookie Settings"],
  },
];

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Logo column */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-display font-bold text-sm">N</span>
              </div>
              <span className="font-display font-bold text-lg text-foreground">NexaCloud</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              One workspace. Every tool your team needs.
            </p>
            <div className="flex gap-3 mt-4">
              {["LinkedIn", "X", "GitHub", "YouTube"].map((s) => (
                <a key={s} href="#" className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-xs text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-colors">
                  {s[0]}
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="font-display font-semibold text-sm text-foreground mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <p>© 2025 NexaCloud, Inc. All rights reserved.</p>
          <p>Made with ♥ for modern teams</p>
        </div>
      </div>
    </footer>
  );
}

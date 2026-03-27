import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/sections/Footer";
import { motion } from "framer-motion";
import { Building2 } from "lucide-react";

const Organisation = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto text-center py-24"
          >
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Building2 className="h-8 w-8 text-primary" />
            </div>
            <h1 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4">
              Organisation
            </h1>
            <p className="text-muted-foreground text-lg mb-2">
              Manage your teams, workspaces, and billing — all from one place.
            </p>
            <p className="text-muted-foreground text-sm">
              This section is coming soon. Internal navigation routes will be added here.
            </p>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Organisation;

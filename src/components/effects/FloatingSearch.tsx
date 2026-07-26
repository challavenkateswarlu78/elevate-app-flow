import { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export function FloatingSearch() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <motion.div
        layout
        className="flex items-center gap-2 rounded-full bg-card/90 backdrop-blur-md border border-border shadow-2xl shadow-primary/10 pl-1 pr-1 py-1"
      >
        <AnimatePresence initial={false}>
          {open && (
            <motion.input
              ref={inputRef}
              initial={{ width: 0, opacity: 0, paddingLeft: 0, paddingRight: 0 }}
              animate={{ width: 200, opacity: 1, paddingLeft: 20, paddingRight: 8 }}
              exit={{ width: 0, opacity: 0, paddingLeft: 0, paddingRight: 0 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search NexaCloud..."
              className="bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground py-2"
            />
          )}
        </AnimatePresence>
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close search" : "Open search"}
          className="relative w-11 h-11 rounded-full flex items-center justify-center text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/40 active:translate-y-0"
          style={{
            background:
              "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--violet)) 100%)",
          }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.div
                key="x"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <X className="h-5 w-5" />
              </motion.div>
            ) : (
              <motion.div
                key="s"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <Search className="h-5 w-5" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </motion.div>
    </div>
  );
}

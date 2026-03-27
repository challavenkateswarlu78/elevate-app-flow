import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const Signup = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", company: "", teamSize: "", useCase: "", source: "" });
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const update = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }));

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!form.name || !form.email || !form.password) {
      toast.error("Please fill in all fields");
      return;
    }

    if (form.password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    setStep(2);
  };

  const handleStep2Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setLoading(true);
    const { error } = await signUp(form.email, form.password, form.name);
    setLoading(false);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Account created! Please check your email to confirm your account.");
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left trust panel */}
      <div className="hidden lg:flex lg:w-1/2 hero-gradient relative overflow-hidden flex-col items-center justify-center p-12">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-cyan/15 rounded-full blur-3xl animate-pulse-glow" />
          <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-primary/15 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "3s" }} />
        </div>
        <div className="relative z-10 max-w-md">
          <Link to="/" className="flex items-center gap-2 mb-12">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-display font-bold text-lg">N</span>
            </div>
            <span className="font-display font-bold text-2xl text-primary-foreground">NexaCloud</span>
          </Link>
          <div className="space-y-4 mb-12">
            {["Free 14-day Pro trial", "No credit card required", "Set up in under 10 minutes"].map((t) => (
              <div key={t} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-green/20 flex items-center justify-center">
                  <Check className="h-3.5 w-3.5 text-green" />
                </div>
                <span className="text-primary-foreground/80 text-sm">{t}</span>
              </div>
            ))}
          </div>
          <div className="p-6 rounded-2xl bg-primary-foreground/5 border border-primary-foreground/10 backdrop-blur-sm">
            <p className="text-primary-foreground/80 text-sm italic leading-relaxed">
              &quot;We onboarded our entire 40-person team in one afternoon.&quot;
            </p>
            <p className="text-primary-foreground/50 text-xs mt-3">— Sofia R., Ops Lead @ BluePeak Ventures</p>
          </div>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center p-6 bg-background">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-display font-bold text-sm">N</span>
              </div>
              <span className="font-display font-bold text-lg text-foreground">NexaCloud</span>
            </Link>
          </div>

          {/* Step indicator */}
          <div className="flex items-center gap-2 mb-6">
            <div className={`h-1.5 flex-1 rounded-full ${step >= 1 ? "bg-primary" : "bg-secondary"} transition-colors`} />
            <div className={`h-1.5 flex-1 rounded-full ${step >= 2 ? "bg-primary" : "bg-secondary"} transition-colors`} />
          </div>
          <p className="text-xs text-muted-foreground mb-6">Step {step} of 2</p>

          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h1 className="font-display font-bold text-2xl text-foreground mb-2">Start your free workspace</h1>
                <p className="text-muted-foreground text-sm mb-8">14-day Pro trial - No credit card - Cancel anytime</p>
                <form className="space-y-4" onSubmit={handleStep1Submit}>
                  <div className="space-y-2">
                    <Label htmlFor="name">Full name</Label>
                    <Input id="name" placeholder="Jane Doe" value={form.name} onChange={(e) => update("name", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="s-email">Work email</Label>
                    <Input id="s-email" type="email" placeholder="you@company.com" value={form.email} onChange={(e) => update("email", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="s-password">Password</Label>
                    <Input id="s-password" type="password" placeholder="Min 8 characters" value={form.password} onChange={(e) => update("password", e.target.value)} />
                  </div>
                  <Button variant="hero" size="lg" className="w-full" type="submit">
                    Continue <ArrowRight className="ml-1" />
                  </Button>
                </form>
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
                  <div className="relative flex justify-center"><span className="bg-background px-3 text-xs text-muted-foreground">or sign up with</span></div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" size="lg">Google</Button>
                  <Button variant="outline" size="lg">Microsoft</Button>
                </div>
              </motion.div>
            ) : (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h1 className="font-display font-bold text-2xl text-foreground mb-2">Set up your workspace</h1>
                <p className="text-muted-foreground text-sm mb-8">Tell us a bit about your team so we can customize your experience.</p>
                <form className="space-y-4" onSubmit={handleStep2Submit}>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company / Team name</Label>
                    <Input id="company" placeholder="Acme Inc." value={form.company} onChange={(e) => update("company", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Team size</Label>
                    <div className="grid grid-cols-4 gap-2">
                      {["1–5", "6–25", "26–100", "100+"].map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => update("teamSize", s)}
                          className={`py-2 rounded-lg text-sm border transition-all ${
                            form.teamSize === s
                              ? "border-primary bg-primary/10 text-primary font-medium"
                              : "border-border text-muted-foreground hover:border-primary/30"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Primary use case</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {["Agency", "Startup", "Enterprise", "Solo"].map((u) => (
                        <button
                          key={u}
                          type="button"
                          onClick={() => update("useCase", u)}
                          className={`py-2 rounded-lg text-sm border transition-all ${
                            form.useCase === u
                              ? "border-primary bg-primary/10 text-primary font-medium"
                              : "border-border text-muted-foreground hover:border-primary/30"
                          }`}
                        >
                          {u}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-3 pt-2">
                    <Button variant="outline" size="lg" onClick={() => setStep(1)} type="button" disabled={loading}>Back</Button>
                    <Button variant="hero" size="lg" className="flex-1" type="submit" disabled={loading}>
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Creating...
                        </>
                      ) : (
                        <>
                          Create my workspace <ArrowRight className="ml-1" />
                        </>
                      )}
                    </Button>
                  </div>
                </form>
                <p className="text-xs text-muted-foreground text-center mt-6">
                  By continuing, you agree to our Terms of Service and Privacy Policy.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <p className="text-center text-sm text-muted-foreground mt-8">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-medium hover:underline">Sign in</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;

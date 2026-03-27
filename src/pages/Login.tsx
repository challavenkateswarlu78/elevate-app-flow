import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Welcome back!");
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left brand panel */}
      <div className="hidden lg:flex lg:w-1/2 hero-gradient relative overflow-hidden flex-col items-center justify-center p-12">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse-glow" />
          <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-violet/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "2s" }} />
        </div>
        <div className="relative z-10 max-w-md text-center">
          <Link to="/" className="flex items-center gap-2 justify-center mb-12">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-display font-bold text-lg">N</span>
            </div>
            <span className="font-display font-bold text-2xl text-primary-foreground">NexaCloud</span>
          </Link>
          <p className="text-primary-foreground/50 text-sm mb-2">One workspace. Every tool your team needs.</p>
          <div className="mt-16 p-6 rounded-2xl bg-primary-foreground/5 border border-primary-foreground/10 backdrop-blur-sm">
            <p className="text-primary-foreground/80 text-sm italic leading-relaxed">
              &quot;NexaCloud replaced every tool we used. Setup took 20 minutes.&quot;
            </p>
            <p className="text-primary-foreground/50 text-xs mt-3">— James C., VP Engineering @ Meridian Co.</p>
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

          <h1 className="font-display font-bold text-2xl text-foreground mb-2">Welcome back</h1>
          <p className="text-muted-foreground text-sm mb-8">Sign in to your NexaCloud workspace</p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="email">Work email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Checkbox id="remember" />
                <label htmlFor="remember" className="text-sm text-muted-foreground cursor-pointer">Remember me</label>
              </div>
              <a href="#" className="text-sm text-primary hover:underline">Forgot password?</a>
            </div>
            <Button variant="hero" size="lg" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign in <ArrowRight className="ml-1" />
                </>
              )}
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
            <div className="relative flex justify-center"><span className="bg-background px-3 text-xs text-muted-foreground">or continue with</span></div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" size="lg">Google</Button>
            <Button variant="outline" size="lg">Microsoft</Button>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-8">
            {"Don't have an account? "}
            <Link to="/signup" className="text-primary font-medium hover:underline">Start free</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;

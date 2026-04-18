import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bus } from "lucide-react";
import { toast } from "sonner";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      // Get user from localStorage since login just set it
      const stored = localStorage.getItem("btts_user");
      const user = stored ? JSON.parse(stored) : null;
      if (user?.role === "admin") navigate("/admin/dashboard");
      else if (user?.role === "driver") navigate("/driver/dashboard");
      else navigate("/dashboard");
      toast.success("Welcome back!");
    } catch (err: any) {
      const msg = err.response?.data?.detail || err.response?.data?.error || "Invalid credentials";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 relative overflow-hidden">
      <div className="orb orb-primary w-[400px] h-[400px] -top-20 -right-20 animate-float-slow" />
      <div className="orb orb-accent w-[300px] h-[300px] bottom-0 -left-20 animate-float" />
      <div className="w-full max-w-sm relative animate-fade-up">
        <div className="glass-card rounded-3xl p-8">
          <div className="text-center mb-8">
            <div className="w-12 h-12 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Bus className="h-5 w-5 text-primary" />
            </div>
            <h1 className="text-3xl font-serif font-bold text-foreground">Welcome back</h1>
            <p className="text-sm text-muted-foreground mt-2">Sign in to your BusTrack account</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">Email</label>
              <Input type="email" placeholder="you@example.com" className="rounded-xl h-12 bg-background/50 border-border/40" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">Password</label>
              <Input type="password" placeholder="••••••••" className="rounded-xl h-12 bg-background/50 border-border/40" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <Button type="submit" className="w-full rounded-full h-12 mt-2 shadow-elevated hover-lift" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
          <p className="text-center text-sm text-muted-foreground mt-6">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary font-medium hover:underline">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

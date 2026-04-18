import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth, UserRole } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bus } from "lucide-react";
import { toast } from "sonner";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("passenger");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(username, email, password, role);
      if (role === "admin") navigate("/admin/dashboard");
      else if (role === "driver") navigate("/driver/dashboard");
      else navigate("/dashboard");
      toast.success("Account created!");
    } catch (err: any) {
  console.log("REGISTER ERROR:", err.response?.data); // 👈 THIS IS KEY

  const data = err.response?.data;

  const msg =
    data?.detail ||
    data?.role?.[0] ||
    data?.email?.[0] ||
    data?.username?.[0] ||
    data?.password?.[0] ||
    JSON.stringify(data) ||
    "Registration failed";

  toast.error(msg);
}finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 relative overflow-hidden">
      <div className="orb orb-primary w-[400px] h-[400px] -top-20 -left-20 animate-float-slow" />
      <div className="orb orb-accent w-[300px] h-[300px] bottom-0 -right-20 animate-float" />
      <div className="w-full max-w-sm relative animate-fade-up">
        <div className="glass-card rounded-3xl p-8">
          <div className="text-center mb-8">
            <div className="w-12 h-12 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Bus className="h-5 w-5 text-primary" />
            </div>
            <h1 className="text-3xl font-serif font-bold text-foreground">Create account</h1>
            <p className="text-sm text-muted-foreground mt-2">Join BusTrack today</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">Username</label>
              <Input placeholder="Your username" className="rounded-xl h-12 bg-background/50 border-border/40" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">Email</label>
              <Input type="email" placeholder="you@example.com" className="rounded-xl h-12 bg-background/50 border-border/40" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">Password</label>
              <Input type="password" placeholder="••••••••" className="rounded-xl h-12 bg-background/50 border-border/40" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">Role</label>
              <Select value={role} onValueChange={(v) => setRole(v as UserRole)}>
                <SelectTrigger className="rounded-xl h-12 bg-background/50 border-border/40"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="passenger">Passenger</SelectItem>
                  <SelectItem value="driver">Driver</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="w-full rounded-full h-12 mt-2 shadow-elevated hover-lift" disabled={loading}>
              {loading ? "Creating..." : "Create Account"}
            </Button>
          </form>
          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-medium hover:underline">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

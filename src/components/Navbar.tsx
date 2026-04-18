import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Menu, X, Bus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const getLinks = () => {
    if (!user) return [{ to: "/", label: "Home" }, { to: "/trips", label: "Trips" }];
    switch (user.role) {
      case "passenger":
        return [
          { to: "/", label: "Home" },
          { to: "/dashboard", label: "Dashboard" },
          { to: "/trips", label: "Trips" },
          { to: "/my-tickets", label: "Tickets" },
          { to: "/feedback", label: "Feedback" },
        ];
      case "driver":
        return [
          { to: "/driver/dashboard", label: "Dashboard" },
          { to: "/driver/track", label: "Track" },
          { to: "/driver/notifications", label: "Alerts" },
        ];
      case "admin":
        return [
          { to: "/admin/dashboard", label: "Dashboard" },
          { to: "/admin/buses", label: "Buses" },
          { to: "/admin/routes", label: "Routes" },
          { to: "/admin/trips", label: "Trips" },
        ];
    }
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-500 ${scrolled ? "glass shadow-elevated" : "bg-transparent"}`}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center group-hover:shadow-elevated transition-shadow duration-300">
              <Bus className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-serif font-bold text-foreground tracking-tight">BusTrack</span>
          </Link>

          <div className="hidden md:flex items-center gap-1 glass-subtle rounded-full px-1.5 py-1">
            {getLinks().map((link) => (
              <Link key={link.to} to={link.to}
                className={`text-sm px-4 py-1.5 rounded-full transition-all duration-300 ${
                  isActive(link.to) ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                }`}>
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2">
            {isAuthenticated ? (
              <>
                <div className="glass-subtle rounded-full px-4 py-1.5 mr-1">
                  <span className="text-sm text-muted-foreground">{user?.username}</span>
                </div>
                <Button variant="outline" size="sm" className="rounded-full text-xs px-5 hover-lift border-border/50"
                  onClick={() => { logout(); navigate("/"); }}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" className="text-sm rounded-full px-5 hover:bg-secondary/60" onClick={() => navigate("/login")}>Login</Button>
                <Button size="sm" className="rounded-full text-xs px-6 shadow-elevated hover-lift" onClick={() => navigate("/register")}>Get Started</Button>
              </>
            )}
          </div>

          <button className="md:hidden p-2 rounded-xl hover:bg-secondary/60 transition-colors" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden glass mx-4 mb-2 rounded-2xl px-4 pb-4 pt-2 animate-scale-in shadow-elevated-lg">
          {getLinks().map((link) => (
            <Link key={link.to} to={link.to}
              className={`block py-2.5 px-3 text-sm rounded-xl transition-colors ${
                isActive(link.to) ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
              }`}
              onClick={() => setMobileOpen(false)}>
              {link.label}
            </Link>
          ))}
          <div className="pt-2 mt-2 border-t border-border/30">
            {isAuthenticated ? (
              <Button variant="ghost" size="sm" className="w-full justify-start text-sm rounded-xl" onClick={() => { logout(); navigate("/"); setMobileOpen(false); }}>Logout</Button>
            ) : (
              <Button size="sm" className="w-full rounded-full shadow-elevated" onClick={() => { navigate("/login"); setMobileOpen(false); }}>Login</Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

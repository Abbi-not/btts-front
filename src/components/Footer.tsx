import { Link } from "react-router-dom";
import { Bus } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border/40 mt-20 relative">
    <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
          <Bus className="h-3.5 w-3.5 text-primary" />
        </div>
        <span className="text-sm font-serif font-semibold text-foreground">BusTrack</span>
        <span className="text-xs text-muted-foreground ml-2">© 2024</span>
      </div>
      <div className="flex items-center gap-8 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-foreground transition-colors duration-300">Home</Link>
        <Link to="/trips" className="hover:text-foreground transition-colors duration-300">Trips</Link>
        <Link to="/login" className="hover:text-foreground transition-colors duration-300">Login</Link>
      </div>
    </div>
  </footer>
);

export default Footer;

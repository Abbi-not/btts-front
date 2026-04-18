import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Calendar, Search, Bus, Shield, Clock, ArrowRight, Sparkles } from "lucide-react";

const features = [
  { icon: Bus, title: "Live Tracking", desc: "Track your bus in real-time with GPS-powered location updates." },
  { icon: Shield, title: "Secure Booking", desc: "Book tickets safely with our secure payment and confirmation system." },
  { icon: Clock, title: "On-Time Updates", desc: "Get instant notifications about delays, arrivals, and schedule changes." },
  { icon: MapPin, title: "Route Planning", desc: "Find the best routes across Ethiopia with detailed trip information." },
];

const Home = () => {
  const navigate = useNavigate();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");

  return (
    <div className="relative overflow-hidden">
      {/* Background orbs */}
      <div className="orb orb-primary w-[500px] h-[500px] -top-40 -right-40 animate-float-slow" />
      <div className="orb orb-accent w-[400px] h-[400px] top-60 -left-40 animate-float" />
      <div className="orb orb-warm w-[300px] h-[300px] top-[600px] right-20 animate-pulse-soft" />

      {/* Hero */}
      <section className="relative max-w-4xl mx-auto px-6 pt-24 pb-20 text-center">
        <div className="animate-fade-up stagger-1">
          <span className="inline-flex items-center gap-2 text-xs text-muted-foreground mb-6 tracking-widest uppercase glass-subtle rounded-full px-5 py-2">
            <Sparkles className="h-3 w-3 text-primary" />
            Modern Bus Travel
          </span>
        </div>
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-foreground leading-[1.1] tracking-tight animate-fade-up stagger-2">
          Book tickets, track<br />
          buses, and travel{" "}
          <span className="italic bg-gradient-to-r from-[hsl(160,40%,28%)] to-[hsl(160,50%,40%)] bg-clip-text text-transparent">smart.</span>
        </h1>
        <p className="mt-6 text-muted-foreground max-w-lg mx-auto leading-relaxed text-base animate-fade-up stagger-3">
          Experience seamless bus travel across Ethiopia with real-time tracking,
          instant booking, and live updates.
        </p>
        <div className="mt-10 flex justify-center gap-3 animate-fade-up stagger-4">
          <Button
            className="rounded-full px-8 py-5 gap-2 shadow-elevated hover-lift text-sm"
            onClick={() => navigate("/trips")}
          >
            Browse Trips <ArrowRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="rounded-full px-8 py-5 glass-subtle border-border/50 hover-lift text-sm"
            onClick={() => navigate("/register")}
          >
            Get Started
          </Button>
        </div>
      </section>

      {/* Search */}
      <section className="relative max-w-3xl mx-auto px-6 pb-24 animate-fade-up stagger-5">
        <div className="glass-card rounded-3xl p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
            <div>
              <label className="text-[11px] font-semibold text-muted-foreground mb-2 block uppercase tracking-wider">From</label>
              <div className="relative">
                <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Departure city" className="pl-10 rounded-xl h-12 bg-background/50 border-border/40 focus:bg-background transition-colors" value={from} onChange={(e) => setFrom(e.target.value)} />
              </div>
            </div>
            <div>
              <label className="text-[11px] font-semibold text-muted-foreground mb-2 block uppercase tracking-wider">To</label>
              <div className="relative">
                <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Arrival city" className="pl-10 rounded-xl h-12 bg-background/50 border-border/40 focus:bg-background transition-colors" value={to} onChange={(e) => setTo(e.target.value)} />
              </div>
            </div>
            <div>
              <label className="text-[11px] font-semibold text-muted-foreground mb-2 block uppercase tracking-wider">Date</label>
              <div className="relative">
                <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input type="date" className="pl-10 rounded-xl h-12 bg-background/50 border-border/40 focus:bg-background transition-colors" value={date} onChange={(e) => setDate(e.target.value)} />
              </div>
            </div>
          </div>
          <Button className="w-full gap-2 rounded-xl h-12 shadow-elevated hover-lift" onClick={() => navigate("/trips")}>
            <Search className="h-4 w-4" /> Search Buses
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="relative py-24">
        <div className="orb orb-primary w-[350px] h-[350px] -bottom-20 left-1/2 -translate-x-1/2 animate-pulse-soft" />
        <div className="max-w-5xl mx-auto px-6 text-center relative">
          <span className="inline-flex items-center gap-2 text-xs text-muted-foreground mb-4 tracking-widest uppercase glass-subtle rounded-full px-5 py-2">
            Services
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-16 leading-tight">
            Everything you need for<br />seamless <span className="italic">bus travel.</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div key={f.title} className={`glass-card rounded-2xl p-6 text-center hover-lift group animate-fade-up stagger-${i + 1}`}>
                <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors duration-300">
                  <f.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground text-sm mb-2 font-sans">{f.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24">
        <div className="max-w-xl mx-auto px-6 text-center relative">
          <div className="glass-card rounded-3xl p-12">
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Bus className="h-7 w-7 text-primary" />
            </div>
            <h2 className="text-3xl font-serif font-bold text-foreground mb-4">
              Ready to travel?
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Join thousands of travelers across Ethiopia using BusTrack for a modern, reliable bus experience.
            </p>
            <div className="flex justify-center gap-3">
              <Button className="rounded-full px-8 shadow-elevated hover-lift" onClick={() => navigate("/register")}>
                Sign Up Free
              </Button>
              <Button variant="outline" className="rounded-full px-8 border-border/50 hover-lift" onClick={() => navigate("/login")}>
                Login
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

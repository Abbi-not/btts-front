import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Navigation, User, Phone } from "lucide-react";

const TrackBus = () => {
  const [busNumber, setBusNumber] = useState("");
  const [tracking, setTracking] = useState(false);

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 relative">
      <div className="orb orb-primary w-[400px] h-[400px] -top-20 -left-40 animate-pulse-soft" />

      <div className="mb-8 animate-fade-up">
        <span className="inline-flex text-[11px] text-muted-foreground uppercase tracking-widest glass-subtle rounded-full px-4 py-1.5 mb-3">Live</span>
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground">Track Your Bus</h1>
      </div>

      <div className="flex gap-3 mb-8 animate-fade-up stagger-1">
        <Input
          placeholder="Enter bus number"
          className="flex-1 rounded-full h-12 pl-5 glass border-border/40"
          value={busNumber}
          onChange={(e) => setBusNumber(e.target.value)}
        />
        <Button className="rounded-full px-8 h-12 gap-2 shadow-elevated hover-lift" onClick={() => setTracking(true)}>
          <Search className="h-4 w-4" /> Track
        </Button>
      </div>

      {tracking && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-scale-in">
          <div className="lg:col-span-2">
            <div className="glass-card rounded-2xl overflow-hidden">
              <div className="flex justify-between items-center p-5">
                <div>
                  <p className="font-semibold text-foreground">Zemen Bus</p>
                  <p className="text-xs text-muted-foreground font-mono">zm123490</p>
                </div>
                <Badge className="bg-success/15 text-success border-success/20 rounded-full px-3">On Time</Badge>
              </div>
              <div className="w-full h-64 bg-muted/30 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">Map view</p>
                  <p className="text-xs text-muted-foreground">Leaflet integration available</p>
                </div>
              </div>
              <div className="flex justify-between items-center p-5 border-t border-border/30">
                <div>
                  <p className="font-semibold text-foreground text-sm">AA</p>
                  <p className="text-xs text-muted-foreground">06:00AM</p>
                </div>
                <div className="flex-1 mx-6">
                  <div className="h-1.5 bg-muted/50 rounded-full relative overflow-hidden">
                    <div className="h-1.5 bg-primary rounded-full w-1/4 transition-all duration-1000" />
                  </div>
                  <p className="text-xs text-muted-foreground text-center mt-1.5">25% complete</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-foreground text-sm">Hawassa</p>
                  <p className="text-xs text-muted-foreground">12:00PM</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="glass-card rounded-2xl p-5">
              <p className="text-[11px] text-muted-foreground uppercase tracking-wider mb-4 font-semibold">Journey</p>
              <div className="space-y-4">
                {[
                  { icon: Navigation, label: "Estimated Arrival", val: "5hrs" },
                  { icon: MapPin, label: "Current Location", val: "Shashemene" },
                  { icon: Navigation, label: "Route", val: "AA → Hawassa" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <div>
                      <p className="text-[11px] text-muted-foreground">{item.label}</p>
                      <p className="text-sm font-medium text-foreground">{item.val}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card rounded-2xl p-5">
              <p className="text-[11px] text-muted-foreground uppercase tracking-wider mb-4 font-semibold">Driver</p>
              <div className="space-y-4">
                {[
                  { icon: User, label: "Name", val: "Abera Z." },
                  { icon: Phone, label: "Contact", val: "+251989978987" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <div>
                      <p className="text-[11px] text-muted-foreground">{item.label}</p>
                      <p className="text-sm font-medium text-foreground">{item.val}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackBus;

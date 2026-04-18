import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { CalendarCheck, MapPin, Clock, Bell, Users } from "lucide-react";
import { tripService, Trip } from "@/services/tripService";
import { toast } from "sonner";

const DriverDashboard = () => {
  const { user } = useAuth();
  const [tab, setTab] = useState<"active" | "all" | "notifications">("active");
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    tripService.driverList()
      .then(setTrips)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const activeTrips = trips.filter(t => t.status === "active" || t.status === "Active");

  const stats = [
    { label: "Scheduled", value: trips.filter(t => t.status === "scheduled" || t.status === "Scheduled").length, icon: CalendarCheck, color: "bg-primary/10 text-primary" },
    { label: "Active", value: activeTrips.length, icon: MapPin, color: "bg-success/10 text-success" },
    { label: "Completed", value: trips.filter(t => t.status === "completed" || t.status === "Completed").length, icon: Clock, color: "bg-accent text-accent-foreground" },
    { label: "Total", value: trips.length, icon: Bell, color: "bg-warning/10 text-warning" },
  ];

  const handleCompleteTrip = async (tripId: number) => {
    try {
      await tripService.driverUpdate(tripId, { status: "completed" });
      setTrips(prev => prev.map(t => t.id === tripId ? { ...t, status: "completed" } : t));
      toast.success("Trip completed!");
    } catch {
      toast.error("Failed to update trip");
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 relative">
      <div className="orb orb-primary w-[350px] h-[350px] -top-20 -right-40 animate-pulse-soft" />

      <div className="mb-10 animate-fade-up">
        <span className="inline-flex text-[11px] text-muted-foreground uppercase tracking-widest glass-subtle rounded-full px-4 py-1.5 mb-3">Driver</span>
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground">Welcome back, {user?.username}</h1>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map((s, i) => (
          <div key={s.label} className={`glass-card rounded-2xl p-5 text-center hover-lift animate-fade-up stagger-${i + 1}`}>
            <div className={`w-11 h-11 mx-auto mb-3 rounded-xl ${s.color} flex items-center justify-center`}>
              <s.icon className="h-5 w-5" />
            </div>
            <p className="text-2xl font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-2 mb-6">
        {(["active", "all", "notifications"] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`text-xs uppercase tracking-wider px-5 py-2 rounded-full transition-all duration-300 ${
              tab === t ? "bg-primary text-primary-foreground shadow-elevated" : "glass-subtle text-muted-foreground hover:text-foreground"
            }`}>
            {t === "active" ? "Active" : t === "all" ? "All Trips" : "Alerts"}
          </button>
        ))}
      </div>

      {tab === "active" && (
        <div className="space-y-4 animate-scale-in">
          {loading && <p className="text-muted-foreground text-sm py-8 text-center">Loading...</p>}
          {!loading && activeTrips.length === 0 && <p className="text-muted-foreground text-sm py-8 text-center">No active trips.</p>}
          {activeTrips.map((trip) => (
            <div key={trip.id} className="glass-card rounded-2xl p-6">
              <div className="mb-1">
                <h2 className="text-xl font-serif font-semibold text-foreground">
                  {trip.route_detail?.origin ?? ""} → {trip.route_detail?.destination ?? ""}
                </h2>
                <p className="text-xs text-muted-foreground font-mono">Trip ID: {trip.id}</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm my-4">
                {[
                  { icon: CalendarCheck, val: trip.departure_time ? new Date(trip.departure_time).toLocaleDateString() : "" },
                  { icon: Clock, val: trip.departure_time ? new Date(trip.departure_time).toLocaleTimeString() : "" },
                  { icon: Users, val: trip.bus_detail?.plate_number ?? `Bus ${trip.bus}` },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-muted-foreground glass-subtle rounded-xl px-3 py-2">
                    <item.icon className="h-4 w-4 text-primary" /> {item.val}
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <Button className="rounded-full px-6 shadow-elevated hover-lift" onClick={() => handleCompleteTrip(trip.id)}>Complete Trip</Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "all" && (
        <div className="space-y-3 animate-scale-in">
          {loading && <p className="text-muted-foreground text-sm py-8 text-center">Loading...</p>}
          {!loading && trips.length === 0 && <p className="text-muted-foreground text-sm py-8 text-center">No trips.</p>}
          {trips?.map((trip) => (
            <div key={trip.id} className="glass-card rounded-2xl p-5 hover-lift">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-foreground">{trip.route_detail?.origin ?? ""} → {trip.route_detail?.destination ?? ""}</p>
                  <p className="text-sm text-muted-foreground mt-0.5">{trip.bus_detail?.plate_number ?? `Bus ${trip.bus}`}</p>
                </div>
                <span className="text-[11px] px-3 py-1 rounded-full bg-primary/10 text-primary font-medium capitalize">{trip.status ?? "scheduled"}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">{trip.departure_time ? new Date(trip.departure_time).toLocaleString() : ""}</p>
            </div>
          ))}
        </div>
      )}

      {tab === "notifications" && (
        <div className="glass-card rounded-2xl p-8 text-muted-foreground text-sm text-center animate-scale-in">
          No new notifications.
        </div>
      )}
    </div>
  );
};

export default DriverDashboard;

import { useAuth } from "@/contexts/AuthContext";
import { CalendarCheck, CheckCircle, XCircle, Calendar } from "lucide-react";
import { useState, useEffect } from "react";
import { ticketService, Ticket } from "@/services/ticketService";

const Dashboard = () => {
  const { user } = useAuth();
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ticketService.list()
      .then(setTickets)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const now = new Date();
  const upcoming = tickets.filter(t => {
    const dep = t.trip_detail?.departure_time;
    return dep ? new Date(dep) >= now : true;
  });
  const past = tickets.filter(t => {
    const dep = t.trip_detail?.departure_time;
    return dep ? new Date(dep) < now : false;
  });
  const filtered = tab === "upcoming" ? upcoming : past;

  const stats = [
    { label: "Upcoming", value: upcoming.length, icon: CalendarCheck, color: "bg-primary/10 text-primary" },
    { label: "Completed", value: past.length, icon: CheckCircle, color: "bg-success/10 text-success" },
    { label: "Cancelled", value: 0, icon: XCircle, color: "bg-destructive/10 text-destructive" },
    { label: "Total", value: tickets.length, icon: Calendar, color: "bg-accent text-accent-foreground" },
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 relative">
      <div className="orb orb-primary w-[300px] h-[300px] -top-20 -right-40 animate-pulse-soft" />

      <div className="mb-10 animate-fade-up">
        <span className="inline-flex text-[11px] text-muted-foreground uppercase tracking-widest glass-subtle rounded-full px-4 py-1.5 mb-3">Dashboard</span>
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
        {(["upcoming", "past"] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`text-xs uppercase tracking-wider px-5 py-2 rounded-full transition-all duration-300 ${
              tab === t ? "bg-primary text-primary-foreground shadow-elevated" : "glass-subtle text-muted-foreground hover:text-foreground"
            }`}>
            {t === "upcoming" ? "Upcoming" : "Past"}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {loading && <p className="text-muted-foreground text-sm py-8 text-center">Loading...</p>}
        {!loading && filtered.length === 0 && <p className="text-muted-foreground text-sm py-8 text-center">No trips found.</p>}
        {filtered.map((ticket) => (
          <div key={ticket.id} className="glass-card rounded-2xl p-5 hover-lift">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold text-foreground">
                  {ticket.trip_detail?.route_detail?.origin ?? "—"} → {ticket.trip_detail?.route_detail?.destination ?? "—"}
                </p>
                <p className="text-sm text-muted-foreground mt-0.5">Seat {ticket.seat_number}</p>
              </div>
              <span className="text-[11px] px-3 py-1 rounded-full bg-primary/10 text-primary font-medium capitalize">
                {ticket.status ?? "confirmed"}
              </span>
            </div>
            <div className="flex gap-4 mt-3 text-xs text-muted-foreground">
              <span>{ticket.trip_detail?.departure_time ? new Date(ticket.trip_detail.departure_time).toLocaleDateString() : ""}</span>
              <span>{ticket.trip_detail?.bus_detail?.plate_number}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

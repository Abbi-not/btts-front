import { Bus, Route, MapPin, Users } from "lucide-react";

const stats = [
  { label: "Total Buses", value: 24, icon: Bus, color: "bg-primary/10 text-primary" },
  { label: "Active Routes", value: 12, icon: Route, color: "bg-success/10 text-success" },
  { label: "Active Trips", value: 8, icon: MapPin, color: "bg-accent text-accent-foreground" },
  { label: "Total Users", value: 1250, icon: Users, color: "bg-warning/10 text-warning" },
];

const AdminDashboard = () => (
  <div className="max-w-5xl mx-auto px-6 py-12 relative">
    <div className="orb orb-primary w-[350px] h-[350px] -top-20 -right-40 animate-pulse-soft" />

    <div className="mb-10 animate-fade-up">
      <span className="inline-flex text-[11px] text-muted-foreground uppercase tracking-widest glass-subtle rounded-full px-4 py-1.5 mb-3">Admin</span>
      <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground">Dashboard</h1>
    </div>

    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
      {stats.map((s, i) => (
        <div key={s.label} className={`glass-card rounded-2xl p-6 text-center hover-lift animate-fade-up stagger-${i + 1}`}>
          <div className={`w-12 h-12 mx-auto mb-4 rounded-2xl ${s.color} flex items-center justify-center`}>
            <s.icon className="h-5 w-5" />
          </div>
          <p className="text-3xl font-bold text-foreground">{s.value}</p>
          <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
        </div>
      ))}
    </div>

    <div className="glass-card rounded-2xl p-8 text-center animate-fade-up stagger-5">
      <p className="text-muted-foreground">Manage buses, routes, and trips from the navigation above.</p>
    </div>
  </div>
);

export default AdminDashboard;

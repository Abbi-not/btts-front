import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, X, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { busService, Bus } from "@/services/busService";

const ManageBuses = () => {
  const [buses, setBuses] = useState<Bus[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [plate, setPlate] = useState("");
  const [capacity, setCapacity] = useState("");

  const fetchBuses = () => {
    busService.adminList()
      .then(setBuses)
      .catch(() => toast.error("Failed to load buses"))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchBuses(); }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await busService.adminCreate({ plate_number: plate, capacity: Number(capacity) });
      toast.success("Bus added!");
      setShowForm(false);
      setPlate("");
      setCapacity("");
      fetchBuses();
    } catch (err: any) {
      toast.error(err.response?.data?.detail || "Failed to add bus");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await busService.adminDelete(id);
      toast.success("Bus removed");
      setBuses(prev => prev.filter(b => b.id !== id));
    } catch {
      toast.error("Failed to delete bus");
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 relative">
      <div className="orb orb-accent w-[300px] h-[300px] -top-20 -left-40 animate-pulse-soft" />

      <div className="flex justify-between items-center mb-8 animate-fade-up">
        <div>
          <span className="inline-flex text-[11px] text-muted-foreground uppercase tracking-widest glass-subtle rounded-full px-4 py-1.5 mb-3">Admin</span>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground">Manage Buses</h1>
        </div>
        <Button className="rounded-full gap-2 px-6 shadow-elevated hover-lift" onClick={() => setShowForm(!showForm)}>
          {showForm ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          {showForm ? "Cancel" : "Add Bus"}
        </Button>
      </div>

      {showForm && (
        <div className="glass-card rounded-2xl p-6 mb-8 animate-scale-in">
          <h2 className="text-lg font-serif font-semibold text-foreground mb-4">New Bus</h2>
          <form className="grid grid-cols-1 sm:grid-cols-2 gap-4" onSubmit={handleCreate}>
            <Input placeholder="Plate Number" className="rounded-xl h-12 bg-background/50 border-border/40" value={plate} onChange={e => setPlate(e.target.value)} required />
            <Input placeholder="Capacity" type="number" className="rounded-xl h-12 bg-background/50 border-border/40" value={capacity} onChange={e => setCapacity(e.target.value)} required />
            <div className="sm:col-span-2">
              <Button type="submit" className="rounded-full px-8 shadow-elevated hover-lift">Save</Button>
            </div>
          </form>
        </div>
      )}

      <div className="glass-card rounded-2xl overflow-hidden animate-fade-up stagger-1">
        {loading ? (
          <p className="text-muted-foreground text-sm py-8 text-center">Loading...</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="border-border/30 hover:bg-transparent">
                <TableHead className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">ID</TableHead>
                <TableHead className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">Plate</TableHead>
                <TableHead className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">Capacity</TableHead>
                <TableHead className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {buses.map((b) => (
                <TableRow key={b.id} className="border-border/20 hover:bg-secondary/30 transition-colors">
                  <TableCell className="text-muted-foreground">{b.id}</TableCell>
                  <TableCell className="font-medium text-foreground font-mono text-sm">{b.plate_number}</TableCell>
                  <TableCell className="text-muted-foreground">{b.capacity}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive" onClick={() => handleDelete(b.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default ManageBuses;

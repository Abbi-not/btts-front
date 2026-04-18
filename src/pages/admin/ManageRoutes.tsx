import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, X, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { routeService, BusRoute } from "@/services/routeService";

const ManageRoutes = () => {
  const [routes, setRoutes] = useState<BusRoute[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");

  const fetchRoutes = () => {
    setLoading(true);
    routeService
      .adminList()
      .then(setRoutes)
      .catch((err) => {
        toast.error(
          JSON.stringify(err.response?.data, null, 2) || "Failed to load routes"
        );
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchRoutes();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await routeService.adminCreate({
        origin,
        destination,
        distance: 0, // ✅ REQUIRED BY BACKEND
      });

      toast.success("Route added!");

      setShowForm(false);
      setOrigin("");
      setDestination("");

      fetchRoutes();
    } catch (err: any) {
      toast.error(
        JSON.stringify(err.response?.data, null, 2) ||
          err.message ||
          "Failed to add route"
      );
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await routeService.adminDelete(id);
      toast.success("Route removed");
      setRoutes((prev) => prev.filter((r) => r.id !== id));
    } catch (err: any) {
      toast.error(
        JSON.stringify(err.response?.data, null, 2) ||
          "Failed to delete route"
      );
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 relative">
      <div className="orb orb-primary w-[300px] h-[300px] -top-20 -right-40 animate-pulse-soft" />

      <div className="flex justify-between items-center mb-8 animate-fade-up">
        <div>
          <span className="inline-flex text-[11px] text-muted-foreground uppercase tracking-widest glass-subtle rounded-full px-4 py-1.5 mb-3">
            Admin
          </span>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
            Manage Routes
          </h1>
        </div>

        <Button
          className="rounded-full gap-2 px-6 shadow-elevated hover-lift"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          {showForm ? "Cancel" : "Add Route"}
        </Button>
      </div>

      {showForm && (
        <div className="glass-card rounded-2xl p-6 mb-8 animate-scale-in">
          <h2 className="text-lg font-serif font-semibold text-foreground mb-4">
            New Route
          </h2>

          <form
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            onSubmit={handleCreate}
          >
            <Input
              placeholder="Origin"
              className="rounded-xl h-12 bg-background/50 border-border/40"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              required
            />

            <Input
              placeholder="Destination"
              className="rounded-xl h-12 bg-background/50 border-border/40"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              required
            />

            <div className="sm:col-span-2">
              <Button
                type="submit"
                className="rounded-full px-8 shadow-elevated hover-lift"
              >
                Save
              </Button>
            </div>
          </form>
        </div>
      )}

      <div className="glass-card rounded-2xl overflow-hidden animate-fade-up stagger-1">
        {loading ? (
          <p className="text-muted-foreground text-sm py-8 text-center">
            Loading...
          </p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="border-border/30 hover:bg-transparent">
                <TableHead className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
                  ID
                </TableHead>
                <TableHead className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
                  Origin
                </TableHead>
                <TableHead className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
                  Destination
                </TableHead>
                <TableHead className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {routes.map((r) => (
                <TableRow
                  key={r.id}
                  className="border-border/20 hover:bg-secondary/30 transition-colors"
                >
                  <TableCell className="text-muted-foreground">
                    {r.id}
                  </TableCell>
                  <TableCell className="font-medium text-foreground">
                    {r.origin}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {r.destination}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive hover:text-destructive"
                      onClick={() => handleDelete(r.id)}
                    >
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

export default ManageRoutes;
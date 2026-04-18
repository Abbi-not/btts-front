import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, X, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { tripService, Trip } from "@/services/tripService";
import { busService, Bus } from "@/services/busService";
import { routeService, BusRoute } from "@/services/routeService";
import api from "@/lib/api";

interface Driver {
  id: string;
  email: string;
}

const ManageTrips = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [buses, setBuses] = useState<Bus[]>([]);
  const [routes, setRoutes] = useState<BusRoute[]>([]);
  const [drivers, setDrivers] = useState<Driver[]>([]);

  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const [busId, setBusId] = useState("");
  const [routeId, setRouteId] = useState("");
  const [driverId, setDriverId] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [tripsData, busesData, routesData, driversRes] =
        await Promise.all([
          tripService.adminList(),
          busService.adminList(),
          routeService.adminList(),
          api.get("/auth/users/?role=DRIVER"), // must exist in backend
        ]);

      setTrips(tripsData);
      setBuses(busesData);
      setRoutes(routesData);
      setDrivers(driversRes.data);
    } catch (err: any) {
      toast.error(JSON.stringify(err.response?.data, null, 2));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await tripService.adminCreate({
        bus: busId,
        route: routeId,
        driver: driverId,
        departure_time: departureTime,
        arrival_time: arrivalTime, 
      });

      toast.success("Trip added!");

      setShowForm(false);
      setBusId("");
      setRouteId("");
      setDriverId("");
      setDepartureTime("");
      setArrivalTime("");

      fetchAll();
    } catch (err: any) {
      toast.error(
        JSON.stringify(err.response?.data, null, 2) ||
          err.message ||
          "Failed to add trip"
      );
    }
  };

  const handleDelete = async (id: any) => {
    try {
      await tripService.adminDelete(id);
      toast.success("Trip removed");
      setTrips((prev) => prev.filter((t) => t.id !== id));
    } catch (err: any) {
      toast.error(JSON.stringify(err.response?.data, null, 2));
    }
  };

  const statusStyle = (status: string) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "bg-success/10 text-success border-success/20";
      case "scheduled":
        return "bg-primary/10 text-primary border-primary/20";
      default:
        return "bg-muted text-muted-foreground border-border/20";
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 relative">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Trips</h1>

        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cancel" : "Add Trip"}
        </Button>
      </div>

      {showForm && (
        <div className="p-6 mb-8 border rounded-xl">
          <form onSubmit={handleCreate} className="grid gap-4">

            {/* BUS (plate shown, id used) */}
            <select
              value={busId}
              onChange={(e) => setBusId(e.target.value)}
              required
            >
              <option value="">Select Bus</option>
              {buses.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.plate_number}
                </option>
              ))}
            </select>

            {/* ROUTE */}
            <select
              value={routeId}
              onChange={(e) => setRouteId(e.target.value)}
              required
            >
              <option value="">Select Route</option>
              {routes.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.origin} → {r.destination}
                </option>
              ))}
            </select>

            {/* DRIVER (email shown, id used) */}
            <select
              value={driverId}
              onChange={(e) => setDriverId(e.target.value)}
              required
            >
              <option value="">Select Driver</option>
              {drivers.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.email}
                </option>
              ))}
            </select>

            {/* TIME */}
            <input
              type="datetime-local"
              value={departureTime}
              onChange={(e) => setDepartureTime(e.target.value)}
              required
            />

            <input
               type="datetime-local"
                value={arrivalTime}
                onChange={(e) => setArrivalTime(e.target.value)}
                required
            />

            <Button type="submit">Save</Button>
          </form>
        </div>
      )}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Route</TableHead>
              <TableHead>Bus</TableHead>
              <TableHead>Driver</TableHead>
              <TableHead>Departure</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {trips.map((t) => (
              <TableRow key={t.id}>
                <TableCell>
                  {t.route_detail
                    ? `${t.route_detail.origin} → ${t.route_detail.destination}`
                    : t.route}
                </TableCell>

                <TableCell>
                  {t.bus_detail?.plate_number || t.bus}
                </TableCell>

                <TableCell>
                  {/* fallback if backend doesn't expand */}
                  {t.driver}
                </TableCell>

                <TableCell>
                  {new Date(t.departure_time).toLocaleString()}
                </TableCell>

                <TableCell>
                  <Badge className={statusStyle(t.status ?? "")}>
                    {t.status ?? "scheduled"}
                  </Badge>
                </TableCell>

                <TableCell>
                  <Button onClick={() => handleDelete(t.id)}>
                    <Trash2 />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default ManageTrips;
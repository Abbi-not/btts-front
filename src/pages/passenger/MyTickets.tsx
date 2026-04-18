import { useEffect, useState } from "react";
import { ticketService, Ticket } from "@/services/ticketService";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const MyTickets = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTickets = () => {
    setLoading(true);

    ticketService
      .list()
      .then((data) => {
        console.log("TICKETS DATA:", data); // 🔥 DEBUG
        setTickets(data);
      })
      .catch(() => toast.error("Failed to load tickets"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const cancelTicket = async (id: string) => {
    try {
      await ticketService.cancel(id);
      toast.success("Ticket cancelled");

      // remove or refresh
      setTickets((prev) => prev.filter((t) => t.id !== id));
    } catch (err: any) {
      console.log("CANCEL ERROR:", err.response?.data);
      toast.error("Failed to cancel");
    }
  };

  if (loading) {
    return <p className="text-center py-10">Loading...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">My Tickets</h1>

      {tickets.length === 0 && <p>No tickets booked.</p>}

      <div className="space-y-4">
        {tickets.map((t) => (
          <div
            key={t.id}
            className="p-4 border rounded-lg flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">
                {t.route_label ?? "Route unavailable"}
              </p>

              <p className="text-sm text-muted-foreground">
                {t.bus_plate_number ?? "Bus"} · Seat {t.seat_number ?? "-"}
              </p>

              <p className="text-xs text-muted-foreground">
                {t.departure_time
                  ? new Date(t.departure_time).toLocaleString()
                  : "No time"}
              </p>
            </div>

            <Button
              variant="destructive"
              onClick={() => cancelTicket(t.id)}
            >
              Cancel
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyTickets;
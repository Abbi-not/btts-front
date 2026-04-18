import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { tripService, Trip } from "@/services/tripService";
import { ticketService } from "@/services/ticketService";
import { seatService, Seat } from "@/services/seatService";

const Booking = () => {
  const { tripId } = useParams();
  const navigate = useNavigate();

  const [trip, setTrip] = useState<Trip | null>(null);
  const [seats, setSeats] = useState<Seat[]>([]);
  const [selectedSeatId, setSelectedSeatId] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);

  useEffect(() => {
    if (!tripId) return;

    setLoading(true);

    tripService
      .passengerGet(tripId)
      .then((tripData) => {
        setTrip(tripData);

        // 🔥 load seats for this bus
        return seatService.listByBus(tripData.bus);
      })
      .then(setSeats)
      .catch((err) => {
        console.log(err);
        toast.error("Failed to load trip or seats");
      })
      .finally(() => setLoading(false));
  }, [tripId]);

  const handleBook = async () => {
    if (!tripId || !selectedSeatId) {
      toast.error("Select a seat");
      return;
    }

    setBooking(true);

    try {
      await ticketService.create({
        trip_id: tripId,
        seat_id: selectedSeatId,
      });

      toast.success("Ticket booked successfully");
      navigate("/my-tickets");
    } catch (err: any) {
      console.log("BOOKING ERROR:", err.response?.data);

      toast.error(
        JSON.stringify(err.response?.data, null, 2) ||
          "Booking failed"
      );
    } finally {
      setBooking(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-muted-foreground">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold mb-4">Select Seat</h1>

      <p className="text-sm text-muted-foreground mb-6">
        {trip?.route_label} · {trip?.bus_plate_number}
      </p>

      {/* Seats Grid */}
      <div className="grid grid-cols-4 gap-2 mb-6">
        {seats.map((seat) => {
          const isSelected = selectedSeatId === seat.id;

          return (
            <button
              key={seat.id}
              onClick={() => setSelectedSeatId(seat.id)}
              className={`h-12 rounded-lg text-sm font-medium transition ${
                isSelected
                  ? "bg-primary text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {seat.seat_number}
            </button>
          );
        })}
      </div>

      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          {selectedSeatId ? "Seat selected" : "No seat selected"}
        </p>

        <Button onClick={handleBook} disabled={booking}>
          {booking ? "Booking..." : "Confirm Booking"}
        </Button>
      </div>
    </div>
  );
};

export default Booking;
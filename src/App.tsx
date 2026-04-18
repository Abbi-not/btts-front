import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import MainLayout from "@/layouts/MainLayout";
import ProtectedRoute from "@/components/ProtectedRoute";

import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import NotFound from "@/pages/NotFound";

import Dashboard from "@/pages/passenger/Dashboard";
import Trips from "@/pages/passenger/Trips";
import Booking from "@/pages/passenger/Booking";
import MyTickets from "@/pages/passenger/MyTickets";
import TrackBus from "@/pages/passenger/TrackBus";
import Feedback from "@/pages/passenger/Feedback";

import DriverDashboard from "@/pages/driver/DriverDashboard";

import AdminDashboard from "@/pages/admin/AdminDashboard";
import ManageBuses from "@/pages/admin/ManageBuses";
import ManageRoutes from "@/pages/admin/ManageRoutes";
import ManageTrips from "@/pages/admin/ManageTrips";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Passenger */}
              <Route path="/dashboard" element={<ProtectedRoute roles={["passenger"]}><Dashboard /></ProtectedRoute>} />
              <Route path="/trips" element={<Trips />} />
              <Route path="/booking/:tripId" element={<ProtectedRoute roles={["passenger"]}><Booking /></ProtectedRoute>} />
              <Route path="/my-tickets" element={<ProtectedRoute roles={["passenger"]}><MyTickets /></ProtectedRoute>} />
              <Route path="/tracking/:tripId" element={<ProtectedRoute roles={["passenger"]}><TrackBus /></ProtectedRoute>} />
              <Route path="/feedback" element={<ProtectedRoute roles={["passenger"]}><Feedback /></ProtectedRoute>} />

              {/* Driver */}
              <Route path="/driver/dashboard" element={<ProtectedRoute roles={["driver"]}><DriverDashboard /></ProtectedRoute>} />
              <Route path="/driver/track" element={<ProtectedRoute roles={["driver"]}><TrackBus /></ProtectedRoute>} />
              <Route path="/driver/notifications" element={<ProtectedRoute roles={["driver"]}><DriverDashboard /></ProtectedRoute>} />

              {/* Admin */}
              <Route path="/admin/dashboard" element={<ProtectedRoute roles={["admin"]}><AdminDashboard /></ProtectedRoute>} />
              <Route path="/admin/buses" element={<ProtectedRoute roles={["admin"]}><ManageBuses /></ProtectedRoute>} />
              <Route path="/admin/routes" element={<ProtectedRoute roles={["admin"]}><ManageRoutes /></ProtectedRoute>} />
              <Route path="/admin/trips" element={<ProtectedRoute roles={["admin"]}><ManageTrips /></ProtectedRoute>} />

              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

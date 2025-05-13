import { getAllBookings } from "@/actions/admin";
import DashboardClient from "./client";

export default async function AdminDashboard() {
  const bookings = await getAllBookings();
  
  return <DashboardClient initialBookings={bookings} />;
} 
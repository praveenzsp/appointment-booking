import { getAllBookings } from "@/actions/admin";
import DashboardClient from "./client";

// Make this page dynamic to prevent build-time database access
export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const bookings = await getAllBookings();
  
  return <DashboardClient initialBookings={bookings} />;
} 
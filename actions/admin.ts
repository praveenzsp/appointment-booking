'use server'
import { prisma } from "@/lib/prisma";

export type Booking = {
  id: number;
  name: string;
  email: string;
  mobileNumber: string;
  address: string;
  date: string;
  time: string;
  timezone: string;
  createdAt: string;
};

export async function getAllBookings(): Promise<Booking[]> {
  try {
    const bookings = await prisma.booking.findMany({
      orderBy: {
        date: 'desc',
      },
    });

    // Convert Date objects to strings
    return bookings.map(booking => ({
      ...booking,
      date: booking.date.toISOString(),
      createdAt: booking.createdAt.toISOString(),
    }));
  } catch (error) {
    console.error('Error fetching bookings:', error);
    throw new Error('Failed to fetch bookings');
  }
} 
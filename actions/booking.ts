'use server'
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { BookingError } from "@/lib/errors";

// Define validation schema
const bookingSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  mobileNumber: z.string().min(10, "Mobile number must be at least 10 digits"),
  address: z.string().min(1, "Address is required"),
  date: z.date(),
  time: z.string(),
  timezone: z.string(),
});

type Booking = z.infer<typeof bookingSchema>;

export const createBooking = async (booking: Booking) => {
  try {
    // Validate the booking data
    const validatedData = bookingSchema.parse(booking);

    // Check if there's already a booking at the same date and time
    const existingBooking = await prisma.booking.findFirst({
      where: {
        date: validatedData.date,
        time: validatedData.time,
      },
    });

    if (existingBooking) {
      throw new BookingError(
        'A booking already exists for this date and time',
        'VALIDATION_ERROR'
      );
    }

    // Create the booking
    const newBooking = await prisma.booking.create({
      data: validatedData,
    });

    return { success: true, data: newBooking };
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new BookingError(
        `Validation failed: ${error.errors.map(e => e.message).join(', ')}`,
        'VALIDATION_ERROR'
      );
    }

    if (error instanceof BookingError) {
      throw error;
    }

    // Handle Prisma errors
    if (error instanceof Error) {
      throw new BookingError(
        `Database error: ${error.message}`,
        'DATABASE_ERROR'
      );
    }

    // Handle unknown errors
    throw new BookingError(
      'An unexpected error occurred while creating the booking',
      'UNKNOWN_ERROR'
    );
  }
};

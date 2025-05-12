export class BookingError extends Error {
  constructor(
    message: string,
    public code: 'VALIDATION_ERROR' | 'DATABASE_ERROR' | 'UNKNOWN_ERROR'
  ) {
    super(message);
    this.name = 'BookingError';
  }
} 
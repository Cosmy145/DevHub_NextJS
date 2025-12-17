/**
 * Database Models Index
 * Central export point for all Mongoose models
 * Import models from here to ensure consistency across the application
 */

export { default as Event } from "./event.model";
export { default as Booking } from "./booking.model";

// Export types for TypeScript usage
export type { IEvent } from "./event.model";
export type { IBooking } from "./booking.model";

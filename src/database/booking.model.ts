import mongoose, { Schema, Model, Document } from "mongoose";
import Event from "./event.model";

/**
 * TypeScript interface for Booking document
 * Extends Document to include Mongoose document properties
 */
export interface IBooking extends Document {
  eventId: mongoose.Types.ObjectId;
  slug: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Booking Schema Definition
 * Includes email validation, event reference, and automatic timestamps
 */
const BookingSchema = new Schema<IBooking>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: [true, "Event ID is required"],
      index: true, // Index for faster queries on eventId
    },
    slug: {
      type: String,
      required: [true, "Event slug is required"],
      index: true,
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      validate: {
        validator: function (v: string) {
          // RFC 5322 compliant email validation regex
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: "Please provide a valid email address",
      },
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt
  }
);

/**
 * Pre-save hook to validate event existence
 * Ensures the referenced event exists in the database before creating a booking
 */
BookingSchema.pre("save", async function () {
  // Only validate eventId if it's modified or document is new
  if (this.isModified("eventId") || this.isNew) {
    // Check if the referenced event exists
    const eventExists = await Event.findById(this.eventId);

    if (!eventExists) {
      throw new Error(
        `Event with ID ${this.eventId} does not exist. Cannot create booking for non-existent event.`
      );
    }
  }
});

/**
 * Compound index for efficient queries on eventId and email combination
 * Useful for checking if a user has already booked a specific event
 */
BookingSchema.index({ eventId: 1, email: 1 });

/**
 * Prevent model recompilation in development
 * Use existing model if already compiled, otherwise create new one
 */
const Booking: Model<IBooking> =
  mongoose.models.Booking || mongoose.model<IBooking>("Booking", BookingSchema);

export default Booking;

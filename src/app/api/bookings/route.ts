import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { Booking } from "@/database";

/**
 * GET /api/bookings
 * Fetch all bookings or filter by eventId
 */
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const eventId = searchParams.get("eventId");
    const email = searchParams.get("email");

    // Build query filter
    const filter: Record<string, unknown> = {};
    if (eventId) filter.eventId = eventId;
    if (email) filter.email = email;

    const bookings = await Booking.find(filter)
      .populate("eventId", "title slug date time location")
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch bookings",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/bookings
 * Create a new booking
 */
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { eventId, email } = body;

    // Validate required fields
    if (!eventId || !email) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields",
          message: "eventId and email are required",
        },
        { status: 400 }
      );
    }

    // Check if booking already exists
    const existingBooking = await Booking.findOne({ eventId, email });
    if (existingBooking) {
      return NextResponse.json(
        {
          success: false,
          error: "Booking already exists",
          message: "You have already booked this event",
        },
        { status: 409 }
      );
    }

    // Create booking (event existence will be validated by pre-save hook)
    const booking = await Booking.create({ eventId, email });

    // Populate event details in response
    await booking.populate("eventId", "title slug date time location");

    return NextResponse.json(
      {
        success: true,
        message: "Booking created successfully",
        data: booking,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating booking:", error);

    // Handle validation errors
    if (error instanceof Error && error.name === "ValidationError") {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          message: error.message,
        },
        { status: 400 }
      );
    }

    // Handle event not found error (from pre-save hook)
    if (error instanceof Error && error.message.includes("does not exist")) {
      return NextResponse.json(
        {
          success: false,
          error: "Event not found",
          message: error.message,
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: "Booking creation failed",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

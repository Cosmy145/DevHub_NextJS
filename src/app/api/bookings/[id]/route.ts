import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { Booking } from "@/database";

/**
 * GET /api/bookings/[id]
 * Fetch a single booking by ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;
    const booking = await Booking.findById(id).populate(
      "eventId",
      "title slug date time location venue mode"
    );

    if (!booking) {
      return NextResponse.json(
        {
          success: false,
          error: "Booking not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: booking,
    });
  } catch (error) {
    console.error("Error fetching booking:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch booking",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/bookings/[id]
 * Cancel a booking by ID
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;
    const booking = await Booking.findByIdAndDelete(id);

    if (!booking) {
      return NextResponse.json(
        {
          success: false,
          error: "Booking not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Booking cancelled successfully",
      data: booking,
    });
  } catch (error) {
    console.error("Error deleting booking:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to cancel booking",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

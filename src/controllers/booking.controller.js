import { StatusCodes } from "http-status-codes";
import { createBooking as createBookingService } from "../services/index.js";
import {
  error as ErrorResponse,
  success as SuccessResponse,
} from "../utils/index.js";

/**
 * POST /api/v1/bookings
 */
export async function createBooking(req, res) {
  try {
    const booking = await createBookingService({
      flightId: req.body.flightId,
      userId: req.body.userId,
      noOfSeats: req.body.noOfSeats,
    });

    SuccessResponse.data = booking;
    SuccessResponse.message = "Booking created successfully";

    // prettier-ignore
    return res
      .status(StatusCodes.CREATED)
      .json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    ErrorResponse.message = "Something went wrong while creating booking";

    // prettier-ignore
    return res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ErrorResponse);
  }
}

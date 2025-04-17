import { StatusCodes } from "http-status-codes";
import {
  createBooking as createBookingService,
  makePayment as makePaymentService,
} from "../services/index.js";
import {
  error as ErrorResponse,
  success as SuccessResponse,
} from "../utils/index.js";
import booking from "../models/booking.js";

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

export async function makePayment(req, res) {
  try {
    const booking = await makePaymentService({
      userId: req.body.userId,
      totalCost: req.body.totalCost,
      bookingId: req.body.bookingId,
    });

    SuccessResponse.data = booking;
    SuccessResponse.message = "Payment made successfully";

    // prettier-ignore
    return res
      .status(StatusCodes.CREATED)
      .json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    ErrorResponse.message = "Something went wrong while making payment";

    // prettier-ignore
    return res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ErrorResponse);
  }
}

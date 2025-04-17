import axios from "axios";
import db from "../models/index.js";
import { AppError } from "../utils/index.js";
import { StatusCodes } from "http-status-codes";
import { FLIGHT_SERVICE } from "../config/index.js";
import { BookingRepository } from "../repositories/index.js";
import { BOOKING_STATUS } from "../utils/index.js";

const bookingRepository = new BookingRepository();

export async function createBooking(data) {
  const transaction = await db.sequelize.transaction();

  try {
    const flight = await axios.get(
      `${FLIGHT_SERVICE}/api/v1/flights/${data.flightId}`
    );

    if (data.noOfSeats > flight.data.data.totalSeats) {
      throw new AppError("Not enough seats available", StatusCodes.BAD_REQUEST);
    }

    const totalCost = flight.data.data.price * data.noOfSeats;

    const bookingPayload = { ...data, totalCost };
    const booking = await bookingRepository.createBooking(
      bookingPayload,
      transaction
    );

    await axios.patch(
      `${FLIGHT_SERVICE}/api/v1/flights/${data.flightId}/seats`,
      {
        seats: data.noOfSeats,
      }
    );

    await transaction.commit();
    return booking;
  } catch (error) {
    console.log(error);
    await transaction.rollback();
    throw error;
  }
}

export async function makePayment(data) {
  const transaction = await db.sequelize.transaction();

  try {
    const bookingDetails = await bookingRepository.get(
      data.bookingId,
      transaction
    );
    if (bookingDetails.totalCost !== data.totalCost) {
      throw new AppError("Amount mismatch", StatusCodes.BAD_REQUEST);
    }

    if (bookingDetails.userId !== data.userId) {
      throw new AppError(
        "User corresponding to booking does not match",
        StatusCodes.UNAUTHORIZED
      );
    }

    console.log("createdAt ", bookingDetails.createdAt);
    const currentTime = new Date();

    if (bookingDetails.status === BOOKING_STATUS.CANCELLED) {
      throw new AppError("Booking has been cancelled", StatusCodes.BAD_REQUEST);
    }

    if (currentTime - bookingDetails.createdAt > 20 * 60 * 1000) {
      await bookingRepository.update(
        data.bookingId,
        { status: BOOKING_STATUS.CANCELLED },
        transaction
      );
      throw new AppError(
        "Booking expired. Please create a new booking",
        StatusCodes.BAD_REQUEST
      );
    }

    // we assume here payment is successful
    const booking = await bookingRepository.update(
      data.bookingId,
      { status: BOOKING_STATUS.BOOKED },
      transaction
    );
    await transaction.commit();
    return booking;
  } catch (error) {
    await transaction.rollback();
    console.log(error);
    throw error;
  }
}

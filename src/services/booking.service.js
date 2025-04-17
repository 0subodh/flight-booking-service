import axios from "axios";
import db from "../models/index.js";
import { AppError } from "../utils/index.js";
import { StatusCodes } from "http-status-codes";
import { FLIGHT_SERVICE } from "../config/index.js";
import { BookingRepository } from "../repositories/index.js";

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

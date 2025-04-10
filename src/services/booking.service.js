import axios from "axios";
import db from "../models/index.js";
import { BookingRepository } from "../repositories/index.js";
const bookingRepository = new BookingRepository();

import { AppError } from "../utils/index.js";
import { StatusCodes } from "http-status-codes";
import { FLIGHT_SERVICE } from "../config/index.js";

export async function createBooking(data) {
  return new Promise((resolve, reject) => {
    const result = db.sequelize.transaction(async function bookingImple(t) {
      const flight = await axios.get(
        `${FLIGHT_SERVICE}/api/v1/flights/${data.flightId}`
      );
      if (data.noOfSeats > flight.data.data.totalSeats) {
        reject(
          new AppError(
            "Requested number of seats is not available",
            StatusCodes.BAD_REQUEST
          )
        );
      }
      resolve(true);
    });
  });
}

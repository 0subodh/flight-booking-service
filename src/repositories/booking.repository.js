import { CrudRepository } from "./crud.repository.js";
import db from "../models/index.js";

export class BookingRepository extends CrudRepository {
  constructor() {
    super(db.Booking);
  }

  async createBooking(data, transaction) {
    const response = await db.Booking.create(data, {
      transaction,
    });
    return response;
  }
}

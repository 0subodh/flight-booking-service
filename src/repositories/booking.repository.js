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

  async get(data, transaction) {
    const response = await this.model.findByPk(data, { transaction });
    if (!response) {
      throw new AppError("Not able to found a resource", StatusCodes.NOT_FOUND);
    }
    return response;
  }

  async update(id, data, transaction) {
    const response = await this.model.update(data, {
      where: {
        id: id,
      },
      transaction,
    });
    if (response[0] === 0) {
      throw new AppError("Not able to found a resource", StatusCodes.NOT_FOUND);
    }
    return response;
  }
}

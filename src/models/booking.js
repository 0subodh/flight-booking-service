"use strict";
import { Model, DataTypes } from "sequelize";
import { BOOKING_STATUS } from "../utils/index.js";

const { BOOKED, CANCELLED, INITIATED, PENDING } = BOOKING_STATUS;

export default (sequelize) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Booking.init(
    {
      flightId: { type: DataTypes.INTEGER, allowNull: false },
      userId: { type: DataTypes.INTEGER, allowNull: false },
      status: {
        type: DataTypes.ENUM,
        values: [BOOKED, CANCELLED, INITIATED, PENDING],
        defaultValue: INITIATED,
        allowNull: false,
      },
      noOfSeats: { type: DataTypes.INTEGER, allowNull: false },
      totalCost: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: "Booking",
    }
  );
  return Booking;
};

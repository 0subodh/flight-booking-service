import { Sequelize } from "sequelize";
import BookingModel from "./booking.js";

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: "mysql",
    host: "localhost",
  }
);

const Booking = BookingModel(sequelize); // Initialize the model

// CALL the function to initialize the model

const db = {
  sequelize,
  Sequelize,
  // Export Actual Model
  Booking,
};

Object.keys(db).forEach((modelName) => {
  const model = db[modelName];
  if (model.associate) {
    model.associate(db);
  }
});

export default db;

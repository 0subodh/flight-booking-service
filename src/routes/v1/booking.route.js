import express from "express";
import { createBooking } from "../../controllers/booking.controller.js";
import { makePayment } from "../../controllers/booking.controller.js";

const router = express.Router();

// POST /api/v1/bookings
router.post("/", createBooking);

router.post("/payments", makePayment);

export default router;

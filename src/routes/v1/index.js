import express from "express";
import bookingRoutes from "./booking.route.js";
import { info } from "../../controllers/index.js";

const router = express.Router();

router.use("/bookings", bookingRoutes);
router.get("/info", info);

export default router;

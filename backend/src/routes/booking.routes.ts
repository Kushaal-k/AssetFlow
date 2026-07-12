import { Router } from "express";
import {
    createBooking,
    fetchBookings,
    cancelBooking
} from "../controllers/booking.controller.js";

const router = Router();

router.get('/', fetchBookings);
router.post('/', createBooking);
router.post('/:id/cancel', cancelBooking);

export default router;

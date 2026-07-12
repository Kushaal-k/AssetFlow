import type { Request, Response } from "express";
import {
    createBookingService,
    fetchBookingsService,
    cancelBookingService
} from "../services/booking.service.js";
import type { ICreateBookingInput, IFetchBookingsQuery } from "../types/types.js";

const createBooking = async (req: Request, res: Response) => {
    try {
        const { assetId, bookedById, startTime, endTime } = req.body;

        if (!assetId || !bookedById || !startTime || !endTime) {
            return res.status(400).json({ error: "Missing required fields: assetId, bookedById, startTime, endTime" });
        }

        const input: ICreateBookingInput = {
            assetId,
            bookedById,
            startTime,
            endTime
        };

        const booking = await createBookingService(input);
        return res.status(201).json(booking);
    } catch (error) {
        console.error("Error creating booking:", error);
        if (error instanceof Error) {
            if (error.message.includes("not found")) {
                return res.status(404).json({ error: error.message });
            }
            if (error.message.includes("already booked") || error.message.includes("not available")) {
                return res.status(409).json({ error: error.message });
            }
            if (error.message.includes("format") || error.message.includes("before")) {
                return res.status(400).json({ error: error.message });
            }
        }
        return res.status(500).json({ error: "Internal server error" });
    }
};

const fetchBookings = async (req: Request, res: Response) => {
    try {
        const { assetId, startDate, endDate } = req.query;

        const query: IFetchBookingsQuery = {};
        if (assetId) query.assetId = assetId as string;
        if (startDate) query.startDate = startDate as string;
        if (endDate) query.endDate = endDate as string;

        const bookings = await fetchBookingsService(query);
        return res.status(200).json(bookings);
    } catch (error) {
        console.error("Error fetching bookings:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

const cancelBooking = async (req: Request, res: Response) => {
    try {
        const bookingId = req.params.id as string;

        const result = await cancelBookingService(bookingId);
        return res.status(200).json(result);
    } catch (error) {
        console.error("Error cancelling booking:", error);
        if (error instanceof Error) {
            if (error.message.includes("not found")) {
                return res.status(404).json({ error: error.message });
            }
            if (error.message.includes("already") || error.message.includes("Cannot cancel")) {
                return res.status(409).json({ error: error.message });
            }
        }
        return res.status(500).json({ error: "Internal server error" });
    }
};

export {
    createBooking,
    fetchBookings,
    cancelBooking
};

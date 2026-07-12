import prisma from "../lib/prisma.js";
import type { ICreateBookingInput, IFetchBookingsQuery } from "../types/types.js";

const createBookingService = async (input: ICreateBookingInput) => {
    return await prisma.$transaction(async (tx) => {
        // 1. Check if asset exists and is bookable
        const asset = await tx.asset.findUnique({
            where: { id: input.assetId }
        });

        if (!asset) {
            throw new Error("Asset not found");
        }

        if (!asset.isBookable) {
            throw new Error("Asset is not available for booking");
        }

        const start = new Date(input.startTime);
        const end = new Date(input.endTime);

        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            throw new Error("Invalid start or end time format");
        }

        if (start >= end) {
            throw new Error("Start time must be before end time");
        }

        // 2. Overlap Validation
        // A booking overlaps if: (ExistingStart < NewEnd) AND (ExistingEnd > NewStart)
        const overlappingBookings = await tx.booking.findMany({
            where: {
                assetId: input.assetId,
                status: {
                    in: ['UPCOMING', 'ONGOING']
                },
                startTime: {
                    lt: end
                },
                endTime: {
                    gt: start
                }
            }
        });

        if (overlappingBookings.length > 0) {
            throw new Error("Time slot is already booked for this asset");
        }

        // 3. Create booking
        const booking = await tx.booking.create({
            data: {
                assetId: input.assetId,
                bookedById: input.bookedById,
                startTime: start,
                endTime: end,
                status: 'UPCOMING'
            }
        });

        return booking;
    });
};

const fetchBookingsService = async (query: IFetchBookingsQuery) => {
    const whereClause: any = {};
    
    if (query.assetId) {
        whereClause.assetId = query.assetId;
    }

    if (query.startDate || query.endDate) {
        whereClause.startTime = {};
        if (query.startDate) {
            whereClause.startTime.gte = new Date(query.startDate);
        }
        if (query.endDate) {
            whereClause.startTime.lte = new Date(query.endDate);
        }
    }

    return await prisma.booking.findMany({
        where: whereClause,
        include: {
            asset: { select: { id: true, name: true, tag: true } },
            bookedBy: { select: { id: true, name: true, email: true } }
        },
        orderBy: { startTime: 'asc' }
    });
};

const cancelBookingService = async (bookingId: string) => {
    const booking = await prisma.booking.findUnique({
        where: { id: bookingId }
    });

    if (!booking) {
        throw new Error("Booking not found");
    }

    if (booking.status === 'CANCELLED') {
        throw new Error("Booking is already cancelled");
    }

    if (booking.status === 'COMPLETED') {
        throw new Error("Cannot cancel a completed booking");
    }

    return await prisma.booking.update({
        where: { id: bookingId },
        data: { status: 'CANCELLED' }
    });
};

export {
    createBookingService,
    fetchBookingsService,
    cancelBookingService
};

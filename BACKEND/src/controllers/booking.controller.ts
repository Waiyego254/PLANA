import { Request, Response } from 'express';
import { BookingService } from '../services/booking.service';

const bookingService = new BookingService();

export class BookingController {
    async bookEvent(req: Request, res: Response) {
        try {
            const { user_id, event_id } = req.body;
            const result = await bookingService.bookEvent({
                user_id,
                event_id,
                booking_id: '',
                booking_date: new Date()
            });
            return res.status(201).json(result);
        } catch (error) {
            return res.status(500).json({ error: 'Error booking event' });
        }
    }

    async getAllBookings(req: Request, res: Response) {
        try {
            const result = await bookingService.getAllBookings();
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({ error: 'Error fetching bookings' });
        }
    }

    async getBookingsByUser(req: Request, res: Response) {
        try {
            const { user_id } = req.params;
            const result = await bookingService.getBookingsByUser(user_id);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({ error: 'Error fetching user bookings' });
        }
    }

    async getBookingsByEvent(req: Request, res: Response) {
        try {
            const { event_id } = req.params;
            const result = await bookingService.getBookingsByEvent(event_id);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({ error: 'Error fetching event bookings' });
        }
    }

    async cancelBooking(req: Request, res: Response) {
        try {
            const { booking_id } = req.params;
            const result = await bookingService.cancelBooking(booking_id);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({ error: 'Error cancelling booking' });
        }
    }

    async getTotalRevenue(req: Request, res: Response) {
        try {
            let result = await bookingService.getTotalRevenue();
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({ error: 'Error fetching total revenue' });
        }
    }
    
}

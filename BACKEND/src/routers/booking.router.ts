import { Router } from "express";
import { BookingController } from "../controllers/booking.controller";

const booking_router = Router();
const controller = new BookingController();

booking_router.post('/createBooking', controller.bookEvent);
booking_router.get('/getAllBookings', controller.getAllBookings);
booking_router.get('/users/:user_id', controller.getBookingsByUser);
booking_router.get('/events/:event_id', controller.getBookingsByEvent);
booking_router.delete('/cancelBooking/:booking_id', controller.cancelBooking);
booking_router.get('/book/revenue', controller.getTotalRevenue);

export default booking_router;
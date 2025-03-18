import { BookingDetails } from "./bookingdetails";

export interface events {
    event_id: string;
    title: string;
    event_title: string;
    description: string;
    date: string;
    location: string;
    ticket_type: string;
    price: number;
    image: string;
    total_tickets: number;
    available_tickets: number;
    isApproved: boolean;
    bookings: BookingDetails[];
}

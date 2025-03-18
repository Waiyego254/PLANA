export interface booking {
    booking_id: string;
    user_id: string;
    event_id: string;
    booking_date: Date;
}

export interface EventBookings {
    event_id: string;
    event_title: string;
    ticket_type: string;
    isApproved: boolean;
    bookings: Booking[];
}

export interface Booking {
    booking_id: string;
    user_id: string;
    username: string;
    booking_date: Date;
    
}

export interface bookingEvent{
    booking_id: string;
    event_title: string;
    booking_date: Date;
}
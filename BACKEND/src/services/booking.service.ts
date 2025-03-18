import mssql from 'mssql';
import { v4 } from 'uuid';
import { sqlconfig } from '../config/sql.config';
import { booking, EventBookings } from '../models/booking.interface';

import lodash from 'lodash';

export class BookingService {
    async bookEvent(booking: booking) {
        try {
            let pool = await mssql.connect(sqlconfig);
            let booking_id = v4();
    
            // Check available tickets
            let availableTicketsResult = await pool.request()
                .input('event_id', mssql.VarChar, booking.event_id)
                .query(`SELECT available_tickets FROM Events WHERE event_id = @event_id`);
    
            if (availableTicketsResult.recordset[0].available_tickets > 0) {
                // Proceed with booking
                let result = await pool.request()
                    .input('booking_id', mssql.VarChar, booking_id)
                    .input('user_id', mssql.VarChar, booking.user_id)
                    .input('event_id', mssql.VarChar, booking.event_id)
                    .execute('bookEvent');
    
                return { message: 'Booking created successfully', ticket: result.recordset[0] };
            } else {
                return { error: 'Event is fully booked' };
            }
        } catch (error) {
            console.error('SQL error', error);
            throw error;
        }
    }
    

    async getAllBookings(): Promise<{ events: EventBookings[] }> {
        try {
            let pool = await mssql.connect(sqlconfig);
            let result = await pool.request().query(`
                SELECT 
                    b.booking_id, 
                    b.user_id, 
                    u.username, 
                    b.event_id, 
                    e.title as event_title,
                    e.ticket_type as ticket_type,
                    e.isApproved as isApproved, 
                    b.booking_date
                FROM 
                    Bookings b
                JOIN 
                    Users u ON b.user_id = u.user_id
                JOIN 
                    Events e ON b.event_id = e.event_id;
            `);

            let bookings = result.recordset;

            // Group bookings by event_id
            const groupedBookings: { [key: string]: EventBookings } = bookings.reduce((events: { [key: string]: EventBookings }, booking: any) => {
                const eventId = booking.event_id;

                if (!events[eventId]) {
                    // Initialize the event entry if it doesn't exist
                    events[eventId] = {
                        event_id: booking.event_id,
                        event_title: booking.event_title,
                        ticket_type: booking.ticket_type,
                        isApproved: booking.isApproved,
                        bookings: []  // Create an empty array to hold bookings for this event
                    };
                }

                // Add the booking to the corresponding event
                events[eventId].bookings.push({
                    booking_id: booking.booking_id,
                    user_id: booking.user_id,
                    username: booking.username,
                    booking_date: booking.booking_date
                });

                return events;
            }, {});

            // Convert the object of events into an array
            const resultArray: EventBookings[] = Object.values(groupedBookings);

            return {
                events: resultArray
            };
        } catch (error) {
            console.error('SQL error', error);
            throw error;
        }
    }

    async getBookingsByUser(user_id: string) {
        try {
            let pool = await mssql.connect(sqlconfig);
            let result = (await pool.request()
                .input('user_id', mssql.VarChar, user_id)
                .query(`
                    SELECT 
                        b.booking_id, 
                        b.user_id, 
                        u.username, 
                        b.event_id, 
                        e.title as event_title,
                        e.ticket_type as ticket_type,
                        e.isApproved as isApproved, 
                        b.booking_date 
                    FROM 
                        Bookings b
                    JOIN 
                        Users u ON b.user_id = u.user_id
                    JOIN 
                        Events e ON b.event_id = e.event_id
                    WHERE 
                        b.user_id = @user_id
                `)
            ).recordset;

            if (result.length > 0) {
                return {
                    bookingsByUser: result
                };
            } else {
                return {
                    error: 'No bookings found for this user'
                };
            }
        } catch (error) {
            console.error('SQL error', error);
            throw error;
        }
    }

    async getBookingsByEvent(event_id: string) {
        try {
            let pool = await mssql.connect(sqlconfig);
            let result = (await pool.request()
                .input('event_id', mssql.VarChar, event_id)
                .query(`
                    SELECT 
                        b.booking_id, 
                        b.user_id, 
                        u.username, 
                        b.event_id, 
                        e.title as event_title,
                        e.isApproved as isApproved, 
                        b.booking_date 
                    FROM 
                        Bookings b
                    JOIN 
                        Users u ON b.user_id = u.user_id
                    JOIN 
                        Events e ON b.event_id = e.event_id
                    WHERE 
                        b.event_id = @event_id
                `)
            ).recordset;

            if (!lodash.isEmpty(result)) {
                return {
                    bookingsByEvent: result
                };
            } else {
                return {
                    error: 'No bookings found for this event'
                };
            }
        } catch (error) {
            console.error('SQL error', error);
            throw error;
        }
    }

    async cancelBooking(booking_id: string) {
        try {
            let pool = await mssql.connect(sqlconfig);
            let result = (await pool.request()
                .input('booking_id', mssql.VarChar, booking_id)
                .execute('cancelBooking')).rowsAffected

            if (result[0] === 0) {
                return {
                    error: 'Booking not found'
                };
            } else {
                return {
                    message: 'Booking canceled successfully'
                };
            }
        } catch (error) {
            console.error('SQL error', error);
            throw error;
        }
    }

    async getTotalRevenue() {
        try {
            let pool = await mssql.connect(sqlconfig);
            let result = await pool.request().execute('getTotalRevenue');
            return { totalRevenue: result.recordset[0].totalRevenue };
        } catch (error) {
            console.error('SQL error', error);
            throw error;
        }
    }
}

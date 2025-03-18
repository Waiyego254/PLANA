import mssql from 'mssql';
import { v4 as uuidv4 } from 'uuid';
import { Event } from '../models/event.interface';
import { sqlconfig } from '../config/sql.config';

export class EventService {
    async createEvent(event: Event) {
        let pool = await mssql.connect(sqlconfig);
        let eventId = uuidv4();
    
        let result = await (await pool.request()
            .input('event_id', eventId)
            .input('title', mssql.VarChar, event.title)
            .input('description', mssql.VarChar, event.description)
            .input('date', mssql.DateTime, event.date)
            .input('location', mssql.VarChar, event.location)
            .input('ticket_type', mssql.VarChar, event.ticket_type)
            .input('price', mssql.Float, event.price)
            .input('image', mssql.VarChar, event.image)
            .input('total_tickets', mssql.Int, event.total_tickets)
            .input('available_tickets', mssql.Int, event.total_tickets)
            .execute('createEvent')).rowsAffected;

            console.log("database result:", result);
            console.log("total tickets:", event.total_tickets);
            
            
    
        if (result[0] == 1) {
            return { message: 'Event created successfully' };
        } else {
            return { message: 'Error creating event' };
        }
    }
    

    async viewAllEvents() {
        let pool = await mssql.connect(sqlconfig);
        let result = (await pool.query(`SELECT * FROM Events`)).recordset;

        console.log("database result:", result);
        
        if (result.length == 0) {
            return {
                message: 'No events found'
            };
        } else {
            return {
                events: result
            };
        }
    }

    async viewSingleEvent(event_id: string) {
        let pool = await mssql.connect(sqlconfig);
        let event = (await pool.request().input('event_id', mssql.VarChar, event_id).query(`SELECT * FROM Events WHERE event_id = @event_id`)).recordset;

        if (event.length === 0) {
            return {
                error: "Event not found"
            };
        } else {
            return {
                event: event[0]
            };
        }
    }

    async updateEvent(event: Event) {
        let pool = await mssql.connect(sqlconfig);

        let eventExists = (await pool.request().query(`SELECT * FROM Events WHERE event_id = '${event.event_id}'`)).recordset;

        if (eventExists.length === 0) {
            return {
                error: 'Event not found'
            };
        } else {
            let result = (await pool.request()
                .input('event_id', event.event_id)
                .input('title', event.title)
                .input('description', event.description)
                .input('date', event.date)
                .input('location', event.location)
                .input('ticket_type', event.ticket_type)
                .input('price', event.price)
                .input('image', event.image)
                .input('total_tickets', event.total_tickets)
                .input('available_tickets', event.total_tickets)
                .execute('updateEvent')).rowsAffected;

            if (result[0] < 1) {
                return {
                    error: "Unable to update event details"
                };
            } else {
                return {
                    message: "Event details updated successfully"
                };
            }
        }
    }

    async approveEvent(event_id: string) {
        try {
            let pool = await mssql.connect(sqlconfig);
            await pool.request()
                .input('event_id', mssql.VarChar, event_id)
                .execute('approveEvent');
    
            return { message: 'Event approved successfully' };
        } catch (error) {
            console.error('SQL error', error);
            throw error;
        }
    }
    

    async deleteEvent(event_id: string) {
        try {
            let pool = await mssql.connect(sqlconfig);
            let eventExists = (await pool.request()
                .input('event_id', mssql.VarChar, event_id)
                .query(`SELECT * FROM Events WHERE event_id = @event_id`)).recordset;

            if (eventExists.length === 0) {
                return {
                    error: 'Event not found'
                };
            }

            await pool.request()
                .input('event_id', mssql.VarChar, event_id)
                .execute('deleteEvent');

            return {
                message: 'Event deleted successfully'
            };
        } catch (error) {
            console.error('SQL error', error);
            throw error;
        }
    }

    async getNumberOfEvents() {
        try {
            let pool = await mssql.connect(sqlconfig);
            let result = await pool.request().execute('getNumberOfEvents');
            return { numberOfEvents: result.recordset[0].numberOfEvents };
        } catch (error) {
            console.error('SQL error', error);
            throw error;
        }
    }
    
}

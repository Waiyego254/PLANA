import { Request, Response } from 'express';
import { EventService } from '../services/event.service';

let eventService = new EventService();

export class EventController {
    async createEvent(req: Request, res: Response) {
        try {
            let result = await eventService.createEvent(req.body);
            console.log("Request body:", req.body);
            console.log("Controller result:", result);
            
            return res.status(201).json(result);
        } catch (error) {
            return res.json({
                error: error
            });
        }
    }

    async viewAllEvents(req: Request, res: Response) {
        try {
            let result = await eventService.viewAllEvents();
            return res.status(200).json(result);
        } catch (error) {
            return res.json({
                error
            });
        }
    }

    async viewSingleEvent(req: Request, res: Response) {
        try {
            let { event_id } = req.params;
            let response = await eventService.viewSingleEvent(event_id);
            return res.status(200).json(response);
        } catch (error) {
            return res.json({
                error: 'Error fetching event'
            });
        }
    }

    async updateEvent(req: Request, res: Response) {
        try {
            let event_id = req.params.event_id;
            let { title, description, date, location, ticket_type, price, image, total_tickets, available_tickets } = req.body;

            let event = {
                event_id: event_id,
                title,
                description,
                date,
                location,
                ticket_type,
                price,
                image,
                total_tickets,
                available_tickets
            };
            let response = await eventService.updateEvent(event);
            return res.status(200).json(response);
        } catch (error) {
            return res.json({
                error: 'Failed to update event details'
            });
        }
    }

    async approveEvent(req: Request, res: Response) {
        try {
            let { event_id } = req.params;
            let result = await eventService.approveEvent(event_id);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({ error: 'Error approving event' });
        }
    }
    

    async deleteEvent(req: Request, res: Response) {
        try {
            let { event_id } = req.params;
            let response = await eventService.deleteEvent(event_id);
            return res.status(200).json(response);
        } catch (error) {
            return res.json({
                error: 'Error deleting event'
            });
        }
    }

    async getNumberOfEvents(req: Request, res: Response) {
        try {
            let result = await eventService.getNumberOfEvents();
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({ error: 'Error fetching number of events' });
        }
    }
    
}

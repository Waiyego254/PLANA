import { Router } from "express";
import { EventController } from "../controllers/event.controller";

const event_router = Router();
const controller = new EventController();

event_router.post('/createEvent', controller.createEvent);
event_router.get('/viewAllEvents', controller.viewAllEvents);
event_router.get('/:event_id', controller.viewSingleEvent);
event_router.put('/:event_id', controller.updateEvent);
event_router.put('/approve-event/:event_id', controller.approveEvent);
event_router.delete('/:event_id', controller.deleteEvent);
event_router.get('/event/numberOfEvents', controller.getNumberOfEvents);

export default event_router;
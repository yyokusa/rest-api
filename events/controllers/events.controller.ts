import express from 'express';
import eventsService from '../services/events.service';
import argon2 from 'argon2';
import debug from 'debug';
import { CreateEventUserResponseDto } from '../dto/create.event.user.response.dto';

const log: debug.IDebugger = debug('app:events-controller');

// event controller singleton
class EventsController {
    async listEvents(req: express.Request, res: express.Response) {
        const events = await eventsService.list(100, 0);
        res.status(200).send(events);
    }

    async getEventById(req: express.Request, res: express.Response) {
        const event = await eventsService.readById(req.body.id);
        res.status(200).send(event);
    }

    async createEvent(req: express.Request, res: express.Response) {
        const eventId = await eventsService.create(req.body);
        res.status(201).send({ id: eventId });
    }
    
    async assignUserToAnEvent(req: express.Request, res: express.Response) {
        const result: CreateEventUserResponseDto | undefined = await eventsService.assignUser(req.body);
        if (result === undefined) {
            res.status(409).send({ 
                    error: `Something went wrong`
                });
        }
        // The response must include the group ID and the list of Player IDs of the group members.
        res.status(201).send(result);
    }

    async patch(req: express.Request, res: express.Response) {
        if (req.body.password) {
            req.body.password = await argon2.hash(req.body.password);
        }
        log(await eventsService.patchById(req.body.id, req.body));
        res.status(204).send();
    }

    async put(req: express.Request, res: express.Response) {
        req.body.password = await argon2.hash(req.body.password);
        log(await eventsService.putById(req.body.id, req.body));
        res.status(204).send();
    }

    async removeEvent(req: express.Request, res: express.Response) {
        log(await eventsService.deleteById(req.body.id));
        // in line with RFC 7231 : https://datatracker.ietf.org/doc/html/rfc7231#section-6.3.5
        res.status(204).send();
    }
}

export default new EventsController();

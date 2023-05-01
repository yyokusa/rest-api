import express from 'express';
import eventService from '../services/events.service';
import usersService from '../../users/services/users.service';
import groupService from '../../groups/services/group.service';
import debug from 'debug';
import { InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import EventsDao from '../daos/events.dao';

const log: debug.IDebugger = debug('app:users-controller');
class EventsMiddleware {
    
    async validateEventDoesNotExist(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        const event = await eventService.readById(req.body.eventId);
        // @ts-ignore
        if (event) {
            res.status(409).send({
                error: `Event ${req.body.eventId} already exists`,
            });
        } else {
            res.locals.event = event;
            next();
        }
    }
    
    async validateEventExists(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        const event = await eventService.readById(req.params.eventId);
        log(":validateEventExists: ", event);
        // @ts-ignore
        if (event) {
            res.locals.event = event;
            next();
        } else {
            res.status(404).send({
                error: `Event ${req.params.eventId} not found`,
            });
        }
    }

    // check if user is already registered for event
    async validateUserIsNotRegistered(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        const event = await eventService.readById(req.params.eventId);
        // get user
        const user = await usersService.readById(req.body.userId);
        // get all event groups and check if user is already registered
        const eventGroups = await groupService.readByEventId(req.params.eventId);
        const userExists = eventGroups.some((group: any) => {
            group.hasUser(user)
        });
        if (userExists) {
            // get the group user exists in
            const group = eventGroups.find((group: any) => {
                group.hasUser(user)
            });
            if (group === undefined) {return res.status(404).send()}
            res.status(201).send({
                groupId: (group as any).id,
                playerIds: (group as any).getUsers().map((user: any) => user.id)
            });
        } else {
            res.locals.event = event;
            next();
        }
    }


    async extractEventIdFromBody(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        req.body.id = req.body.eventId;
        next();
    }

    async extractEventIdFromParams(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        req.body.eventId = req.params.eventId;
        next();
    }

}

export default new EventsMiddleware();
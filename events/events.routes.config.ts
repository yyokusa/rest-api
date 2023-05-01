import { CommonRoutesConfig } from '../common/common.routes.config';
import EventsController from './controllers/events.controller';
import EventsMiddleware from './middleware/events.middleware';
import express from 'express';
import BodyValidationMiddleware from '../common/middleware/body.validation.middleware';
import { body } from 'express-validator';
import jwtMiddleware from '../auth/middleware/jwt.middleware';
import permissionMiddleware from '../common/middleware/common.permission.middleware';
import { PermissionFlag } from '../common/middleware/common.permissionflag.enum';
import UserEventsDao from '../common/assoc/user_events.assoc';

export class EventsRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'EventsRoutes');
    }

    configureRoutes(): express.Application {

        // get events
        this.app
            .route(`/events`)
            .get(jwtMiddleware.validJWTNeeded,
                permissionMiddleware.permissionFlagRequired(
                    PermissionFlag.FREE_PERMISSION
                ),
                EventsController.listEvents);

        // create an event
        this.app
            .route(`/events`)
            .post(
                // example: 2002-07-15
                jwtMiddleware.validJWTNeeded,
                permissionMiddleware.permissionFlagRequired(
                    PermissionFlag.FREE_PERMISSION
                    ),
                EventsMiddleware.validateEventDoesNotExist,
                body('eventId').isString(),
                body('time').isDate()
                    .withMessage('Time must be valid a date with format YYYY-MM-DD'),
                BodyValidationMiddleware.verifyBodyFieldsErrors,
                EventsController.createEvent
            );;

        // assign a player to an event-group (join an event)
        // Player ID is obtained from the authorization (access token - JWT in this case)
        // Event ID is obtained from the request parameters (path)
        this.app.param(`eventId`, EventsMiddleware.extractEventIdFromParams);
        this.app
            .route(`/eventsAndUser/:eventId`)
            .post(
                jwtMiddleware.validJWTNeeded,
                EventsMiddleware.validateEventExists,
                EventsMiddleware.validateUserIsNotRegistered,
                permissionMiddleware.permissionFlagRequired(
                    PermissionFlag.FREE_PERMISSION
                ),
                EventsController.assignUserToAnEvent);

        return this.app;
    }
}

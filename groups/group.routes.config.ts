import { CommonRoutesConfig } from '../common/common.routes.config';
import GroupsController from './controllers/groups.controller';
import GroupsMiddleware from './middleware/group.middleware';
import express from 'express';
import BodyValidationMiddleware from '../common/middleware/body.validation.middleware';
import { body } from 'express-validator';
import jwtMiddleware from '../auth/middleware/jwt.middleware';
import permissionMiddleware from '../common/middleware/common.permission.middleware';
import { PermissionFlag } from '../common/middleware/common.permissionflag.enum';

export class GroupsRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'GroupsRoutes');
    }

    configureRoutes(): express.Application {
        this.app
            .route(`/groups`)
            .get(jwtMiddleware.validJWTNeeded,
                permissionMiddleware.permissionFlagRequired(
                    PermissionFlag.FREE_PERMISSION
                ),
                GroupsController.listGroups);

        this.app
            .route(`/groups`)
            .post(
                // example: 2002-07-15
                jwtMiddleware.validJWTNeeded,
                permissionMiddleware.permissionFlagRequired(
                    PermissionFlag.FREE_PERMISSION
                    ),
                GroupsMiddleware.validateGroupDoesNotExist,
                body('eventId').isString(),
                body('time').isDate()
                    .withMessage('Time must be valid a date with format YYYY-MM-DD'),
                BodyValidationMiddleware.verifyBodyFieldsErrors,
                GroupsController.createGroup
            );

        return this.app;
    }
}

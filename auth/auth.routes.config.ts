import { CommonRoutesConfig } from '../common/common.routes.config';
import authController from './controllers/auth.controller';
import authMiddleware from './middleware/auth.middleware';
import jwtMiddleware from './middleware/jwt.middleware';
import express from 'express';
import BodyValidationMiddleware from '../common/middleware/body.validation.middleware';
import { body } from 'express-validator';

export class AuthRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'AuthRoutes');
    }

    configureRoutes(): express.Application {

        // TODO: The requirement for a new post to /auth brings 
        // up a security scenario that’s worth bearing in mind. 
        // When a site owner changes a user’s permissions—for example, 
        // to attempt to lock out a misbehaving user—the user won’t see this take 
        // effect until their next JWT refresh. That’s because the permissions 
        // check uses the JWT data itself to avoid an extra database hit.
        this.app.post(`/auth`, [
            body('email').isEmail(),
            body('password').isString(),
            BodyValidationMiddleware.verifyBodyFieldsErrors,
            authMiddleware.verifyUserPassword,
            authController.createJWT,
        ]);
        // https://auth0.com/docs/secure/tokens/refresh-tokens/revoke-refresh-tokens
        // TODO: invalidate previous tokens and limit how often new ones can be requested.
        // this would be a good place to use a redis cache to store the refresh tokens
        this.app.post(`/auth/refresh-token`, [
            jwtMiddleware.validJWTNeeded,
            jwtMiddleware.verifyRefreshBodyField,
            jwtMiddleware.validRefreshNeeded,
            authController.createJWT,
        ]);
        return this.app;
    }
}
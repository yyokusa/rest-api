import express from 'express';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { Jwt } from '../../common/types/jwt';
import usersService from '../../users/services/users.service';
import debug from 'debug';

const log: debug.IDebugger = debug('app:jwt-middleware');

// @ts-expect-error
const jwtSecret: string = process.env.JWT_SECRET;

class JwtMiddleware {
    verifyRefreshBodyField(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        if (req.body && req.body.refreshToken) {
            return next();
        } else {
            return res
                .status(400)
                .send({ errors: ['Missing required field: refreshToken'] });
        }
    }

    async validRefreshNeeded(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        const user: any = await usersService.getUserByEmailWithPassword(
            res.locals.jwt.email
        );
        const salt = crypto.createSecretKey(
            Buffer.from(res.locals.jwt.refreshKey.data)
        );
        const hash = crypto
            .createHmac('sha512', salt)
            .update(res.locals.jwt.userId + jwtSecret)
            .digest('base64');
        if (hash === req.body.refreshToken) {
            req.body = {
                userId: user.id,
                email: user.email,
                permissionFlags: user.permissionFlags,
            };
            return next();
        } else {
            return res.status(400).send({ errors: ['Invalid refresh token'] });
        }
    }

    validJWTNeeded(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        if (req.headers['authorization']) {
            try {
                const authorization = req.headers['authorization'].split(' ');
                log("authorization: ", authorization);
                if (authorization[0] !== 'Bearer') {
                    return res.status(401).send();
                } else {
                    // The variables set on res.locals are available within a 
                    // single request-response cycle, and will not be shared between requests.
                    res.locals.jwt = jwt.verify(
                        authorization[1],
                        jwtSecret
                    ) as Jwt;
                    req.body.userId = res.locals.jwt.userId;
                    log("res.locals.jwt: ", res.locals.jwt)
                    next();
                }
            } catch (err) {
                log(":validJWTNeeded: ", err);
                return res.status(403).send();
            }
        } else {
            return res.status(401).send();
        }
    }
}

export default new JwtMiddleware();

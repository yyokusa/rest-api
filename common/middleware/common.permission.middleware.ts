import express from 'express';
import { PermissionFlag } from './common.permissionflag.enum';
import debug from 'debug';

const log: debug.IDebugger = debug('app:common-permission-middleware');

class CommonPermissionMiddleware {

    // factory function : https://refactoring.guru/design-patterns/factory-method
    permissionFlagRequired(requiredPermissionFlag: PermissionFlag) {
        return (
            req: express.Request,
            res: express.Response,
            next: express.NextFunction
        ) => {
            try {
                const userPermissionFlags = parseInt(
                    res.locals.jwt.permissionFlags
                );
                log("userPermissionFlags: ", userPermissionFlags);
                if (userPermissionFlags & requiredPermissionFlag) {
                    log("userPermissionFlags & requiredPermissionFlag: ", userPermissionFlags & requiredPermissionFlag);
                    next();
                } else {
                    log("userPermissionFlags: ", userPermissionFlags);
                    res.status(403).send();
                }
            } catch (e) {
                log("e: ", e);
                log(e);
            }
        };
    }
    
    async onlySameUserOrAdminCanDoThisAction(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        const userPermissionFlags = parseInt(res.locals.jwt.permissionFlags);
        log("userPermissionFlags: ", userPermissionFlags);
        log("req.params: ", req.params);
        log("req.params.userId: ", req.params.userId);
        log("res.locals.jwt.userId: ", res.locals.jwt.userId);
        if (
            req.params &&
            req.params.userId &&
            req.params.userId === res.locals.jwt.userId
        ) {
            return next();
        } else {
            if (userPermissionFlags & PermissionFlag.ADMIN_PERMISSION) {
                return next();
            } else {
                log("userPermissionFlags: ", userPermissionFlags);
                return res.status(403).send();
            }
        }
    }
    
}

export default new CommonPermissionMiddleware();
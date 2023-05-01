import express from 'express';
import groupService from '../services/group.service';
import debug from 'debug';

const log: debug.IDebugger = debug('app:users-controller');
class GroupsMiddleware {
    
    async validateGroupDoesNotExist(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        const group = await groupService.readById(req.body.groupId);
        // @ts-ignore
        if (group) {
            res.status(409).send({
                error: `Group ${req.body.groupId} already exists`,
            });
        } else {
            res.locals.group = group;
            next();
        }
    }
    
    async validateGroupExists(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        const group = await groupService.readById(req.params.groupId);
        log(":validategroupExists: ", group);
        // @ts-ignore
        if (group) {
            res.locals.group = group;
            next();
        } else {
            res.status(404).send({
                error: `User ${req.params.groupId} not found`,
            });
        }
    }

    async extractGroupId(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        req.body.id = req.body.groupId;
        next();
    }

}

export default new GroupsMiddleware();
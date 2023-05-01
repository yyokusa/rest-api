import express from 'express';
import groupsService from '../services/group.service';
import argon2 from 'argon2';
import debug from 'debug';

const log: debug.IDebugger = debug('app:groups-controller');

// Group controller singleton
class GroupsController {
    async listGroups(req: express.Request, res: express.Response) {
        const groups = await groupsService.list(100, 0);
        res.status(200).send(groups);
    }

    async getGroupById(req: express.Request, res: express.Response) {
        const group = await groupsService.readById(req.body.id);
        res.status(200).send(group);
    }

    async createGroup(req: express.Request, res: express.Response) {
        const groupId = await groupsService.create(req.body);
        res.status(201).send({ id: groupId });
    }

    async patch(req: express.Request, res: express.Response) {
        if (req.body.password) {
            req.body.password = await argon2.hash(req.body.password);
        }
        log(await groupsService.patchById(req.body.id, req.body));
        res.status(204).send();
    }

    async put(req: express.Request, res: express.Response) {
        req.body.password = await argon2.hash(req.body.password);
        log(await groupsService.putById(req.body.id, req.body));
        res.status(204).send();
    }

    async removeGroup(req: express.Request, res: express.Response) {
        log(await groupsService.deleteById(req.body.id));
        // in line with RFC 7231 : https://datatracker.ietf.org/doc/html/rfc7231#section-6.3.5
        res.status(204).send();
    }
}

export default new GroupsController();

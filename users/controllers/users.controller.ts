// we import express to add types to the request/response 
// objects from our controller functions
import express from 'express';

// we import our newly created user services
import usersService from '../services/users.service';

// we import the argon2 library for password hashing
import argon2 from 'argon2';

// we use debug with a custom context
import debug from 'debug';

import { PatchUserDto } from '../dto/patch.user.dto'; 

const log: debug.IDebugger = debug('app:users-controller');

// user controller singleton
class UsersController {
    async listUsers(req: express.Request, res: express.Response) {
        const users = await usersService.list(100, 0);
        res.status(200).send(users);
    }

    async getUserById(req: express.Request, res: express.Response) {
        const user = await usersService.readById(req.body.id);
        res.status(200).send(user);
    }

    async createUser(req: express.Request, res: express.Response) {
        req.body.password = await argon2.hash(req.body.password);
        const userId = await usersService.create(req.body);
        res.status(201).send({ id: userId });
    }

    async patch(req: express.Request, res: express.Response) {
        if (req.body.password) {
            req.body.password = await argon2.hash(req.body.password);
        }
        log(await usersService.patchById(req.body.id, req.body));
        res.status(204).send();
    }

    async put(req: express.Request, res: express.Response) {
        req.body.password = await argon2.hash(req.body.password);
        log(await usersService.putById(req.body.id, req.body));
        res.status(204).send();
    }

    async removeUser(req: express.Request, res: express.Response) {
        log(await usersService.deleteById(req.body.id));
        // in line with RFC 7231 : https://datatracker.ietf.org/doc/html/rfc7231#section-6.3.5
        res.status(204).send();
    }

    // TODO:
    // 1 - Consider ways to have the code again disallow users changing their own 
    // permissionFlags while still allowing permissions-restricted endpoints to be tested.
    
    // 2 - Create and implement business logic (and corresponding tests) for how permissionFlags 
    // should be able to change via the API. (There’s a chicken-and-egg puzzle here: How does a 
    // particular user get permission to change permissions in the first place?)
    async updatePermissionFlags(req: express.Request, res: express.Response) {
        const patchUserDto: PatchUserDto = {
            permissionFlags: parseInt(req.params.permissionFlags),
        };
        log(await usersService.patchById(req.body.id, patchUserDto));
        res.status(204).send();
    }
}

export default new UsersController();

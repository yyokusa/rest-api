import UsersDao from '../daos/users.dao';
import { CRUD } from '../../common/interfaces/crud.interface';
import { CreateUserDto } from '../dto/create.user.dto';
import { PutUserDto } from '../dto/put.user.dto';
import { PatchUserDto } from '../dto/patch.user.dto';
import debug from 'debug';

const log: debug.IDebugger = debug('app:user-service');
/**
 *  UsersService as a service singleton,
 *  the same pattern we used with our DAO.
 */
class UsersService implements CRUD {
    async create(resource: CreateUserDto) {
        log(resource);
        return UsersDao.addUser(resource);
    }

    async deleteById(id: string) {
        return `Delete count is: ${await UsersDao.removeUserById(id)};`
    }
    // layer of separation between the controller and the DAO
    async list(limit: number, page: number) {
        return UsersDao.getUsers(limit, page);
    }

    async patchById(id: string, resource: PatchUserDto) : Promise<any> {
        return UsersDao.updateUserById(id, resource);
    }

    async readById(id: string) {
        return UsersDao.getUserById(id);
    }

    async putById(id: string, resource: PutUserDto) : Promise<any> {
        return UsersDao.updateUserById(id, resource);
    }

    async getUserByEmail(email: string) {
        return UsersDao.getUserByEmail(email);
    }

    async getUserByEmailWithPassword(email: string) {
        return UsersDao.getUserByEmailWithPassword(email);
    }
}

export default new UsersService();

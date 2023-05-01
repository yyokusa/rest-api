import GroupsDao from '../daos/groups.dao';
import { CRUD } from '../../common/interfaces/crud.interface';
import { CreateGroupDto } from '../dto/create.group.dto';
import { PutGroupDto } from '../dto/put.group.dto';
import { PatchGroupDto } from '../dto/patch.group.dto';
import debug from 'debug';

const log: debug.IDebugger = debug('app:event-service');
/**
 *  GroupsService as a service singleton,
 *  the same pattern we used with our DAO.
 */
class GroupsService implements CRUD {
    async create(resource: CreateGroupDto) {
        log(resource);
        return GroupsDao.addGroup(resource);
    }

    async deleteById(id: string) {
        return `Delete count is: ${await GroupsDao.removeGroupById(id)};`
    }
    // layer of separation between the controller and the DAO
    async list(limit: number, page: number) {
        return GroupsDao.getGroups(limit, page);
    }

    async patchById(id: string, resource: PatchGroupDto) : Promise<any> {
        return GroupsDao.updateGroupById(id, resource);
    }

    async readById(id: string) {
        return GroupsDao.getGroupById(id);
    }
    
    async readByEventId(eventId: string) {
        return GroupsDao.getGroupByEventId(eventId);
    }

    async putById(id: string, resource: PutGroupDto) : Promise<any> {
        return GroupsDao.updateGroupById(id, resource);
    }
}

export default new GroupsService();

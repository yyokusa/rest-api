import EventsDao from '../daos/events.dao';
import UserEventsDao from '../../common/assoc/user_events.assoc';
import { CRUD } from '../../common/interfaces/crud.interface';
import { CreateEventDto } from '../dto/create.event.dto';
import { PutEventDto } from '../dto/put.event.dto';
import { PatchEventDto } from '../dto/patch.event.dto';
import debug from 'debug';
import { CreateEventUserDto } from '../dto/create.event.user.dto';

const log: debug.IDebugger = debug('app:event-service');
/**
 *  EventsService as a service singleton,
 *  the same pattern we used with our DAO.
 */
class EventsService implements CRUD {
    async create(resource: CreateEventDto) {
        log(resource);
        // importing it creates a singleton instance of the UserEventsDao
        UserEventsDao
        return EventsDao.addEvent(resource);
    }
    
    async assignUser(resource: CreateEventUserDto) {
        return UserEventsDao.makeThingsHappen(resource);
    }

    async deleteById(id: string) {
        return `Delete count is: ${await EventsDao.removeEventById(id)};`
    }
    // layer of separation between the controller and the DAO
    async list(limit: number, page: number) {
        return EventsDao.getEvents(limit, page);
    }

    async patchById(id: string, resource: PatchEventDto) : Promise<any> {
        return EventsDao.updateEventById(id, resource);
    }

    async readById(id: string) {
        return EventsDao.getEventById(id);
    }

    async putById(id: string, resource: PutEventDto) : Promise<any> {
        return EventsDao.updateEventById(id, resource);
    }
}

export default new EventsService();

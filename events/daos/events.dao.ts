import { CreateEventDto  } from "../dto/create.event.dto";
import { PutEventDto } from "../dto/put.event.dto";
import { PatchEventDto } from "../dto/patch.event.dto";
import database from '../../common/services/postgres.service';


import shortid from 'shortid';
import debug from 'debug';

import { DataTypes } from 'sequelize';


const log: debug.IDebugger = debug('app:events-in-memory-dao');

class EventsDao {

    db = database.getDatabase();

    // defining a model, represents a table in DB
    Event = this.db.define('Event', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false
        },
        time: {
            type: DataTypes.STRING,
            allowNull: false,
        }
      }, {
        // Other model options go here
      });

    constructor() {
        // creates the table if it doesn't exist (and does nothing if it already exists)
        // this.User.sync({  });
        // creates the table, dropping it first if it already existed
        this.Event.sync({ force: true });
        // this.User.sync({ force: true, match: /_test$/ });
        log('Created new instance of EventsDao');
    }

    getModel() {
        return this.Event;
    }

    async addEvent(eventFields: CreateEventDto) {
        // An instance of the class represents one object from that model 
        // (which maps to one row of the table in the database).
        this.Event.build({ ...eventFields, id: eventFields.eventId }).save();
        return eventFields.eventId;
    }
    
    async getEventById(eventId: string) {
        return this.Event.findByPk(eventId);
    }
    
    async getEvents(limit = 25, page = 0) {
        return this.Event.findAll({ limit: limit, offset: page * limit});
    }

    async updateEventById(
        eventId: string,
        eventFields: PatchEventDto | PutEventDto
    ) {
        const existingEvent = await this.Event.findByPk(eventId);
        const newEvent = await existingEvent?.update({
            id: eventId,
            eventFields
        });
        return newEvent;
    }
    
    async removeEventById(userId: string) {
        return this.Event.destroy({ where: { id: userId } });
    }
}

export default new EventsDao();

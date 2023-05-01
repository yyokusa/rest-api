import { CreateGroupDto  } from "../dto/create.group.dto";
import { PutGroupDto } from "../dto/put.group.dto";
import { PatchGroupDto } from "../dto/patch.group.dto";
import database from '../../common/services/postgres.service';


import shortid from 'shortid';
import debug from 'debug';

import { DataTypes } from 'sequelize';


const log: debug.IDebugger = debug('app:groups-in-memory-dao');

export type CategoryType = 'Bronze' | 'Silver' | 'Gold';

export const GROUP_CAPACITY = 2;

class GroupsDao {

    db = database.getDatabase();

    // defining a model, represents a table in DB
    Group = this.db.define('Group', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        size: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        capacity: {
            type: DataTypes.INTEGER,
            defaultValue: GROUP_CAPACITY,
            allowNull: false,
        }
      }, {
        // Other model options go here
      });

    constructor() {
        // creates the table if it doesn't exist (and does nothing if it already exists)
        // this.User.sync({  });
        // creates the table, dropping it first if it already existed
        this.Group.sync({ force: true });
        // this.User.sync({ force: true, match: /_test$/ });
        log('Created new instance of GroupsDao');
    }

    getModel() {
        return this.Group;
    }

    async addGroup(groupFields: CreateGroupDto) {
        // An instance of the class represents one object from that model 
        // (which maps to one row of the table in the database).
        this.Group.build({ ...groupFields, id: groupFields.groupId }).save();
        return groupFields.groupId;
    }
    
    async getGroupById(groupId: string) {
        return this.Group.findByPk(groupId);
    }
    
    async getGroups(limit = 25, page = 0) {
        return this.Group.findAll({ limit: limit, offset: page * limit});
    }

    async updateGroupById(
        groupId: string,
        groupFields: PatchGroupDto | PutGroupDto
    ) {
        const existingGroup = await this.Group.findByPk(groupId);
        const newGroup = await existingGroup?.update({
            id: groupId,
            groupFields
        });
        return newGroup;
    }

    async getGroupByEventId(eventId: string) {
        return this.Group.findAll({ where: { EventId: eventId } });
    }
    
    async removeGroupById(userId: string) {
        return this.Group.destroy({ where: { id: userId } });
    }
}

export default new GroupsDao();

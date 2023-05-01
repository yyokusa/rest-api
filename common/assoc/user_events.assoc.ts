import UsersDao from '../../users/daos/users.dao';
import UserGroupsDao from '../assoc/user_groups.assoc';
import EventsDao from '../../events/daos/events.dao';
import GroupsDao from '../../groups/daos/groups.dao';
import database from '../services/postgres.service';
import { DataTypes, Model } from 'sequelize';
import debug from 'debug';
import { getCategory } from '../utils/utils';
import { CreateEventUserDto } from '../../events/dto/create.event.user.dto';
import { CreateEventUserResponseDto } from '../../events/dto/create.event.user.response.dto';

const log: debug.IDebugger = debug('app:assoc-user_groups_dao');

class UserEventsDao {
    db = database.getDatabase();
    Event = EventsDao.getModel();
    User = UsersDao.getModel();
    Group = GroupsDao.getModel();
    UserGroups = UserGroupsDao.getModel();
    UserEvents: any;

    constructor() {
        const UserEvents = this.db.define('UserEvents', {
            EventId: {
              type: DataTypes.INTEGER,
              references: {
                model: this.Event,
                key: 'id'
              }
            },
            UserId: {
              type: DataTypes.INTEGER,
              references: {
                model: this.User,
                key: 'id'
              }
            }
          });
        this.UserEvents = UserEvents;
        this.User.belongsToMany(this.Event, { through: UserEvents });
        this.Event.belongsToMany(this.User, { through: UserEvents });
        
        this.Event.hasMany(this.Group);
        this.Group.belongsTo(this.Event);
        log('Created new instance of UserEventsDao');
    }

    handleInsertionToExistingGroup = async (user: any, userLevel: number, existingGroups: Model<any, any>[], existingEvent: any): Promise<CreateEventUserResponseDto | undefined> => {
      log("using existing group");
      const group = existingGroups.find(
        (group: any) =>
          group.category === getCategory(userLevel) && group.size < group.capacity
      );
      if (group === undefined) { 
        log("something went wrong");
        return Promise.resolve(undefined);
      }
      // modify the size of the group
      (group as any).size += 1;
      await group.save();
      // associate this group with the user
      //@ts-ignore
      const result = await group.addUser(user, { through: this.UserGroups });
      // associate this user with the event
      const result1 = await existingEvent.addUser(user, { through: this.UserEvents }); 
      
      const groupId = (group as any).id;
      // @ts-ignore
      const playerIds = (await group.getUsers()).map((user: any) => user.id);
      // will return the group id and the player ids
      return Promise.resolve({ groupId, playerIds });    
    }

    handleInsertionToNewGroup = async (user: any, userLevel: number, eventId: string, existingEvent: any): Promise<CreateEventUserResponseDto | undefined> => {
      log("creating new group");
      const newGroup = await this.Group.create({ EventId: eventId, category: getCategory(userLevel), size: 1 });
      // associate this newGroup with the user
      //@ts-ignore
      await newGroup.addUser(user, { through: this.UserGroups });
      // associate this user with the event
      await existingEvent.addUser(user, { through: this.UserEvents });
      
      
      const groupId = (newGroup as any).id;
      // @ts-ignore
      const playerIds = (await newGroup.getUsers()).map((user: any) => user.id);
      // will return the group id and the player ids
      return Promise.resolve({ groupId, playerIds });
    }

    makeThingsHappen = async (resource: CreateEventUserDto): Promise<CreateEventUserResponseDto | undefined> => {
      const userId = resource.userId;
      const user = await this.User.findByPk(userId);
      if (user === null) return Promise.resolve(undefined);
      const userLevel: number = (user as any).level;
      
      const eventId = resource.eventId;
      const existingEvent = await this.Event.findByPk(eventId);
      if (existingEvent === null) return Promise.resolve(undefined);

      // fetch existing groups of the event if any
      log("will query existing groups")
      const existingGroups = await this.Group.findAll({ where: { EventId: eventId } });

      // check if user is already in the event
      const isUserInEvent = await (existingEvent as any).hasUser(user);
      if (isUserInEvent) {
        log("using existing group");
        const group = existingGroups.find(
          (group: any) => group.hasUser(user)
        );
        if (group === undefined) { 
          log("something went wrong");
          return Promise.resolve(undefined);
        }
        const groupId = (group as any).id;
        // @ts-ignore
        const playerIds = (await group.getUsers()).map((user: any) => user.id);
        // will return the group id and the player ids
        return Promise.resolve({ groupId, playerIds });  
      }

      if (existingGroups.length !== 0 && this.getIsGroupAvailable(existingGroups, userLevel)) {
        return this.handleInsertionToExistingGroup(user, userLevel, existingGroups, existingEvent);
      }
      
      // !isGroupAvailable or no existing groups
      return this.handleInsertionToNewGroup(user, userLevel, eventId, existingEvent);
    }

    getIsGroupAvailable = (existingGroups: any, userLevel: number) => {
      return existingGroups.some(
        (group: any) =>
          group.category === getCategory(userLevel) && group.size < group.capacity
      );
    }
}

export default new UserEventsDao();

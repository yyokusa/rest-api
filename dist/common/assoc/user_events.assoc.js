"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_dao_1 = __importDefault(require("../../users/daos/users.dao"));
const user_groups_assoc_1 = __importDefault(require("../assoc/user_groups.assoc"));
const events_dao_1 = __importDefault(require("../../events/daos/events.dao"));
const groups_dao_1 = __importDefault(require("../../groups/daos/groups.dao"));
const postgres_service_1 = __importDefault(require("../services/postgres.service"));
const sequelize_1 = require("sequelize");
const debug_1 = __importDefault(require("debug"));
const utils_1 = require("../utils/utils");
const log = (0, debug_1.default)('app:assoc-user_groups_dao');
class UserEventsDao {
    constructor() {
        this.db = postgres_service_1.default.getDatabase();
        this.Event = events_dao_1.default.getModel();
        this.User = users_dao_1.default.getModel();
        this.Group = groups_dao_1.default.getModel();
        this.UserGroups = user_groups_assoc_1.default.getModel();
        this.handleInsertionToExistingGroup = (user, userLevel, existingGroups, existingEvent) => __awaiter(this, void 0, void 0, function* () {
            log("using existing group");
            const group = existingGroups.find((group) => group.category === (0, utils_1.getCategory)(userLevel) && group.size < group.capacity);
            if (group === undefined) {
                log("something went wrong");
                return Promise.resolve(undefined);
            }
            // modify the size of the group
            group.size += 1;
            yield group.save();
            // associate this group with the user
            //@ts-ignore
            const result = yield group.addUser(user, { through: this.UserGroups });
            // associate this user with the event
            const result1 = yield existingEvent.addUser(user, { through: this.UserEvents });
            const groupId = group.id;
            // @ts-ignore
            const playerIds = (yield group.getUsers()).map((user) => user.id);
            // will return the group id and the player ids
            return Promise.resolve({ groupId, playerIds });
        });
        this.handleInsertionToNewGroup = (user, userLevel, eventId, existingEvent) => __awaiter(this, void 0, void 0, function* () {
            log("creating new group");
            const newGroup = yield this.Group.create({ EventId: eventId, category: (0, utils_1.getCategory)(userLevel), size: 1 });
            // associate this newGroup with the user
            //@ts-ignore
            yield newGroup.addUser(user, { through: this.UserGroups });
            // associate this user with the event
            yield existingEvent.addUser(user, { through: this.UserEvents });
            const groupId = newGroup.id;
            // @ts-ignore
            const playerIds = (yield newGroup.getUsers()).map((user) => user.id);
            // will return the group id and the player ids
            return Promise.resolve({ groupId, playerIds });
        });
        this.makeThingsHappen = (resource) => __awaiter(this, void 0, void 0, function* () {
            const userId = resource.userId;
            const user = yield this.User.findByPk(userId);
            if (user === null)
                return Promise.resolve(undefined);
            const userLevel = user.level;
            const eventId = resource.eventId;
            const existingEvent = yield this.Event.findByPk(eventId);
            if (existingEvent === null)
                return Promise.resolve(undefined);
            // fetch existing groups of the event if any
            log("will query existing groups");
            const existingGroups = yield this.Group.findAll({ where: { EventId: eventId } });
            // check if user is already in the event
            const isUserInEvent = yield existingEvent.hasUser(user);
            if (isUserInEvent) {
                log("using existing group");
                const group = existingGroups.find((group) => group.hasUser(user));
                if (group === undefined) {
                    log("something went wrong");
                    return Promise.resolve(undefined);
                }
                const groupId = group.id;
                // @ts-ignore
                const playerIds = (yield group.getUsers()).map((user) => user.id);
                // will return the group id and the player ids
                return Promise.resolve({ groupId, playerIds });
            }
            if (existingGroups.length !== 0 && this.getIsGroupAvailable(existingGroups, userLevel)) {
                return this.handleInsertionToExistingGroup(user, userLevel, existingGroups, existingEvent);
            }
            // !isGroupAvailable or no existing groups
            return this.handleInsertionToNewGroup(user, userLevel, eventId, existingEvent);
        });
        this.getIsGroupAvailable = (existingGroups, userLevel) => {
            return existingGroups.some((group) => group.category === (0, utils_1.getCategory)(userLevel) && group.size < group.capacity);
        };
        const UserEvents = this.db.define('UserEvents', {
            EventId: {
                type: sequelize_1.DataTypes.INTEGER,
                references: {
                    model: this.Event,
                    key: 'id'
                }
            },
            UserId: {
                type: sequelize_1.DataTypes.INTEGER,
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
}
exports.default = new UserEventsDao();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcl9ldmVudHMuYXNzb2MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9jb21tb24vYXNzb2MvdXNlcl9ldmVudHMuYXNzb2MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSwyRUFBa0Q7QUFDbEQsbUZBQXVEO0FBQ3ZELDhFQUFxRDtBQUNyRCw4RUFBcUQ7QUFDckQsb0ZBQW9EO0FBQ3BELHlDQUE2QztBQUM3QyxrREFBMEI7QUFDMUIsMENBQTZDO0FBSTdDLE1BQU0sR0FBRyxHQUFvQixJQUFBLGVBQUssRUFBQywyQkFBMkIsQ0FBQyxDQUFDO0FBRWhFLE1BQU0sYUFBYTtJQVFmO1FBUEEsT0FBRSxHQUFHLDBCQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDNUIsVUFBSyxHQUFHLG9CQUFTLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDN0IsU0FBSSxHQUFHLG1CQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDM0IsVUFBSyxHQUFHLG9CQUFTLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDN0IsZUFBVSxHQUFHLDJCQUFhLENBQUMsUUFBUSxFQUFFLENBQUM7UUE2QnRDLG1DQUE4QixHQUFHLENBQU8sSUFBUyxFQUFFLFNBQWlCLEVBQUUsY0FBaUMsRUFBRSxhQUFrQixFQUFtRCxFQUFFO1lBQzlLLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1lBQzVCLE1BQU0sS0FBSyxHQUFHLGNBQWMsQ0FBQyxJQUFJLENBQy9CLENBQUMsS0FBVSxFQUFFLEVBQUUsQ0FDYixLQUFLLENBQUMsUUFBUSxLQUFLLElBQUEsbUJBQVcsRUFBQyxTQUFTLENBQUMsSUFBSSxLQUFLLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQzNFLENBQUM7WUFDRixJQUFJLEtBQUssS0FBSyxTQUFTLEVBQUU7Z0JBQ3ZCLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO2dCQUM1QixPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7YUFDbkM7WUFDRCwrQkFBK0I7WUFDOUIsS0FBYSxDQUFDLElBQUksSUFBSSxDQUFDLENBQUM7WUFDekIsTUFBTSxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDbkIscUNBQXFDO1lBQ3JDLFlBQVk7WUFDWixNQUFNLE1BQU0sR0FBRyxNQUFNLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDO1lBQ3ZFLHFDQUFxQztZQUNyQyxNQUFNLE9BQU8sR0FBRyxNQUFNLGFBQWEsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDO1lBRWhGLE1BQU0sT0FBTyxHQUFJLEtBQWEsQ0FBQyxFQUFFLENBQUM7WUFDbEMsYUFBYTtZQUNiLE1BQU0sU0FBUyxHQUFHLENBQUMsTUFBTSxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFTLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUN2RSw4Q0FBOEM7WUFDOUMsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUM7UUFDakQsQ0FBQyxDQUFBLENBQUE7UUFFRCw4QkFBeUIsR0FBRyxDQUFPLElBQVMsRUFBRSxTQUFpQixFQUFFLE9BQWUsRUFBRSxhQUFrQixFQUFtRCxFQUFFO1lBQ3ZKLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1lBQzFCLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxJQUFBLG1CQUFXLEVBQUMsU0FBUyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDMUcsd0NBQXdDO1lBQ3hDLFlBQVk7WUFDWixNQUFNLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDO1lBQzNELHFDQUFxQztZQUNyQyxNQUFNLGFBQWEsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDO1lBR2hFLE1BQU0sT0FBTyxHQUFJLFFBQWdCLENBQUMsRUFBRSxDQUFDO1lBQ3JDLGFBQWE7WUFDYixNQUFNLFNBQVMsR0FBRyxDQUFDLE1BQU0sUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBUyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDMUUsOENBQThDO1lBQzlDLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDO1FBQ2pELENBQUMsQ0FBQSxDQUFBO1FBRUQscUJBQWdCLEdBQUcsQ0FBTyxRQUE0QixFQUFtRCxFQUFFO1lBQ3pHLE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUM7WUFDL0IsTUFBTSxJQUFJLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUM5QyxJQUFJLElBQUksS0FBSyxJQUFJO2dCQUFFLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNyRCxNQUFNLFNBQVMsR0FBWSxJQUFZLENBQUMsS0FBSyxDQUFDO1lBRTlDLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUM7WUFDakMsTUFBTSxhQUFhLEdBQUcsTUFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN6RCxJQUFJLGFBQWEsS0FBSyxJQUFJO2dCQUFFLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUU5RCw0Q0FBNEM7WUFDNUMsR0FBRyxDQUFDLDRCQUE0QixDQUFDLENBQUE7WUFDakMsTUFBTSxjQUFjLEdBQUcsTUFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFFakYsd0NBQXdDO1lBQ3hDLE1BQU0sYUFBYSxHQUFHLE1BQU8sYUFBcUIsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDakUsSUFBSSxhQUFhLEVBQUU7Z0JBQ2pCLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO2dCQUM1QixNQUFNLEtBQUssR0FBRyxjQUFjLENBQUMsSUFBSSxDQUMvQixDQUFDLEtBQVUsRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FDcEMsQ0FBQztnQkFDRixJQUFJLEtBQUssS0FBSyxTQUFTLEVBQUU7b0JBQ3ZCLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO29CQUM1QixPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7aUJBQ25DO2dCQUNELE1BQU0sT0FBTyxHQUFJLEtBQWEsQ0FBQyxFQUFFLENBQUM7Z0JBQ2xDLGFBQWE7Z0JBQ2IsTUFBTSxTQUFTLEdBQUcsQ0FBQyxNQUFNLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQVMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUN2RSw4Q0FBOEM7Z0JBQzlDLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDO2FBQ2hEO1lBRUQsSUFBSSxjQUFjLENBQUMsTUFBTSxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsbUJBQW1CLENBQUMsY0FBYyxFQUFFLFNBQVMsQ0FBQyxFQUFFO2dCQUN0RixPQUFPLElBQUksQ0FBQyw4QkFBOEIsQ0FBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLGNBQWMsRUFBRSxhQUFhLENBQUMsQ0FBQzthQUM1RjtZQUVELDBDQUEwQztZQUMxQyxPQUFPLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxhQUFhLENBQUMsQ0FBQztRQUNqRixDQUFDLENBQUEsQ0FBQTtRQUVELHdCQUFtQixHQUFHLENBQUMsY0FBbUIsRUFBRSxTQUFpQixFQUFFLEVBQUU7WUFDL0QsT0FBTyxjQUFjLENBQUMsSUFBSSxDQUN4QixDQUFDLEtBQVUsRUFBRSxFQUFFLENBQ2IsS0FBSyxDQUFDLFFBQVEsS0FBSyxJQUFBLG1CQUFXLEVBQUMsU0FBUyxDQUFDLElBQUksS0FBSyxDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsUUFBUSxDQUMzRSxDQUFDO1FBQ0osQ0FBQyxDQUFBO1FBakhHLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRTtZQUM1QyxPQUFPLEVBQUU7Z0JBQ1AsSUFBSSxFQUFFLHFCQUFTLENBQUMsT0FBTztnQkFDdkIsVUFBVSxFQUFFO29CQUNWLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztvQkFDakIsR0FBRyxFQUFFLElBQUk7aUJBQ1Y7YUFDRjtZQUNELE1BQU0sRUFBRTtnQkFDTixJQUFJLEVBQUUscUJBQVMsQ0FBQyxPQUFPO2dCQUN2QixVQUFVLEVBQUU7b0JBQ1YsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJO29CQUNoQixHQUFHLEVBQUUsSUFBSTtpQkFDVjthQUNGO1NBQ0YsQ0FBQyxDQUFDO1FBQ0wsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7UUFDN0IsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDO1FBQzdELElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQztRQUU3RCxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDL0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2pDLEdBQUcsQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDO0lBQ2pELENBQUM7Q0EyRko7QUFFRCxrQkFBZSxJQUFJLGFBQWEsRUFBRSxDQUFDIn0=
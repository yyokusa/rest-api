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
exports.GROUP_CAPACITY = void 0;
const postgres_service_1 = __importDefault(require("../../common/services/postgres.service"));
const debug_1 = __importDefault(require("debug"));
const sequelize_1 = require("sequelize");
const log = (0, debug_1.default)('app:groups-in-memory-dao');
exports.GROUP_CAPACITY = 2;
class GroupsDao {
    constructor() {
        this.db = postgres_service_1.default.getDatabase();
        // defining a model, represents a table in DB
        this.Group = this.db.define('Group', {
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            category: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            size: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
            capacity: {
                type: sequelize_1.DataTypes.INTEGER,
                defaultValue: exports.GROUP_CAPACITY,
                allowNull: false,
            }
        }, {
        // Other model options go here
        });
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
    addGroup(groupFields) {
        return __awaiter(this, void 0, void 0, function* () {
            // An instance of the class represents one object from that model 
            // (which maps to one row of the table in the database).
            this.Group.build(Object.assign(Object.assign({}, groupFields), { id: groupFields.groupId })).save();
            return groupFields.groupId;
        });
    }
    getGroupById(groupId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.Group.findByPk(groupId);
        });
    }
    getGroups(limit = 25, page = 0) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.Group.findAll({ limit: limit, offset: page * limit });
        });
    }
    updateGroupById(groupId, groupFields) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingGroup = yield this.Group.findByPk(groupId);
            const newGroup = yield (existingGroup === null || existingGroup === void 0 ? void 0 : existingGroup.update({
                id: groupId,
                groupFields
            }));
            return newGroup;
        });
    }
    getGroupByEventId(eventId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.Group.findAll({ where: { EventId: eventId } });
        });
    }
    removeGroupById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.Group.destroy({ where: { id: userId } });
        });
    }
}
exports.default = new GroupsDao();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JvdXBzLmRhby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2dyb3Vwcy9kYW9zL2dyb3Vwcy5kYW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBR0EsOEZBQThEO0FBSTlELGtEQUEwQjtBQUUxQix5Q0FBc0M7QUFHdEMsTUFBTSxHQUFHLEdBQW9CLElBQUEsZUFBSyxFQUFDLDBCQUEwQixDQUFDLENBQUM7QUFJbEQsUUFBQSxjQUFjLEdBQUcsQ0FBQyxDQUFDO0FBRWhDLE1BQU0sU0FBUztJQTRCWDtRQTFCQSxPQUFFLEdBQUcsMEJBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUU1Qiw2Q0FBNkM7UUFDN0MsVUFBSyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRTtZQUM1QixFQUFFLEVBQUU7Z0JBQ0EsSUFBSSxFQUFFLHFCQUFTLENBQUMsT0FBTztnQkFDdkIsVUFBVSxFQUFFLElBQUk7Z0JBQ2hCLGFBQWEsRUFBRSxJQUFJO2FBQ3RCO1lBQ0QsUUFBUSxFQUFFO2dCQUNOLElBQUksRUFBRSxxQkFBUyxDQUFDLE1BQU07Z0JBQ3RCLFNBQVMsRUFBRSxLQUFLO2FBQ25CO1lBQ0QsSUFBSSxFQUFFO2dCQUNGLElBQUksRUFBRSxxQkFBUyxDQUFDLE9BQU87Z0JBQ3ZCLFNBQVMsRUFBRSxLQUFLO2FBQ25CO1lBQ0QsUUFBUSxFQUFFO2dCQUNOLElBQUksRUFBRSxxQkFBUyxDQUFDLE9BQU87Z0JBQ3ZCLFlBQVksRUFBRSxzQkFBYztnQkFDNUIsU0FBUyxFQUFFLEtBQUs7YUFDbkI7U0FDRixFQUFFO1FBQ0QsOEJBQThCO1NBQy9CLENBQUMsQ0FBQztRQUdELGdGQUFnRjtRQUNoRix3QkFBd0I7UUFDeEIsNkRBQTZEO1FBQzdELElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7UUFDakMsb0RBQW9EO1FBQ3BELEdBQUcsQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFRCxRQUFRO1FBQ0osT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3RCLENBQUM7SUFFSyxRQUFRLENBQUMsV0FBMkI7O1lBQ3RDLGtFQUFrRTtZQUNsRSx3REFBd0Q7WUFDeEQsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLGlDQUFNLFdBQVcsS0FBRSxFQUFFLEVBQUUsV0FBVyxDQUFDLE9BQU8sSUFBRyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3JFLE9BQU8sV0FBVyxDQUFDLE9BQU8sQ0FBQztRQUMvQixDQUFDO0tBQUE7SUFFSyxZQUFZLENBQUMsT0FBZTs7WUFDOUIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN4QyxDQUFDO0tBQUE7SUFFSyxTQUFTLENBQUMsS0FBSyxHQUFHLEVBQUUsRUFBRSxJQUFJLEdBQUcsQ0FBQzs7WUFDaEMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLElBQUksR0FBRyxLQUFLLEVBQUMsQ0FBQyxDQUFDO1FBQ3JFLENBQUM7S0FBQTtJQUVLLGVBQWUsQ0FDakIsT0FBZSxFQUNmLFdBQXdDOztZQUV4QyxNQUFNLGFBQWEsR0FBRyxNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3pELE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQSxhQUFhLGFBQWIsYUFBYSx1QkFBYixhQUFhLENBQUUsTUFBTSxDQUFDO2dCQUN6QyxFQUFFLEVBQUUsT0FBTztnQkFDWCxXQUFXO2FBQ2QsQ0FBQyxDQUFBLENBQUM7WUFDSCxPQUFPLFFBQVEsQ0FBQztRQUNwQixDQUFDO0tBQUE7SUFFSyxpQkFBaUIsQ0FBQyxPQUFlOztZQUNuQyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQztRQUMvRCxDQUFDO0tBQUE7SUFFSyxlQUFlLENBQUMsTUFBYzs7WUFDaEMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDekQsQ0FBQztLQUFBO0NBQ0o7QUFFRCxrQkFBZSxJQUFJLFNBQVMsRUFBRSxDQUFDIn0=
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
const postgres_service_1 = __importDefault(require("../../common/services/postgres.service"));
const debug_1 = __importDefault(require("debug"));
const sequelize_1 = require("sequelize");
const log = (0, debug_1.default)('app:events-in-memory-dao');
class EventsDao {
    constructor() {
        this.db = postgres_service_1.default.getDatabase();
        // defining a model, represents a table in DB
        this.Event = this.db.define('Event', {
            id: {
                type: sequelize_1.DataTypes.STRING,
                primaryKey: true,
                allowNull: false
            },
            time: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            }
        }, {
        // Other model options go here
        });
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
    addEvent(eventFields) {
        return __awaiter(this, void 0, void 0, function* () {
            // An instance of the class represents one object from that model 
            // (which maps to one row of the table in the database).
            this.Event.build(Object.assign(Object.assign({}, eventFields), { id: eventFields.eventId })).save();
            return eventFields.eventId;
        });
    }
    getEventById(eventId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.Event.findByPk(eventId);
        });
    }
    getEvents(limit = 25, page = 0) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.Event.findAll({ limit: limit, offset: page * limit });
        });
    }
    updateEventById(eventId, eventFields) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingEvent = yield this.Event.findByPk(eventId);
            const newEvent = yield (existingEvent === null || existingEvent === void 0 ? void 0 : existingEvent.update({
                id: eventId,
                eventFields
            }));
            return newEvent;
        });
    }
    removeEventById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.Event.destroy({ where: { id: userId } });
        });
    }
}
exports.default = new EventsDao();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnRzLmRhby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2V2ZW50cy9kYW9zL2V2ZW50cy5kYW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFHQSw4RkFBOEQ7QUFJOUQsa0RBQTBCO0FBRTFCLHlDQUFzQztBQUd0QyxNQUFNLEdBQUcsR0FBb0IsSUFBQSxlQUFLLEVBQUMsMEJBQTBCLENBQUMsQ0FBQztBQUUvRCxNQUFNLFNBQVM7SUFtQlg7UUFqQkEsT0FBRSxHQUFHLDBCQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7UUFFNUIsNkNBQTZDO1FBQzdDLFVBQUssR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUU7WUFDNUIsRUFBRSxFQUFFO2dCQUNBLElBQUksRUFBRSxxQkFBUyxDQUFDLE1BQU07Z0JBQ3RCLFVBQVUsRUFBRSxJQUFJO2dCQUNoQixTQUFTLEVBQUUsS0FBSzthQUNuQjtZQUNELElBQUksRUFBRTtnQkFDRixJQUFJLEVBQUUscUJBQVMsQ0FBQyxNQUFNO2dCQUN0QixTQUFTLEVBQUUsS0FBSzthQUNuQjtTQUNGLEVBQUU7UUFDRCw4QkFBOEI7U0FDL0IsQ0FBQyxDQUFDO1FBR0QsZ0ZBQWdGO1FBQ2hGLHdCQUF3QjtRQUN4Qiw2REFBNkQ7UUFDN0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUNqQyxvREFBb0Q7UUFDcEQsR0FBRyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVELFFBQVE7UUFDSixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDdEIsQ0FBQztJQUVLLFFBQVEsQ0FBQyxXQUEyQjs7WUFDdEMsa0VBQWtFO1lBQ2xFLHdEQUF3RDtZQUN4RCxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssaUNBQU0sV0FBVyxLQUFFLEVBQUUsRUFBRSxXQUFXLENBQUMsT0FBTyxJQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDckUsT0FBTyxXQUFXLENBQUMsT0FBTyxDQUFDO1FBQy9CLENBQUM7S0FBQTtJQUVLLFlBQVksQ0FBQyxPQUFlOztZQUM5QixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3hDLENBQUM7S0FBQTtJQUVLLFNBQVMsQ0FBQyxLQUFLLEdBQUcsRUFBRSxFQUFFLElBQUksR0FBRyxDQUFDOztZQUNoQyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsSUFBSSxHQUFHLEtBQUssRUFBQyxDQUFDLENBQUM7UUFDckUsQ0FBQztLQUFBO0lBRUssZUFBZSxDQUNqQixPQUFlLEVBQ2YsV0FBd0M7O1lBRXhDLE1BQU0sYUFBYSxHQUFHLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDekQsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFBLGFBQWEsYUFBYixhQUFhLHVCQUFiLGFBQWEsQ0FBRSxNQUFNLENBQUM7Z0JBQ3pDLEVBQUUsRUFBRSxPQUFPO2dCQUNYLFdBQVc7YUFDZCxDQUFDLENBQUEsQ0FBQztZQUNILE9BQU8sUUFBUSxDQUFDO1FBQ3BCLENBQUM7S0FBQTtJQUVLLGVBQWUsQ0FBQyxNQUFjOztZQUNoQyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztRQUN6RCxDQUFDO0tBQUE7Q0FDSjtBQUVELGtCQUFlLElBQUksU0FBUyxFQUFFLENBQUMifQ==
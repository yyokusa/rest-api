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
const events_dao_1 = __importDefault(require("../daos/events.dao"));
const user_events_assoc_1 = __importDefault(require("../../common/assoc/user_events.assoc"));
const debug_1 = __importDefault(require("debug"));
const log = (0, debug_1.default)('app:event-service');
/**
 *  EventsService as a service singleton,
 *  the same pattern we used with our DAO.
 */
class EventsService {
    create(resource) {
        return __awaiter(this, void 0, void 0, function* () {
            log(resource);
            // importing it creates a singleton instance of the UserEventsDao
            user_events_assoc_1.default;
            return events_dao_1.default.addEvent(resource);
        });
    }
    assignUser(resource) {
        return __awaiter(this, void 0, void 0, function* () {
            return user_events_assoc_1.default.makeThingsHappen(resource);
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return `Delete count is: ${yield events_dao_1.default.removeEventById(id)};`;
        });
    }
    // layer of separation between the controller and the DAO
    list(limit, page) {
        return __awaiter(this, void 0, void 0, function* () {
            return events_dao_1.default.getEvents(limit, page);
        });
    }
    patchById(id, resource) {
        return __awaiter(this, void 0, void 0, function* () {
            return events_dao_1.default.updateEventById(id, resource);
        });
    }
    readById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return events_dao_1.default.getEventById(id);
        });
    }
    putById(id, resource) {
        return __awaiter(this, void 0, void 0, function* () {
            return events_dao_1.default.updateEventById(id, resource);
        });
    }
}
exports.default = new EventsService();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnRzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9ldmVudHMvc2VydmljZXMvZXZlbnRzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvRUFBMkM7QUFDM0MsNkZBQWlFO0FBS2pFLGtEQUEwQjtBQUcxQixNQUFNLEdBQUcsR0FBb0IsSUFBQSxlQUFLLEVBQUMsbUJBQW1CLENBQUMsQ0FBQztBQUN4RDs7O0dBR0c7QUFDSCxNQUFNLGFBQWE7SUFDVCxNQUFNLENBQUMsUUFBd0I7O1lBQ2pDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNkLGlFQUFpRTtZQUNqRSwyQkFBYSxDQUFBO1lBQ2IsT0FBTyxvQkFBUyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN4QyxDQUFDO0tBQUE7SUFFSyxVQUFVLENBQUMsUUFBNEI7O1lBQ3pDLE9BQU8sMkJBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNwRCxDQUFDO0tBQUE7SUFFSyxVQUFVLENBQUMsRUFBVTs7WUFDdkIsT0FBTyxvQkFBb0IsTUFBTSxvQkFBUyxDQUFDLGVBQWUsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFBO1FBQ3JFLENBQUM7S0FBQTtJQUNELHlEQUF5RDtJQUNuRCxJQUFJLENBQUMsS0FBYSxFQUFFLElBQVk7O1lBQ2xDLE9BQU8sb0JBQVMsQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzVDLENBQUM7S0FBQTtJQUVLLFNBQVMsQ0FBQyxFQUFVLEVBQUUsUUFBdUI7O1lBQy9DLE9BQU8sb0JBQVMsQ0FBQyxlQUFlLENBQUMsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ25ELENBQUM7S0FBQTtJQUVLLFFBQVEsQ0FBQyxFQUFVOztZQUNyQixPQUFPLG9CQUFTLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3RDLENBQUM7S0FBQTtJQUVLLE9BQU8sQ0FBQyxFQUFVLEVBQUUsUUFBcUI7O1lBQzNDLE9BQU8sb0JBQVMsQ0FBQyxlQUFlLENBQUMsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ25ELENBQUM7S0FBQTtDQUNKO0FBRUQsa0JBQWUsSUFBSSxhQUFhLEVBQUUsQ0FBQyJ9
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
const groups_dao_1 = __importDefault(require("../daos/groups.dao"));
const debug_1 = __importDefault(require("debug"));
const log = (0, debug_1.default)('app:event-service');
/**
 *  GroupsService as a service singleton,
 *  the same pattern we used with our DAO.
 */
class GroupsService {
    create(resource) {
        return __awaiter(this, void 0, void 0, function* () {
            log(resource);
            return groups_dao_1.default.addGroup(resource);
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return `Delete count is: ${yield groups_dao_1.default.removeGroupById(id)};`;
        });
    }
    // layer of separation between the controller and the DAO
    list(limit, page) {
        return __awaiter(this, void 0, void 0, function* () {
            return groups_dao_1.default.getGroups(limit, page);
        });
    }
    patchById(id, resource) {
        return __awaiter(this, void 0, void 0, function* () {
            return groups_dao_1.default.updateGroupById(id, resource);
        });
    }
    readById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return groups_dao_1.default.getGroupById(id);
        });
    }
    readByEventId(eventId) {
        return __awaiter(this, void 0, void 0, function* () {
            return groups_dao_1.default.getGroupByEventId(eventId);
        });
    }
    putById(id, resource) {
        return __awaiter(this, void 0, void 0, function* () {
            return groups_dao_1.default.updateGroupById(id, resource);
        });
    }
}
exports.default = new GroupsService();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JvdXAuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2dyb3Vwcy9zZXJ2aWNlcy9ncm91cC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0VBQTJDO0FBSzNDLGtEQUEwQjtBQUUxQixNQUFNLEdBQUcsR0FBb0IsSUFBQSxlQUFLLEVBQUMsbUJBQW1CLENBQUMsQ0FBQztBQUN4RDs7O0dBR0c7QUFDSCxNQUFNLGFBQWE7SUFDVCxNQUFNLENBQUMsUUFBd0I7O1lBQ2pDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNkLE9BQU8sb0JBQVMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDeEMsQ0FBQztLQUFBO0lBRUssVUFBVSxDQUFDLEVBQVU7O1lBQ3ZCLE9BQU8sb0JBQW9CLE1BQU0sb0JBQVMsQ0FBQyxlQUFlLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQTtRQUNyRSxDQUFDO0tBQUE7SUFDRCx5REFBeUQ7SUFDbkQsSUFBSSxDQUFDLEtBQWEsRUFBRSxJQUFZOztZQUNsQyxPQUFPLG9CQUFTLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM1QyxDQUFDO0tBQUE7SUFFSyxTQUFTLENBQUMsRUFBVSxFQUFFLFFBQXVCOztZQUMvQyxPQUFPLG9CQUFTLENBQUMsZUFBZSxDQUFDLEVBQUUsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUNuRCxDQUFDO0tBQUE7SUFFSyxRQUFRLENBQUMsRUFBVTs7WUFDckIsT0FBTyxvQkFBUyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN0QyxDQUFDO0tBQUE7SUFFSyxhQUFhLENBQUMsT0FBZTs7WUFDL0IsT0FBTyxvQkFBUyxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2hELENBQUM7S0FBQTtJQUVLLE9BQU8sQ0FBQyxFQUFVLEVBQUUsUUFBcUI7O1lBQzNDLE9BQU8sb0JBQVMsQ0FBQyxlQUFlLENBQUMsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ25ELENBQUM7S0FBQTtDQUNKO0FBRUQsa0JBQWUsSUFBSSxhQUFhLEVBQUUsQ0FBQyJ9
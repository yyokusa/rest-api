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
const group_service_1 = __importDefault(require("../services/group.service"));
const debug_1 = __importDefault(require("debug"));
const log = (0, debug_1.default)('app:users-controller');
class GroupsMiddleware {
    validateGroupDoesNotExist(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const group = yield group_service_1.default.readById(req.body.groupId);
            // @ts-ignore
            if (group) {
                res.status(409).send({
                    error: `Group ${req.body.groupId} already exists`,
                });
            }
            else {
                res.locals.group = group;
                next();
            }
        });
    }
    validateGroupExists(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const group = yield group_service_1.default.readById(req.params.groupId);
            log(":validategroupExists: ", group);
            // @ts-ignore
            if (group) {
                res.locals.group = group;
                next();
            }
            else {
                res.status(404).send({
                    error: `User ${req.params.groupId} not found`,
                });
            }
        });
    }
    extractGroupId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            req.body.id = req.body.groupId;
            next();
        });
    }
}
exports.default = new GroupsMiddleware();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JvdXAubWlkZGxld2FyZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2dyb3Vwcy9taWRkbGV3YXJlL2dyb3VwLm1pZGRsZXdhcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFDQSw4RUFBcUQ7QUFDckQsa0RBQTBCO0FBRTFCLE1BQU0sR0FBRyxHQUFvQixJQUFBLGVBQUssRUFBQyxzQkFBc0IsQ0FBQyxDQUFDO0FBQzNELE1BQU0sZ0JBQWdCO0lBRVoseUJBQXlCLENBQzNCLEdBQW9CLEVBQ3BCLEdBQXFCLEVBQ3JCLElBQTBCOztZQUUxQixNQUFNLEtBQUssR0FBRyxNQUFNLHVCQUFZLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDNUQsYUFBYTtZQUNiLElBQUksS0FBSyxFQUFFO2dCQUNQLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO29CQUNqQixLQUFLLEVBQUUsU0FBUyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8saUJBQWlCO2lCQUNwRCxDQUFDLENBQUM7YUFDTjtpQkFBTTtnQkFDSCxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7Z0JBQ3pCLElBQUksRUFBRSxDQUFDO2FBQ1Y7UUFDTCxDQUFDO0tBQUE7SUFFSyxtQkFBbUIsQ0FDckIsR0FBb0IsRUFDcEIsR0FBcUIsRUFDckIsSUFBMEI7O1lBRTFCLE1BQU0sS0FBSyxHQUFHLE1BQU0sdUJBQVksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUM5RCxHQUFHLENBQUMsd0JBQXdCLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDckMsYUFBYTtZQUNiLElBQUksS0FBSyxFQUFFO2dCQUNQLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztnQkFDekIsSUFBSSxFQUFFLENBQUM7YUFDVjtpQkFBTTtnQkFDSCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztvQkFDakIsS0FBSyxFQUFFLFFBQVEsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLFlBQVk7aUJBQ2hELENBQUMsQ0FBQzthQUNOO1FBQ0wsQ0FBQztLQUFBO0lBRUssY0FBYyxDQUNoQixHQUFvQixFQUNwQixHQUFxQixFQUNyQixJQUEwQjs7WUFFMUIsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDL0IsSUFBSSxFQUFFLENBQUM7UUFDWCxDQUFDO0tBQUE7Q0FFSjtBQUVELGtCQUFlLElBQUksZ0JBQWdCLEVBQUUsQ0FBQyJ9
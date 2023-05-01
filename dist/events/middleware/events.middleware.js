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
const events_service_1 = __importDefault(require("../services/events.service"));
const users_service_1 = __importDefault(require("../../users/services/users.service"));
const group_service_1 = __importDefault(require("../../groups/services/group.service"));
const debug_1 = __importDefault(require("debug"));
const log = (0, debug_1.default)('app:users-controller');
class EventsMiddleware {
    validateEventDoesNotExist(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const event = yield events_service_1.default.readById(req.body.eventId);
            // @ts-ignore
            if (event) {
                res.status(409).send({
                    error: `Event ${req.body.eventId} already exists`,
                });
            }
            else {
                res.locals.event = event;
                next();
            }
        });
    }
    validateEventExists(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const event = yield events_service_1.default.readById(req.params.eventId);
            log(":validateEventExists: ", event);
            // @ts-ignore
            if (event) {
                res.locals.event = event;
                next();
            }
            else {
                res.status(404).send({
                    error: `Event ${req.params.eventId} not found`,
                });
            }
        });
    }
    // check if user is already registered for event
    validateUserIsNotRegistered(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const event = yield events_service_1.default.readById(req.params.eventId);
            // get user
            const user = yield users_service_1.default.readById(req.body.userId);
            // get all event groups and check if user is already registered
            const eventGroups = yield group_service_1.default.readByEventId(req.params.eventId);
            const userExists = eventGroups.some((group) => {
                group.hasUser(user);
            });
            if (userExists) {
                // get the group user exists in
                const group = eventGroups.find((group) => {
                    group.hasUser(user);
                });
                if (group === undefined) {
                    return res.status(404).send();
                }
                res.status(201).send({
                    groupId: group.id,
                    playerIds: group.getUsers().map((user) => user.id)
                });
            }
            else {
                res.locals.event = event;
                next();
            }
        });
    }
    extractEventIdFromBody(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            req.body.id = req.body.eventId;
            next();
        });
    }
    extractEventIdFromParams(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            req.body.eventId = req.params.eventId;
            next();
        });
    }
}
exports.default = new EventsMiddleware();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnRzLm1pZGRsZXdhcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9ldmVudHMvbWlkZGxld2FyZS9ldmVudHMubWlkZGxld2FyZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUNBLGdGQUFzRDtBQUN0RCx1RkFBOEQ7QUFDOUQsd0ZBQStEO0FBQy9ELGtEQUEwQjtBQUkxQixNQUFNLEdBQUcsR0FBb0IsSUFBQSxlQUFLLEVBQUMsc0JBQXNCLENBQUMsQ0FBQztBQUMzRCxNQUFNLGdCQUFnQjtJQUVaLHlCQUF5QixDQUMzQixHQUFvQixFQUNwQixHQUFxQixFQUNyQixJQUEwQjs7WUFFMUIsTUFBTSxLQUFLLEdBQUcsTUFBTSx3QkFBWSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzVELGFBQWE7WUFDYixJQUFJLEtBQUssRUFBRTtnQkFDUCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztvQkFDakIsS0FBSyxFQUFFLFNBQVMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLGlCQUFpQjtpQkFDcEQsQ0FBQyxDQUFDO2FBQ047aUJBQU07Z0JBQ0gsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO2dCQUN6QixJQUFJLEVBQUUsQ0FBQzthQUNWO1FBQ0wsQ0FBQztLQUFBO0lBRUssbUJBQW1CLENBQ3JCLEdBQW9CLEVBQ3BCLEdBQXFCLEVBQ3JCLElBQTBCOztZQUUxQixNQUFNLEtBQUssR0FBRyxNQUFNLHdCQUFZLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDOUQsR0FBRyxDQUFDLHdCQUF3QixFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ3JDLGFBQWE7WUFDYixJQUFJLEtBQUssRUFBRTtnQkFDUCxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUss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
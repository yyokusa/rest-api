"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsRoutes = void 0;
const common_routes_config_1 = require("../common/common.routes.config");
const events_controller_1 = __importDefault(require("./controllers/events.controller"));
const events_middleware_1 = __importDefault(require("./middleware/events.middleware"));
const body_validation_middleware_1 = __importDefault(require("../common/middleware/body.validation.middleware"));
const express_validator_1 = require("express-validator");
const jwt_middleware_1 = __importDefault(require("../auth/middleware/jwt.middleware"));
const common_permission_middleware_1 = __importDefault(require("../common/middleware/common.permission.middleware"));
const common_permissionflag_enum_1 = require("../common/middleware/common.permissionflag.enum");
class EventsRoutes extends common_routes_config_1.CommonRoutesConfig {
    constructor(app) {
        super(app, 'EventsRoutes');
    }
    configureRoutes() {
        // get events
        this.app
            .route(`/events`)
            .get(jwt_middleware_1.default.validJWTNeeded, common_permission_middleware_1.default.permissionFlagRequired(common_permissionflag_enum_1.PermissionFlag.FREE_PERMISSION), events_controller_1.default.listEvents);
        // create an event
        this.app
            .route(`/events`)
            .post(
        // example: 2002-07-15
        jwt_middleware_1.default.validJWTNeeded, common_permission_middleware_1.default.permissionFlagRequired(common_permissionflag_enum_1.PermissionFlag.FREE_PERMISSION), events_middleware_1.default.validateEventDoesNotExist, (0, express_validator_1.body)('eventId').isString(), (0, express_validator_1.body)('time').isDate()
            .withMessage('Time must be valid a date with format YYYY-MM-DD'), body_validation_middleware_1.default.verifyBodyFieldsErrors, events_controller_1.default.createEvent);
        ;
        // assign a player to an event-group (join an event)
        // Player ID is obtained from the authorization (access token - JWT in this case)
        // Event ID is obtained from the request parameters (path)
        this.app.param(`eventId`, events_middleware_1.default.extractEventIdFromParams);
        this.app
            .route(`/eventsAndUser/:eventId`)
            .post(jwt_middleware_1.default.validJWTNeeded, events_middleware_1.default.validateEventExists, events_middleware_1.default.validateUserIsNotRegistered, common_permission_middleware_1.default.permissionFlagRequired(common_permissionflag_enum_1.PermissionFlag.FREE_PERMISSION), events_controller_1.default.assignUserToAnEvent);
        return this.app;
    }
}
exports.EventsRoutes = EventsRoutes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnRzLnJvdXRlcy5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9ldmVudHMvZXZlbnRzLnJvdXRlcy5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEseUVBQW9FO0FBQ3BFLHdGQUErRDtBQUMvRCx1RkFBOEQ7QUFFOUQsaUhBQXVGO0FBQ3ZGLHlEQUF5QztBQUN6Qyx1RkFBOEQ7QUFDOUQscUhBQXFGO0FBQ3JGLGdHQUFpRjtBQUdqRixNQUFhLFlBQWEsU0FBUSx5Q0FBa0I7SUFDaEQsWUFBWSxHQUF3QjtRQUNoQyxLQUFLLENBQUMsR0FBRyxFQUFFLGNBQWMsQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFRCxlQUFlO1FBRVgsYUFBYTtRQUNiLElBQUksQ0FBQyxHQUFHO2FBQ0gsS0FBSyxDQUFDLFNBQVMsQ0FBQzthQUNoQixHQUFHLENBQUMsd0JBQWEsQ0FBQyxjQUFjLEVBQzdCLHNDQUFvQixDQUFDLHNCQUFzQixDQUN2QywyQ0FBYyxDQUFDLGVBQWUsQ0FDakMsRUFDRCwyQkFBZ0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUVyQyxrQkFBa0I7UUFDbEIsSUFBSSxDQUFDLEdBQUc7YUFDSCxLQUFLLENBQUMsU0FBUyxDQUFDO2FBQ2hCLElBQUk7UUFDRCxzQkFBc0I7UUFDdEIsd0JBQWEsQ0FBQyxjQUFjLEVBQzVCLHNDQUFvQixDQUFDLHNCQUFzQixDQUN2QywyQ0FBYyxDQUFDLGVBQWUsQ0FDN0IsRUFDTCwyQkFBZ0IsQ0FBQyx5QkFBeUIsRUFDMUMsSUFBQSx3QkFBSSxFQUFDLFNBQVMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUMxQixJQUFBLHdCQUFJLEVBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxFQUFFO2FBQ2hCLFdBQVcsQ0FBQyxrREFBa0QsQ0FBQyxFQUNwRSxvQ0FBd0IsQ0FBQyxzQkFBc0IsRUFDL0MsMkJBQWdCLENBQUMsV0FBVyxDQUMvQixDQUFDO1FBQUEsQ0FBQztRQUVQLG9EQUFvRDtRQUNwRCxpRkFBaUY7UUFDakYsMERBQTBEO1FBQzFELElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSwyQkFBZ0IsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1FBQ3JFLElBQUksQ0FBQyxHQUFHO2FBQ0gsS0FBSyxDQUFDLHlCQUF5QixDQUFDO2FBQ2hDLElBQUksQ0FDRCx3QkFBYSxDQUFDLGNBQWMsRUFDNUIsMkJBQWdCLENBQUMsbUJBQW1CLEVBQ3BDLDJCQUFnQixDQUFDLDJCQUEyQixFQUM1QyxzQ0FBb0IsQ0FBQyxzQkFBc0IsQ0FDdkMsMkNBQWMsQ0FBQyxlQUFlLENBQ2pDLEVBQ0QsMkJBQWdCLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUU5QyxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUM7SUFDcEIsQ0FBQztDQUNKO0FBbERELG9DQWtEQyJ9
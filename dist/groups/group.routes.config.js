"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupsRoutes = void 0;
const common_routes_config_1 = require("../common/common.routes.config");
const groups_controller_1 = __importDefault(require("./controllers/groups.controller"));
const group_middleware_1 = __importDefault(require("./middleware/group.middleware"));
const body_validation_middleware_1 = __importDefault(require("../common/middleware/body.validation.middleware"));
const express_validator_1 = require("express-validator");
const jwt_middleware_1 = __importDefault(require("../auth/middleware/jwt.middleware"));
const common_permission_middleware_1 = __importDefault(require("../common/middleware/common.permission.middleware"));
const common_permissionflag_enum_1 = require("../common/middleware/common.permissionflag.enum");
class GroupsRoutes extends common_routes_config_1.CommonRoutesConfig {
    constructor(app) {
        super(app, 'GroupsRoutes');
    }
    configureRoutes() {
        this.app
            .route(`/groups`)
            .get(jwt_middleware_1.default.validJWTNeeded, common_permission_middleware_1.default.permissionFlagRequired(common_permissionflag_enum_1.PermissionFlag.FREE_PERMISSION), groups_controller_1.default.listGroups);
        this.app
            .route(`/groups`)
            .post(
        // example: 2002-07-15
        jwt_middleware_1.default.validJWTNeeded, common_permission_middleware_1.default.permissionFlagRequired(common_permissionflag_enum_1.PermissionFlag.FREE_PERMISSION), group_middleware_1.default.validateGroupDoesNotExist, (0, express_validator_1.body)('eventId').isString(), (0, express_validator_1.body)('time').isDate()
            .withMessage('Time must be valid a date with format YYYY-MM-DD'), body_validation_middleware_1.default.verifyBodyFieldsErrors, groups_controller_1.default.createGroup);
        return this.app;
    }
}
exports.GroupsRoutes = GroupsRoutes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JvdXAucm91dGVzLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2dyb3Vwcy9ncm91cC5yb3V0ZXMuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHlFQUFvRTtBQUNwRSx3RkFBK0Q7QUFDL0QscUZBQTZEO0FBRTdELGlIQUF1RjtBQUN2Rix5REFBeUM7QUFDekMsdUZBQThEO0FBQzlELHFIQUFxRjtBQUNyRixnR0FBaUY7QUFFakYsTUFBYSxZQUFhLFNBQVEseUNBQWtCO0lBQ2hELFlBQVksR0FBd0I7UUFDaEMsS0FBSyxDQUFDLEdBQUcsRUFBRSxjQUFjLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRUQsZUFBZTtRQUNYLElBQUksQ0FBQyxHQUFHO2FBQ0gsS0FBSyxDQUFDLFNBQVMsQ0FBQzthQUNoQixHQUFHLENBQUMsd0JBQWEsQ0FBQyxjQUFjLEVBQzdCLHNDQUFvQixDQUFDLHNCQUFzQixDQUN2QywyQ0FBYyxDQUFDLGVBQWUsQ0FDakMsRUFDRCwyQkFBZ0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUVyQyxJQUFJLENBQUMsR0FBRzthQUNILEtBQUssQ0FBQyxTQUFTLENBQUM7YUFDaEIsSUFBSTtRQUNELHNCQUFzQjtRQUN0Qix3QkFBYSxDQUFDLGNBQWMsRUFDNUIsc0NBQW9CLENBQUMsc0JBQXNCLENBQ3ZDLDJDQUFjLENBQUMsZUFBZSxDQUM3QixFQUNMLDBCQUFnQixDQUFDLHlCQUF5QixFQUMxQyxJQUFBLHdCQUFJLEVBQUMsU0FBUyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQzFCLElBQUEsd0JBQUksRUFBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLEVBQUU7YUFDaEIsV0FBVyxDQUFDLGtEQUFrRCxDQUFDLEVBQ3BFLG9DQUF3QixDQUFDLHNCQUFzQixFQUMvQywyQkFBZ0IsQ0FBQyxXQUFXLENBQy9CLENBQUM7UUFFTixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUM7SUFDcEIsQ0FBQztDQUNKO0FBaENELG9DQWdDQyJ9
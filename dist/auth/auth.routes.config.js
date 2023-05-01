"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const common_routes_config_1 = require("../common/common.routes.config");
const auth_controller_1 = __importDefault(require("./controllers/auth.controller"));
const auth_middleware_1 = __importDefault(require("./middleware/auth.middleware"));
const jwt_middleware_1 = __importDefault(require("./middleware/jwt.middleware"));
const body_validation_middleware_1 = __importDefault(require("../common/middleware/body.validation.middleware"));
const express_validator_1 = require("express-validator");
class AuthRoutes extends common_routes_config_1.CommonRoutesConfig {
    constructor(app) {
        super(app, 'AuthRoutes');
    }
    configureRoutes() {
        // TODO: The requirement for a new post to /auth brings 
        // up a security scenario that’s worth bearing in mind. 
        // When a site owner changes a user’s permissions—for example, 
        // to attempt to lock out a misbehaving user—the user won’t see this take 
        // effect until their next JWT refresh. That’s because the permissions 
        // check uses the JWT data itself to avoid an extra database hit.
        this.app.post(`/auth`, [
            (0, express_validator_1.body)('email').isEmail(),
            (0, express_validator_1.body)('password').isString(),
            body_validation_middleware_1.default.verifyBodyFieldsErrors,
            auth_middleware_1.default.verifyUserPassword,
            auth_controller_1.default.createJWT,
        ]);
        // https://auth0.com/docs/secure/tokens/refresh-tokens/revoke-refresh-tokens
        // TODO: invalidate previous tokens and limit how often new ones can be requested.
        // this would be a good place to use a redis cache to store the refresh tokens
        this.app.post(`/auth/refresh-token`, [
            jwt_middleware_1.default.validJWTNeeded,
            jwt_middleware_1.default.verifyRefreshBodyField,
            jwt_middleware_1.default.validRefreshNeeded,
            auth_controller_1.default.createJWT,
        ]);
        return this.app;
    }
}
exports.AuthRoutes = AuthRoutes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5yb3V0ZXMuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vYXV0aC9hdXRoLnJvdXRlcy5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEseUVBQW9FO0FBQ3BFLG9GQUEyRDtBQUMzRCxtRkFBMEQ7QUFDMUQsaUZBQXdEO0FBRXhELGlIQUF1RjtBQUN2Rix5REFBeUM7QUFFekMsTUFBYSxVQUFXLFNBQVEseUNBQWtCO0lBQzlDLFlBQVksR0FBd0I7UUFDaEMsS0FBSyxDQUFDLEdBQUcsRUFBRSxZQUFZLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRUQsZUFBZTtRQUVYLHdEQUF3RDtRQUN4RCx3REFBd0Q7UUFDeEQsK0RBQStEO1FBQy9ELDBFQUEwRTtRQUMxRSx1RUFBdUU7UUFDdkUsaUVBQWlFO1FBQ2pFLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNuQixJQUFBLHdCQUFJLEVBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFO1lBQ3ZCLElBQUEsd0JBQUksRUFBQyxVQUFVLENBQUMsQ0FBQyxRQUFRLEVBQUU7WUFDM0Isb0NBQXdCLENBQUMsc0JBQXNCO1lBQy9DLHlCQUFjLENBQUMsa0JBQWtCO1lBQ2pDLHlCQUFjLENBQUMsU0FBUztTQUMzQixDQUFDLENBQUM7UUFDSCw0RUFBNEU7UUFDNUUsa0ZBQWtGO1FBQ2xGLDhFQUE4RTtRQUM5RSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsRUFBRTtZQUNqQyx3QkFBYSxDQUFDLGNBQWM7WUFDNUIsd0JBQWEsQ0FBQyxzQkFBc0I7WUFDcEMsd0JBQWEsQ0FBQyxrQkFBa0I7WUFDaEMseUJBQWMsQ0FBQyxTQUFTO1NBQzNCLENBQUMsQ0FBQztRQUNILE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQztJQUNwQixDQUFDO0NBQ0o7QUEvQkQsZ0NBK0JDIn0=
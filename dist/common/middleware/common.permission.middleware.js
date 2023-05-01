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
const common_permissionflag_enum_1 = require("./common.permissionflag.enum");
const debug_1 = __importDefault(require("debug"));
const log = (0, debug_1.default)('app:common-permission-middleware');
class CommonPermissionMiddleware {
    // factory function : https://refactoring.guru/design-patterns/factory-method
    permissionFlagRequired(requiredPermissionFlag) {
        return (req, res, next) => {
            try {
                const userPermissionFlags = parseInt(res.locals.jwt.permissionFlags);
                log("userPermissionFlags: ", userPermissionFlags);
                if (userPermissionFlags & requiredPermissionFlag) {
                    log("userPermissionFlags & requiredPermissionFlag: ", userPermissionFlags & requiredPermissionFlag);
                    next();
                }
                else {
                    log("userPermissionFlags: ", userPermissionFlags);
                    res.status(403).send();
                }
            }
            catch (e) {
                log("e: ", e);
                log(e);
            }
        };
    }
    onlySameUserOrAdminCanDoThisAction(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userPermissionFlags = parseInt(res.locals.jwt.permissionFlags);
            log("userPermissionFlags: ", userPermissionFlags);
            log("req.params: ", req.params);
            log("req.params.userId: ", req.params.userId);
            log("res.locals.jwt.userId: ", res.locals.jwt.userId);
            if (req.params &&
                req.params.userId &&
                req.params.userId === res.locals.jwt.userId) {
                return next();
            }
            else {
                if (userPermissionFlags & common_permissionflag_enum_1.PermissionFlag.ADMIN_PERMISSION) {
                    return next();
                }
                else {
                    log("userPermissionFlags: ", userPermissionFlags);
                    return res.status(403).send();
                }
            }
        });
    }
}
exports.default = new CommonPermissionMiddleware();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLnBlcm1pc3Npb24ubWlkZGxld2FyZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvbW1vbi9taWRkbGV3YXJlL2NvbW1vbi5wZXJtaXNzaW9uLm1pZGRsZXdhcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFDQSw2RUFBOEQ7QUFDOUQsa0RBQTBCO0FBRTFCLE1BQU0sR0FBRyxHQUFvQixJQUFBLGVBQUssRUFBQyxrQ0FBa0MsQ0FBQyxDQUFDO0FBRXZFLE1BQU0sMEJBQTBCO0lBRTVCLDZFQUE2RTtJQUM3RSxzQkFBc0IsQ0FBQyxzQkFBc0M7UUFDekQsT0FBTyxDQUNILEdBQW9CLEVBQ3BCLEdBQXFCLEVBQ3JCLElBQTBCLEVBQzVCLEVBQUU7WUFDQSxJQUFJO2dCQUNBLE1BQU0sbUJBQW1CLEdBQUcsUUFBUSxDQUNoQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQ2pDLENBQUM7Z0JBQ0YsR0FBRyxDQUFDLHVCQUF1QixFQUFFLG1CQUFtQixDQUFDLENBQUM7Z0JBQ2xELElBQUksbUJBQW1CLEdBQUcsc0JBQXNCLEVBQUU7b0JBQzlDLEdBQUcsQ0FBQyxnREFBZ0QsRUFBRSxtQkFBbUIsR0FBRyxzQkFBc0IsQ0FBQyxDQUFDO29CQUNwRyxJQUFJLEVBQUUsQ0FBQztpQkFDVjtxQkFBTTtvQkFDSCxHQUFHLENBQUMsdUJBQXVCLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztvQkFDbEQsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztpQkFDMUI7YUFDSjtZQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUNSLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ2QsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ1Y7UUFDTCxDQUFDLENBQUM7SUFDTixDQUFDO0lBRUssa0NBQWtDLENBQ3BDLEdBQW9CLEVBQ3BCLEdBQXFCLEVBQ3JCLElBQTBCOztZQUUxQixNQUFNLG1CQUFtQixHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUNyRSxHQUFHLENBQUMsdUJBQXVCLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztZQUNsRCxHQUFHLENBQUMsY0FBYyxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNoQyxHQUFHLENBQUMscUJBQXFCLEVBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUM5QyxHQUFHLENBQUMseUJBQXlCLEVBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDdEQsSUFDSSxHQUFHLENBQUMsTUFBTTtnQkFDVixHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU07Z0JBQ2pCLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxLQUFLLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFDN0M7Z0JBQ0UsT0FBTyxJQUFJLEVBQUUsQ0FBQzthQUNqQjtpQkFBTTtnQkFDSCxJQUFJLG1CQUFtQixHQUFHLDJDQUFjLENBQUMsZ0JBQWdCLEVBQUU7b0JBQ3ZELE9BQU8sSUFBSSxFQUFFLENBQUM7aUJBQ2pCO3FCQUFNO29CQUNILEdBQUcsQ0FBQyx1QkFBdUIsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO29CQUNsRCxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7aUJBQ2pDO2FBQ0o7UUFDTCxDQUFDO0tBQUE7Q0FFSjtBQUVELGtCQUFlLElBQUksMEJBQTBCLEVBQUUsQ0FBQyJ9
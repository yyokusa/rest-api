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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
const users_service_1 = __importDefault(require("../../users/services/users.service"));
const debug_1 = __importDefault(require("debug"));
const log = (0, debug_1.default)('app:jwt-middleware');
// @ts-expect-error
const jwtSecret = process.env.JWT_SECRET;
class JwtMiddleware {
    verifyRefreshBodyField(req, res, next) {
        if (req.body && req.body.refreshToken) {
            return next();
        }
        else {
            return res
                .status(400)
                .send({ errors: ['Missing required field: refreshToken'] });
        }
    }
    validRefreshNeeded(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield users_service_1.default.getUserByEmailWithPassword(res.locals.jwt.email);
            const salt = crypto_1.default.createSecretKey(Buffer.from(res.locals.jwt.refreshKey.data));
            const hash = crypto_1.default
                .createHmac('sha512', salt)
                .update(res.locals.jwt.userId + jwtSecret)
                .digest('base64');
            if (hash === req.body.refreshToken) {
                req.body = {
                    userId: user.id,
                    email: user.email,
                    permissionFlags: user.permissionFlags,
                };
                return next();
            }
            else {
                return res.status(400).send({ errors: ['Invalid refresh token'] });
            }
        });
    }
    validJWTNeeded(req, res, next) {
        if (req.headers['authorization']) {
            try {
                const authorization = req.headers['authorization'].split(' ');
                log("authorization: ", authorization);
                if (authorization[0] !== 'Bearer') {
                    return res.status(401).send();
                }
                else {
                    // The variables set on res.locals are available within a 
                    // single request-response cycle, and will not be shared between requests.
                    res.locals.jwt = jsonwebtoken_1.default.verify(authorization[1], jwtSecret);
                    req.body.userId = res.locals.jwt.userId;
                    log("res.locals.jwt: ", res.locals.jwt);
                    next();
                }
            }
            catch (err) {
                log(":validJWTNeeded: ", err);
                return res.status(403).send();
            }
        }
        else {
            return res.status(401).send();
        }
    }
}
exports.default = new JwtMiddleware();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiand0Lm1pZGRsZXdhcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9hdXRoL21pZGRsZXdhcmUvand0Lm1pZGRsZXdhcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFDQSxnRUFBK0I7QUFDL0Isb0RBQTRCO0FBRTVCLHVGQUE4RDtBQUM5RCxrREFBMEI7QUFFMUIsTUFBTSxHQUFHLEdBQW9CLElBQUEsZUFBSyxFQUFDLG9CQUFvQixDQUFDLENBQUM7QUFFekQsbUJBQW1CO0FBQ25CLE1BQU0sU0FBUyxHQUFXLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDO0FBRWpELE1BQU0sYUFBYTtJQUNmLHNCQUFzQixDQUNsQixHQUFvQixFQUNwQixHQUFxQixFQUNyQixJQUEwQjtRQUUxQixJQUFJLEdBQUcsQ0FBQyxJQUFJLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDbkMsT0FBTyxJQUFJLEVBQUUsQ0FBQztTQUNqQjthQUFNO1lBQ0gsT0FBTyxHQUFHO2lCQUNMLE1BQU0sQ0FBQyxHQUFHLENBQUM7aUJBQ1gsSUFBSSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsc0NBQXNDLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDbkU7SUFDTCxDQUFDO0lBRUssa0JBQWtCLENBQ3BCLEdBQW9CLEVBQ3BCLEdBQXFCLEVBQ3JCLElBQTBCOztZQUUxQixNQUFNLElBQUksR0FBUSxNQUFNLHVCQUFZLENBQUMsMEJBQTBCLENBQzNELEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FDdkIsQ0FBQztZQUNGLE1BQU0sSUFBSSxHQUFHLGdCQUFNLENBQUMsZUFBZSxDQUMvQixNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FDOUMsQ0FBQztZQUNGLE1BQU0sSUFBSSxHQUFHLGdCQUFNO2lCQUNkLFVBQVUsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDO2lCQUMxQixNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQztpQkFDekMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3RCLElBQUksSUFBSSxLQUFLLEdBQUcsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFO2dCQUNoQyxHQUFHLENBQUMsSUFBSSxHQUFHO29CQUNQLE1BQU0sRUFBRSxJQUFJLENBQUMsRUFBRTtvQkFDZixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7b0JBQ2pCLGVBQWUsRUFBRSxJQUFJLENBQUMsZUFBZTtpQkFDeEMsQ0FBQztnQkFDRixPQUFPLElBQUksRUFBRSxDQUFDO2FBQ2pCO2lCQUFNO2dCQUNILE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQyxFQUFFLENBQUMsQ0FBQzthQUN0RTtRQUNMLENBQUM7S0FBQTtJQUVELGNBQWMsQ0FDVixHQUFvQixFQUNwQixHQUFxQixFQUNyQixJQUEwQjtRQUUxQixJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLEVBQUU7WUFDOUIsSUFBSTtnQkFDQSxNQUFNLGFBQWEsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDOUQsR0FBRyxDQUFDLGlCQUFpQixFQUFFLGFBQWEsQ0FBQyxDQUFDO2dCQUN0QyxJQUFJLGFBQWEsQ0FBQyxDQUFDLENBQUMsS0FBSyxRQUFRLEVBQUU7b0JBQy9CLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztpQkFDakM7cUJBQU07b0JBQ0gsMERBQTBEO29CQUMxRCwwRUFBMEU7b0JBQzFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxHQUFHLHNCQUFHLENBQUMsTUFBTSxDQUN2QixhQUFhLENBQUMsQ0FBQyxDQUFDLEVBQ2hCLFNBQVMsQ0FDTCxDQUFDO29CQUNULEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQztvQkFDeEMsR0FBRyxDQUFDLGtCQUFrQixFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUE7b0JBQ3ZDLElBQUksRUFBRSxDQUFDO2lCQUNWO2FBQ0o7WUFBQyxPQUFPLEdBQUcsRUFBRTtnQkFDVixHQUFHLENBQUMsbUJBQW1CLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0JBQzlCLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUNqQztTQUNKO2FBQU07WUFDSCxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDakM7SUFDTCxDQUFDO0NBQ0o7QUFFRCxrQkFBZSxJQUFJLGFBQWEsRUFBRSxDQUFDIn0=
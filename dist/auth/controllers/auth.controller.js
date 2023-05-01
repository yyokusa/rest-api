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
const debug_1 = __importDefault(require("debug"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
const log = (0, debug_1.default)('app:auth-controller');
/**
* This value is automatically populated from .env, a file which you will have
* to create for yourself at the root of the project.
*
* See .env.example in the repo for the required format.
*/
// @ts-expect-error
const jwtSecret = process.env.JWT_SECRET;
const tokenExpirationInSeconds = 36000;
class AuthController {
    createJWT(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const refreshId = req.body.userId + jwtSecret;
                const salt = crypto_1.default.createSecretKey(crypto_1.default.randomBytes(16));
                const hash = crypto_1.default
                    .createHmac('sha512', salt)
                    .update(refreshId)
                    .digest('base64');
                req.body.refreshKey = salt.export();
                const token = jsonwebtoken_1.default.sign(req.body, jwtSecret, {
                    expiresIn: tokenExpirationInSeconds,
                });
                return res
                    .status(201)
                    .send({ accessToken: token, refreshToken: hash });
            }
            catch (err) {
                log('createJWT error: %O', err);
                return res.status(500).send();
            }
        });
    }
}
exports.default = new AuthController();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vYXV0aC9jb250cm9sbGVycy9hdXRoLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFDQSxrREFBMEI7QUFDMUIsZ0VBQStCO0FBQy9CLG9EQUE0QjtBQUU1QixNQUFNLEdBQUcsR0FBb0IsSUFBQSxlQUFLLEVBQUMscUJBQXFCLENBQUMsQ0FBQztBQUUxRDs7Ozs7RUFLRTtBQUNGLG1CQUFtQjtBQUNuQixNQUFNLFNBQVMsR0FBVyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQztBQUNqRCxNQUFNLHdCQUF3QixHQUFHLEtBQUssQ0FBQztBQUV2QyxNQUFNLGNBQWM7SUFDVixTQUFTLENBQUMsR0FBb0IsRUFBRSxHQUFxQjs7WUFDdkQsSUFBSTtnQkFDQSxNQUFNLFNBQVMsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUM7Z0JBQzlDLE1BQU0sSUFBSSxHQUFHLGdCQUFNLENBQUMsZUFBZSxDQUFDLGdCQUFNLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQzVELE1BQU0sSUFBSSxHQUFHLGdCQUFNO3FCQUNkLFVBQVUsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDO3FCQUMxQixNQUFNLENBQUMsU0FBUyxDQUFDO3FCQUNqQixNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ3RCLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDcEMsTUFBTSxLQUFLLEdBQUcsc0JBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUU7b0JBQ3hDLFNBQVMsRUFBRSx3QkFBd0I7aUJBQ3RDLENBQUMsQ0FBQztnQkFDSCxPQUFPLEdBQUc7cUJBQ0wsTUFBTSxDQUFDLEdBQUcsQ0FBQztxQkFDWCxJQUFJLENBQUMsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO2FBQ3pEO1lBQUMsT0FBTyxHQUFHLEVBQUU7Z0JBQ1YsR0FBRyxDQUFDLHFCQUFxQixFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUNoQyxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDakM7UUFDTCxDQUFDO0tBQUE7Q0FDSjtBQUVELGtCQUFlLElBQUksY0FBYyxFQUFFLENBQUMifQ==
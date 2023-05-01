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
const postgres_service_1 = __importDefault(require("../../common/services/postgres.service"));
const shortid_1 = __importDefault(require("shortid"));
const debug_1 = __importDefault(require("debug"));
const common_permissionflag_enum_1 = require("../../common/middleware/common.permissionflag.enum");
const sequelize_1 = require("sequelize");
const log = (0, debug_1.default)('app:users-in-memory-dao');
class UsersDao {
    constructor() {
        this.db = postgres_service_1.default.getDatabase();
        // defining a model, represents a table in DB
        this.User = this.db.define('User', {
            id: {
                type: sequelize_1.DataTypes.STRING,
                primaryKey: true,
                allowNull: false
            },
            email: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                unique: true
            },
            password: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false
            },
            level: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false
            },
            permissionFlags: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                defaultValue: common_permissionflag_enum_1.PermissionFlag.FREE_PERMISSION
            }
        }, {
        // Other model options go here
        });
        // creates the table if it doesn't exist (and does nothing if it already exists)
        // this.User.sync({  });
        // creates the table, dropping it first if it already existed
        this.User.sync({ force: true });
        log('Created new instance of UsersDao');
    }
    getModel() {
        return this.User;
    }
    addUser(userFields) {
        return __awaiter(this, void 0, void 0, function* () {
            // An instance of the class represents one object from that model 
            // (which maps to one row of the table in the database).
            const userId = shortid_1.default.generate();
            const janeDoe = this.User.build(Object.assign({ id: userId }, userFields));
            yield janeDoe.save();
            return userId;
        });
    }
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.User.findOne({ where: { email: email } });
        });
    }
    getUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.User.findByPk(userId);
        });
    }
    getUsers(limit = 25, page = 0) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.User.findAll({ limit: limit, offset: page * limit });
        });
    }
    updateUserById(userId, userFields) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingUser = yield this.User.findByPk(userId);
            existingUser === null || existingUser === void 0 ? void 0 : existingUser.update({
                id: userId,
                userFields
            });
            return existingUser;
        });
    }
    removeUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.User.destroy({ where: { id: userId } });
        });
    }
    getUserByEmailWithPassword(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.User.findOne({
                where: { email: email },
                attributes: ['id', 'email', 'password', 'permissionFlags', 'level']
            });
        });
    }
}
exports.default = new UsersDao();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMuZGFvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vdXNlcnMvZGFvcy91c2Vycy5kYW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFHQSw4RkFBOEQ7QUFFOUQsc0RBQThCO0FBQzlCLGtEQUEwQjtBQUUxQixtR0FBb0Y7QUFFcEYseUNBQWlEO0FBR2pELE1BQU0sR0FBRyxHQUFvQixJQUFBLGVBQUssRUFBQyx5QkFBeUIsQ0FBQyxDQUFDO0FBRTlELE1BQU0sUUFBUTtJQWdDVjtRQTlCQSxPQUFFLEdBQWMsMEJBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN2Qyw2Q0FBNkM7UUFDN0MsU0FBSSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRTtZQUMxQixFQUFFLEVBQUU7Z0JBQ0EsSUFBSSxFQUFFLHFCQUFTLENBQUMsTUFBTTtnQkFDdEIsVUFBVSxFQUFFLElBQUk7Z0JBQ2hCLFNBQVMsRUFBRSxLQUFLO2FBQ25CO1lBQ0QsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRSxxQkFBUyxDQUFDLE9BQU87Z0JBQ3ZCLFNBQVMsRUFBRSxLQUFLO2dCQUNoQixNQUFNLEVBQUUsSUFBSTthQUNmO1lBQ0QsUUFBUSxFQUFFO2dCQUNOLElBQUksRUFBRSxxQkFBUyxDQUFDLE1BQU07Z0JBQ3RCLFNBQVMsRUFBRSxLQUFLO2FBQ25CO1lBQ0QsS0FBSyxFQUFFO2dCQUNQLElBQUksRUFBRSxxQkFBUyxDQUFDLE9BQU87Z0JBQ3ZCLFNBQVMsRUFBRSxLQUFLO2FBQ2Y7WUFDRCxlQUFlLEVBQUU7Z0JBQ2IsSUFBSSxFQUFFLHFCQUFTLENBQUMsT0FBTztnQkFDdkIsU0FBUyxFQUFFLEtBQUs7Z0JBQ2hCLFlBQVksRUFBRSwyQ0FBYyxDQUFDLGVBQWU7YUFDL0M7U0FDSixFQUFFO1FBQ0MsOEJBQThCO1NBQ2pDLENBQUMsQ0FBQztRQUdDLGdGQUFnRjtRQUNoRix3QkFBd0I7UUFDeEIsNkRBQTZEO1FBQzdELElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7UUFDaEMsR0FBRyxDQUFDLGtDQUFrQyxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVELFFBQVE7UUFDSixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDckIsQ0FBQztJQUVLLE9BQU8sQ0FBQyxVQUF5Qjs7WUFDbkMsa0VBQWtFO1lBQ2xFLHdEQUF3RDtZQUN4RCxNQUFNLE1BQU0sR0FBRyxpQkFBTyxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ2xDLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxpQkFBRyxFQUFFLEVBQUUsTUFBTSxJQUFLLFVBQVUsRUFBRyxDQUFDO1lBQy9ELE1BQU0sT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3JCLE9BQU8sTUFBTSxDQUFDO1FBQ2xCLENBQUM7S0FBQTtJQUVLLGNBQWMsQ0FBQyxLQUFhOztZQUM5QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztRQUMxRCxDQUFDO0tBQUE7SUFFSyxXQUFXLENBQUMsTUFBYzs7WUFDNUIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN0QyxDQUFDO0tBQUE7SUFFSyxRQUFRLENBQUMsS0FBSyxHQUFHLEVBQUUsRUFBRSxJQUFJLEdBQUcsQ0FBQzs7WUFDL0IsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLElBQUksR0FBRyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBQ3JFLENBQUM7S0FBQTtJQUVLLGNBQWMsQ0FDaEIsTUFBYyxFQUNkLFVBQXFDOztZQUVyQyxNQUFNLFlBQVksR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3RELFlBQVksYUFBWixZQUFZLHVCQUFaLFlBQVksQ0FBRSxNQUFNLENBQUM7Z0JBQ2pCLEVBQUUsRUFBRSxNQUFNO2dCQUNWLFVBQVU7YUFDYixDQUFDLENBQUM7WUFDSCxPQUFPLFlBQVksQ0FBQztRQUN4QixDQUFDO0tBQUE7SUFFSyxjQUFjLENBQUMsTUFBYzs7WUFDL0IsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDeEQsQ0FBQztLQUFBO0lBRUssMEJBQTBCLENBQUMsS0FBYTs7WUFDMUMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztnQkFDckIsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRTtnQkFDdkIsVUFBVSxFQUFFLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsaUJBQWlCLEVBQUUsT0FBTyxDQUFDO2FBQ3RFLENBQUMsQ0FBQztRQUNQLENBQUM7S0FBQTtDQUNKO0FBRUQsa0JBQWUsSUFBSSxRQUFRLEVBQUUsQ0FBQyJ9
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_dao_1 = __importDefault(require("../../users/daos/users.dao"));
const groups_dao_1 = __importDefault(require("../../groups/daos/groups.dao"));
const postgres_service_1 = __importDefault(require("../services/postgres.service"));
const sequelize_1 = require("sequelize");
const debug_1 = __importDefault(require("debug"));
const log = (0, debug_1.default)('app:assoc-user_groups_dao');
class UserGroupsDao {
    constructor() {
        this.db = postgres_service_1.default.getDatabase();
        this.User = users_dao_1.default.getModel();
        this.Group = groups_dao_1.default.getModel();
        const UserGroups = this.db.define('UserGroups', {
            GroupId: {
                type: sequelize_1.DataTypes.INTEGER,
                references: {
                    model: this.Group,
                    key: 'id'
                }
            },
            UserId: {
                type: sequelize_1.DataTypes.INTEGER,
                references: {
                    model: this.User,
                    key: 'id'
                }
            }
        });
        this.User.belongsToMany(this.Group, { through: UserGroups });
        this.Group.belongsToMany(this.User, { through: UserGroups });
        log('Created new instance of UserGroupsDao');
    }
    getModel() {
        return this.UserGroups;
    }
}
exports.default = new UserGroupsDao();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcl9ncm91cHMuYXNzb2MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9jb21tb24vYXNzb2MvdXNlcl9ncm91cHMuYXNzb2MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSwyRUFBa0Q7QUFDbEQsOEVBQXFEO0FBQ3JELG9GQUFvRDtBQUNwRCx5Q0FBc0M7QUFFdEMsa0RBQTBCO0FBRTFCLE1BQU0sR0FBRyxHQUFvQixJQUFBLGVBQUssRUFBQywyQkFBMkIsQ0FBQyxDQUFDO0FBRWhFLE1BQU0sYUFBYTtJQU1mO1FBTEEsT0FBRSxHQUFHLDBCQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDNUIsU0FBSSxHQUFHLG1CQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDM0IsVUFBSyxHQUFHLG9CQUFTLENBQUMsUUFBUSxFQUFFLENBQUM7UUFJekIsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFO1lBQzVDLE9BQU8sRUFBRTtnQkFDUCxJQUFJLEVBQUUscUJBQVMsQ0FBQyxPQUFPO2dCQUN2QixVQUFVLEVBQUU7b0JBQ1YsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO29CQUNqQixHQUFHLEVBQUUsSUFBSTtpQkFDVjthQUNGO1lBQ0QsTUFBTSxFQUFFO2dCQUNOLElBQUksRUFBRSxxQkFBUyxDQUFDLE9BQU87Z0JBQ3ZCLFVBQVUsRUFBRTtvQkFDVixLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUk7b0JBQ2hCLEdBQUcsRUFBRSxJQUFJO2lCQUNWO2FBQ0Y7U0FDRixDQUFDLENBQUM7UUFDTCxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUM7UUFDN0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDO1FBQzdELEdBQUcsQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFRCxRQUFRO1FBQ04sT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQ3pCLENBQUM7Q0FDSjtBQUVELGtCQUFlLElBQUksYUFBYSxFQUFFLENBQUMifQ==
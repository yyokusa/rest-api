"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const debug_1 = __importDefault(require("debug"));
const path_1 = __importDefault(require("path"));
const log = (0, debug_1.default)('app:database-service');
class PostgresService {
    constructor() {
        this.connectWithRetry = () => {
            log('Attempting database connection (will retry if needed)');
            // try to connect to the database
            const sequelize = new sequelize_1.Sequelize({
                dialect: 'sqlite',
                storage: path_1.default.join(__dirname, 'data/database_test.sqlite'),
                logging: msg => log(msg),
                retry: {
                    max: 3,
                    timeout: 10000,
                    match: 'SequelizeConnectionRefusedError',
                    backoffBase: 10000,
                    backoffExponent: 1.5,
                    name: '-----main database connection-----' // if user supplies string, it will be used when composing error/reporting messages; else if retry gets a callback, uses callback name in erroring/reporting; else (default) uses literal string 'unknown'
                }
            });
            sequelize.authenticate().then(() => {
                log('Connection has been established successfully.');
            }).catch((err) => {
                log('Unable to connect to the database:', err);
                log(sequelize);
                throw err;
            });
            return sequelize;
        };
        // connect to the database
        this.sequelize = this.connectWithRetry();
    }
    getDatabase() {
        return this.sequelize;
    }
}
exports.default = new PostgresService();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zdGdyZXMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9wb3N0Z3Jlcy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEseUNBQW9DO0FBQ3BDLGtEQUEwQjtBQUMxQixnREFBd0I7QUFDeEIsTUFBTSxHQUFHLEdBQW9CLElBQUEsZUFBSyxFQUFDLHNCQUFzQixDQUFDLENBQUM7QUFFM0QsTUFBTSxlQUFlO0lBSWpCO1FBU0EscUJBQWdCLEdBQUcsR0FBRyxFQUFFO1lBQ3BCLEdBQUcsQ0FBQyx1REFBdUQsQ0FBQyxDQUFDO1lBQzdELGlDQUFpQztZQUNqQyxNQUFNLFNBQVMsR0FBRyxJQUFJLHFCQUFTLENBQUM7Z0JBQ3hCLE9BQU8sRUFBRSxRQUFRO2dCQUNqQixPQUFPLEVBQUUsY0FBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsMkJBQTJCLENBQUM7Z0JBQzFELE9BQU8sRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUM7Z0JBQ3hCLEtBQUssRUFBRTtvQkFDSCxHQUFHLEVBQUUsQ0FBQztvQkFDTixPQUFPLEVBQUUsS0FBSztvQkFDZCxLQUFLLEVBQUUsaUNBQWlDO29CQUN4QyxXQUFXLEVBQUUsS0FBSztvQkFDbEIsZUFBZSxFQUFFLEdBQUc7b0JBQ3BCLElBQUksRUFBRyxvQ0FBb0MsQ0FBQywwTUFBME07aUJBQ3pQO2FBQ0osQ0FBQyxDQUFDO1lBRUgsU0FBUyxDQUFDLFlBQVksRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7Z0JBQy9CLEdBQUcsQ0FBQywrQ0FBK0MsQ0FBQyxDQUFDO1lBQ3pELENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO2dCQUNiLEdBQUcsQ0FBQyxvQ0FBb0MsRUFBRSxHQUFHLENBQUMsQ0FBQztnQkFDL0MsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUNmLE1BQU0sR0FBRyxDQUFDO1lBQ2QsQ0FBQyxDQUFDLENBQUM7WUFFSCxPQUFPLFNBQVMsQ0FBQztRQUNyQixDQUFDLENBQUE7UUFsQ0QsMEJBQTBCO1FBQzFCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFDN0MsQ0FBQztJQUVELFdBQVc7UUFDUCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDMUIsQ0FBQztDQTZCSjtBQUNELGtCQUFlLElBQUksZUFBZSxFQUFFLENBQUMifQ==
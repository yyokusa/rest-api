"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_events_assoc_1 = __importDefault(require("./user_events.assoc"));
const user_groups_assoc_1 = __importDefault(require("./user_groups.assoc"));
const postgres_service_1 = __importDefault(require("../services/postgres.service"));
class Associations {
    constructor() {
        this.db = postgres_service_1.default.getDatabase();
        user_events_assoc_1.default;
        user_groups_assoc_1.default;
        this.db.sync({ force: true });
    }
}
exports.default = new Associations();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5hc3NvYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvbW1vbi9hc3NvYy91c2VyLmFzc29jLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNEVBQWdEO0FBQ2hELDRFQUFnRDtBQUNoRCxvRkFBb0Q7QUFFcEQsTUFBTSxZQUFZO0lBR2Q7UUFGQSxPQUFFLEdBQUcsMEJBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUd4QiwyQkFBYSxDQUFDO1FBQ2QsMkJBQWEsQ0FBQztRQUNkLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7SUFDbEMsQ0FBQztDQUNKO0FBRUQsa0JBQWUsSUFBSSxZQUFZLEVBQUUsQ0FBQyJ9
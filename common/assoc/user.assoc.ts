import UserEventsDao from "./user_events.assoc";
import UserGroupsDao from "./user_groups.assoc";
import database from '../services/postgres.service';

class Associations {
    db = database.getDatabase();

    constructor() {
        UserEventsDao;
        UserGroupsDao;
        this.db.sync({ force: true });
    }
}

export default new Associations();

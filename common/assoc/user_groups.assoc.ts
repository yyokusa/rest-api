import UsersDao from '../../users/daos/users.dao';
import GroupsDao from '../../groups/daos/groups.dao';
import database from '../services/postgres.service';
import { DataTypes } from 'sequelize';

import debug from 'debug';

const log: debug.IDebugger = debug('app:assoc-user_groups_dao');

class UserGroupsDao {
    db = database.getDatabase();
    User = UsersDao.getModel();
    Group = GroupsDao.getModel();
    UserGroups: any;
    
    constructor() {
        const UserGroups = this.db.define('UserGroups', {
            GroupId: {
              type: DataTypes.INTEGER,
              references: {
                model: this.Group, // 'Groups' would also work
                key: 'id'
              }
            },
            UserId: {
              type: DataTypes.INTEGER,
              references: {
                model: this.User, // 'Users' would also work
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

export default new UserGroupsDao();

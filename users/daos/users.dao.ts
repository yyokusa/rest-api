import { CreateUserDto  } from "../dto/create.user.dto";
import { PutUserDto } from "../dto/put.user.dto";
import { PatchUserDto } from "../dto/patch.user.dto";
import database from '../../common/services/postgres.service';

import shortid from 'shortid';
import debug from 'debug';

import { PermissionFlag } from "../../common/middleware/common.permissionflag.enum";

import { DataTypes, Sequelize } from 'sequelize';


const log: debug.IDebugger = debug('app:users-in-memory-dao');

class UsersDao {

    db: Sequelize = database.getDatabase();
    // defining a model, represents a table in DB
    User = this.db.define('User', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false
        },
        email: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        level: {
        type: DataTypes.INTEGER,
        allowNull: false
        },
        permissionFlags: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: PermissionFlag.FREE_PERMISSION
        }
    }, {
        // Other model options go here
    });

    constructor() {
        // creates the table if it doesn't exist (and does nothing if it already exists)
        // this.User.sync({  });
        // creates the table, dropping it first if it already existed
        this.User.sync({ force: true });
        log('Created new instance of UsersDao');
    }

    getModel() {
        return this.User;
    }

    async addUser(userFields: CreateUserDto) {
        // An instance of the class represents one object from that model 
        // (which maps to one row of the table in the database).
        const userId = shortid.generate();
        const janeDoe = this.User.build({ id: userId, ...userFields });
        await janeDoe.save();
        return userId;
    }

    async getUserByEmail(email: string) {
        return this.User.findOne({ where: { email: email } });
    }
    
    async getUserById(userId: string) {
        return this.User.findByPk(userId);
    }
    
    async getUsers(limit = 25, page = 0) {
        return this.User.findAll({ limit: limit, offset: page * limit });
    }

    async updateUserById(
        userId: string,
        userFields: PatchUserDto | PutUserDto
    ) {
        const existingUser = await this.User.findByPk(userId);
        existingUser?.update({
            id: userId,
            userFields
        });
        return existingUser;
    }
    
    async removeUserById(userId: string) {
        return this.User.destroy({ where: { id: userId } });
    }
    
    async getUserByEmailWithPassword(email: string) {
        return this.User.findOne({ 
            where: { email: email },
            attributes: ['id', 'email', 'password', 'permissionFlags', 'level'] 
        });
    }
}

export default new UsersDao();

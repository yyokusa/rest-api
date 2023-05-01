import {Sequelize} from 'sequelize';
import debug from 'debug';
import path from 'path';
const log: debug.IDebugger = debug('app:database-service');

class PostgresService {

    private sequelize: Sequelize;

    constructor() {
        // connect to the database
        this.sequelize = this.connectWithRetry();
    }

    getDatabase() {
        return this.sequelize;
    }

    connectWithRetry = () => {
        log('Attempting database connection (will retry if needed)');
        // try to connect to the database
        const sequelize = new Sequelize({
                dialect: 'sqlite',
                storage: path.join(__dirname, '../../..', 'data/database_test.sqlite'),
                logging: msg => log(msg),
                retry: {
                    max: 3,
                    timeout: 10000, // throw if no response or error within millisecond timeout, default: undefined,
                    match: 'SequelizeConnectionRefusedError',
                    backoffBase: 10000, // Initial backoff duration in ms. Default: 100,
                    backoffExponent: 1.5, // Exponent to increase backoff each try. Default: 1.1
                    name:  '-----main database connection-----' // if user supplies string, it will be used when composing error/reporting messages; else if retry gets a callback, uses callback name in erroring/reporting; else (default) uses literal string 'unknown'
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
        }
}
export default new PostgresService();
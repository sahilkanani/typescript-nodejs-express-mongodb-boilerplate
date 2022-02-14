import config from 'config';
import type { IDbConfig } from '@interfaces/common';
import { connect, ConnectOptions, set } from 'mongoose';
import { getEnv } from '@utils/common';
import logger from './logger';
import { migrateUsers } from '../seeds/users';
import { migrateResources } from '../seeds/resources';

export default class DatabaseHelper {
  private static dbConfig: IDbConfig = config.get('dbConfig');
  private static env: string = getEnv();
  private static isDbAlreadyConnected = false;

  static connectToDb = async () => {
    if (!this.isDbAlreadyConnected) {
      const { host, port, database } = this.dbConfig;
      const connectionUrl = `mongodb://${host}:${port}/${database}`;
      const connectionOptions: ConnectOptions = {
        autoCreate: true,
      };

      if (process.env.LOG_MONGO_CALLS === 'true') {
        set('debug', true);
      }

      connect(connectionUrl, connectionOptions)
        .then(async () => {
          this.isDbAlreadyConnected = true;

          logger.info('---- Data migration started. Please wait... ----');

          await migrateUsers();
          await migrateResources();

          logger.info('---- Data migration completed. ----');
        })
        .catch((err) => {
          logger.error(
            `Error while connecting to mongo database: ${JSON.stringify(err)}`,
          );
          process.exit(1);
        });
    }
    return true;
  };
}

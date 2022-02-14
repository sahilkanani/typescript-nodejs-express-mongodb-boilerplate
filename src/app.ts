import '@/index';
import express from 'express';
import hpp from 'hpp';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import type { IRoute } from '@interfaces/common';
import { getEnv } from '@utils/common';
import logger from '@utils/logger';
import DatabaseHelper from '@utils/databaseHelper';
import errorMiddleware from '@middlewares/error.middleware';

class App {
  public app: express.Application;
  public port: string | number;
  public env: string;

  constructor(routes: IRoute[]) {
    this.app = express();
    this.port = process.env.port || 3000;
    this.env = getEnv();

    DatabaseHelper.connectToDb();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`--------- Env: ${this.env} ---------`);
      logger.info(`App listening to the port ${this.port}`);
      logger.info('------------------------------------');
    });
  }

  public getServer() {
    return this.app;
  }

  private initializeMiddlewares() {
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  private initializeRoutes(routes: IRoute[]) {
    routes.forEach((route) => {
      this.app.use('/', route.router);
    });
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App;

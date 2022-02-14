import { Router } from 'express';
import type { IRoute } from '@interfaces/common';
import AuthController from '@controllers/auth.controller';
import authMiddleware from '@middlewares/auth.middleware';

class AuthRoutes implements IRoute {
  public path = '/user/';
  public router = Router();
  private authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}login`, this.authController.login);
    this.router.post(
      `${this.path}logout`,
      authMiddleware,
      this.authController.logout,
    );
  }
}

export default AuthRoutes;

import { Request, Response, NextFunction } from 'express';
import AuthService from '@services/auth.service';
import success from '@utils/responseHelper';
import logger from '@utils/logger';
import type { IRequestWithUser, TLoginRequest } from '@interfaces/request';
import type { IAuthController } from '@interfaces/controller';

class AuthController implements IAuthController {
  private authService = new AuthService();

  public login = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const loginRequest: TLoginRequest = request.body;
      const cookie: string = await this.authService.login(loginRequest);

      return success({ cookie }, response);
    } catch (error) {
      next(error);
    }
  };

  public logout = async (
    request: IRequestWithUser,
    response: Response,
  ): Promise<void> => {
    logger.info(`Logout request from ${request.user.name}`);
    return success(
      {
        cookie: 'Authorization=; Max-age=0',
      },
      response,
    );
  };
}

export default AuthController;

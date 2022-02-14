import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import config from 'config';
import UserModel from '@models/users.model';
import type { ITokenData, IUserData } from '@interfaces/response';
import _ from 'lodash';
import type { IAuthService } from '@interfaces/service';
import logger from '@utils/logger';
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from '@utils/errors';
import type { TLoginRequest } from '@interfaces/request';

export default class AuthService implements IAuthService {
  public users = UserModel;

  private createToken(userData: IUserData): ITokenData {
    const secretKey: string = config.get('secretKey');
    const expiresIn = 3600;
    return {
      expiresIn,
      token: sign({ _id: userData._id }, secretKey, { expiresIn }),
    };
  }

  private createCookie(tokenData: ITokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }

  public async login(loginRequest: TLoginRequest): Promise<string> {
    if (_.isEmpty(loginRequest)) {
      logger.error('Bad Request: Missing email and password.');
      throw new BadRequestError('email and password are required.');
    }

    const { email, password } = loginRequest;

    if (_.isUndefined(email) || _.isNull(email)) {
      logger.error('Bad Request: Missing email.');
      throw new BadRequestError('email is required.');
    }

    if (_.isUndefined(password) || _.isNull(password)) {
      logger.error('Bad Request: Missing password.');
      throw new BadRequestError('password is required.');
    }

    const user: IUserData = await this.users.findOne({ email });
    if (_.isEmpty(user)) {
      logger.error('Error: User not found.');
      throw new NotFoundError(
        'There is no user associated with provided email id.',
      );
    }

    const isPwdMatched: boolean = await compare(
      loginRequest.password,
      user.password,
    );
    if (!isPwdMatched) {
      logger.error('Error: Wrong email/password.');
      throw new UnauthorizedError('Wrong email/password');
    }

    const tokenData: ITokenData = this.createToken(user);
    return this.createCookie(tokenData);
  }
}

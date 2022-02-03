import config from 'config';
import type { Response, NextFunction } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';
import UserModel from '@models/users.model';
import _ from 'lodash';
import type { IRequestWithUser } from '@interfaces/request';
import type { IUserData } from '@interfaces/response';
import { UnauthorizedError } from '@utils/errors';
import logger from '@utils/logger';

const authMiddlweare = async (
  request: IRequestWithUser,
  response: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const authHeader =
      request.header('Authorization') ?? request.header('authorization');
    const authToken =
      request.cookies['Authorization'] ||
      (authHeader ? authHeader.split('Bearer ')[1] : null);

    if (authToken) {
      const secretKey: string = config.get('secretKey');
      const verificationRes = (await verify(
        authToken,
        secretKey,
      )) as JwtPayload;
      if (!_.isEmpty(verificationRes)) {
        const user: IUserData = await UserModel.findOne(
          { _id: verificationRes._id },
          { name: 1, role: 1 },
        );
        if (!_.isEmpty(user)) {
          request.user = user;
          next();
        } else {
          logger.error(
            'Error while authenticating user: There is no user associated with provided token.',
          );
          next(new UnauthorizedError());
        }
      } else {
        logger.error(
          'Error while authenticating user: Wrong authentication token.',
        );
        next(new UnauthorizedError());
      }
    } else {
      logger.error(
        'Error while authenticating user: Missing authentication token.',
      );
      next(new UnauthorizedError());
    }
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      logger.error('Token expired.');
      next(new UnauthorizedError('Token Expired. Please login again.'));
    } else if (error.name === 'JsonWebTokenError') {
      logger.error('Invalid token.');
      next(new UnauthorizedError('Invalid token. Please login again.'));
    } else {
      logger.error('Error while authenticating user: Internal server error.');
      next(error);
    }
  }
};

export default authMiddlweare;

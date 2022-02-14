import type { Response, NextFunction } from 'express';
import type { IRequestWithUser } from '@interfaces/request';
import { UnauthorizedError, InternalServerError } from '@utils/errors';
import logger from '@/utils/logger';

const checkUserAccess = async (role: string, next: NextFunction) => {
  if (['public', 'only-admin'].indexOf(role) >= 0) {
    logger.error('User is not allowed to perform action on private resource.');
    next(new UnauthorizedError('Unauthorized action.'));
  } else {
    next();
  }
};

const accessMiddlweare = async (
  request: IRequestWithUser,
  response: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    if (request.method === 'GET') {
      const splittedPath = request.path.split('/');
      if (splittedPath[2] !== 'all') {
        await checkUserAccess(request.user.role, next);
      } else {
        next();
      }
    } else {
      await checkUserAccess(request.user.role, next);
    }
  } catch (error) {
    next(new InternalServerError());
  }
};

export default accessMiddlweare;

import type { Request, Response, NextFunction } from 'express';
import type { IError } from '@interfaces/common';
import logger from '@utils/logger';

const errorMiddleware = (
  error: IError,
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const status: number = error.status ?? 500;
    const message: string = error.message ?? 'Something went wrong.';

    logger.error(
      `Error: [${request.method}] ${request.path} : StatusCode: ${status}, Message: ${message}`,
    );
    response.status(status).json({ message });
  } catch (error) {
    next(error);
  }
};

export default errorMiddleware;

import type { IError } from '@interfaces/common';

export class HttpError extends Error implements IError {
  public status: number;
  public message: string;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

export class BadRequestError extends HttpError {
  constructor(message = 'Bad Request.') {
    super(400, message);
  }
}

export class UnauthorizedError extends HttpError {
  constructor(message = 'Unauthorized user.') {
    super(401, message);
  }
}

export class ForbiddenError extends HttpError {
  constructor(message = 'Forbidden.') {
    super(403, message);
  }
}

export class NotFoundError extends HttpError {
  constructor(message = 'Requested resource not found.') {
    super(404, message);
  }
}

export class InternalServerError extends HttpError {
  constructor(message = 'Something went wrong.') {
    super(500, message);
  }
}

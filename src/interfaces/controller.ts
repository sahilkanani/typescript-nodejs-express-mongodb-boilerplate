import type { Request, Response, NextFunction } from 'express';
import type { IRequestWithUser } from '@interfaces/request';

export interface IAuthController {
  login(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void>;
  logout(
    request: IRequestWithUser,
    response: Response,
    next: NextFunction,
  ): Promise<void>;
}

export interface IResourceController {
  addResource(
    request: IRequestWithUser,
    response: Response,
    next: NextFunction,
  ): Promise<void>;
  getResource(
    request: IRequestWithUser,
    response: Response,
    next: NextFunction,
  ): Promise<void>;
  getAllResources(
    request: IRequestWithUser,
    response: Response,
    next: NextFunction,
  ): Promise<void>;
  updateResource(
    request: IRequestWithUser,
    response: Response,
    next: NextFunction,
  ): Promise<void>;
  deleteResource(
    request: IRequestWithUser,
    response: Response,
    next: NextFunction,
  ): Promise<void>;
}

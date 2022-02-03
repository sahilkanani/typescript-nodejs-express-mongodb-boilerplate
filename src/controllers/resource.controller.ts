import { Response, NextFunction } from 'express';
import ResourceService from '@services/resource.service';
import success from '@utils/responseHelper';
import type { IRequestWithUser } from '@interfaces/request';
import type { IResourceController } from '@interfaces/controller';
import type { IResourceData } from '@interfaces/response';
import type { TAccessType } from '@interfaces/schema';
import { NotFoundError } from '../utils/errors';

class ResourceController implements IResourceController {
  private resourceService = new ResourceService();

  public getAllResources = async (
    request: IRequestWithUser,
    response: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      let splittedPath = request.path.split('/')[2];
      splittedPath = splittedPath === 'only-admin' ? 'admin' : splittedPath;

      const resources = await this.resourceService.getAllResources({
        accessType: splittedPath as TAccessType,
        user: request.user,
      });

      if (resources.length === 0) {
        throw new NotFoundError('Resource not found.');
      }
      return success({ data: { resourceData: resources } }, response);
    } catch (error) {
      next(error);
    }
  };

  public getResource = async (
    request: IRequestWithUser,
    response: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const resourceId = request.params.resourceId;

      const resource = await this.resourceService.getResource({
        resourceId,
        accessType: 'private',
        user: request.user,
      });
      return success(
        {
          data: { resourceData: resource },
        },
        response,
      );
    } catch (error) {
      next(error);
    }
  };

  public addResource = async (
    request: IRequestWithUser,
    response: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { name, type } = request.body;
      const resourceCreated: IResourceData =
        await this.resourceService.addResource({
          name,
          type,
          accessType: 'private',
          user: request.user,
        });
      return success(
        {
          data: { resourceData: resourceCreated },
        },
        response,
      );
    } catch (error) {
      next(error);
    }
  };

  public updateResource = async (
    request: IRequestWithUser,
    response: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { name, type } = request.body;
      const resourceId = request.params.resourceId;

      const resourceUpdated: IResourceData =
        await this.resourceService.updateResource({
          resourceId,
          name,
          type,
          accessType: 'private',
          user: request.user,
        });
      return success(
        {
          data: { resourceData: resourceUpdated },
        },
        response,
      );
    } catch (error) {
      next(error);
    }
  };

  public deleteResource = async (
    request: IRequestWithUser,
    response: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const resourceId = request.params.resourceId;

      await this.resourceService.deleteResource({
        resourceId,
        accessType: 'private',
        user: request.user,
      });
      return success({ data: {} }, response);
    } catch (error) {
      next(error);
    }
  };
}

export default ResourceController;

import { Router } from 'express';
import type { IRoute } from '@interfaces/common';
import ResourceController from '@controllers/resource.controller';
import authMiddleware from '@middlewares/auth.middleware';
import accessMiddleware from '@middlewares/access.middleware';

class ResourceRoutes implements IRoute {
  public path = '/resource/';
  public router = Router();
  private resourceController = new ResourceController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}public/all`,
      this.resourceController.getAllResources,
    );

    this.router.get(
      `${this.path}:type(private|only-admin)/all`,
      authMiddleware,
      accessMiddleware,
      this.resourceController.getAllResources,
    );

    this.router.get(
      `${this.path}private/:resourceId`,
      authMiddleware,
      accessMiddleware,
      this.resourceController.getResource,
    );

    this.router.post(
      `${this.path}private`,
      authMiddleware,
      accessMiddleware,
      this.resourceController.addResource,
    );

    this.router.put(
      `${this.path}private/:resourceId`,
      authMiddleware,
      accessMiddleware,
      this.resourceController.updateResource,
    );

    this.router.delete(
      `${this.path}private/:resourceId`,
      authMiddleware,
      accessMiddleware,
      this.resourceController.deleteResource,
    );
  }
}

export default ResourceRoutes;

import ResourceModel from '@models/resources.model';
import type { IResourceData } from '@interfaces/response';
import _ from 'lodash';
import type { IResourceService } from '@interfaces/service';
import logger from '@utils/logger';
import { BadRequestError, NotFoundError } from '@utils/errors';
import type {
  IAddResourceRequest,
  IGetAllResourcesRequest,
  IGetResourceRequest,
  IUpdateResourceRequest,
  IDeleteResourceRequest,
} from '@interfaces/request';
import { ObjectId } from 'mongodb';

export default class ResourceService implements IResourceService {
  public resources = ResourceModel;

  private async getResourceCount(filter = {}) {
    const resourceCount = await ResourceModel.count(filter);
    if (resourceCount === 0) {
      throw new NotFoundError('Resource not found.');
    }
    return resourceCount;
  }

  public async addResource(
    resourceRequest: IAddResourceRequest,
  ): Promise<IResourceData> {
    if (_.isEmpty(resourceRequest)) {
      logger.error('Bad Request: Missing resource name and type.');
      throw new BadRequestError('Resource name and type are required.');
    }

    const { name, type, accessType, user } = resourceRequest;

    if (_.isUndefined(name) || _.isNull(name)) {
      logger.error('Bad Request: Missing Resource Name.');
      throw new BadRequestError('name is required.');
    }

    if (_.isUndefined(type) || _.isNull(type)) {
      logger.error('Bad Request: Missing Resource Type.');
      throw new BadRequestError('type is required.');
    }

    const resourceData = new ResourceModel({
      name,
      type,
      accessType,
      createdBy: new ObjectId(user._id),
    });

    const resourceCreated = await resourceData.save();
    return _.pick(resourceCreated, ['_id', 'name', 'type']);
  }

  public async updateResource(
    resourceRequest: IUpdateResourceRequest,
  ): Promise<IResourceData> {
    if (_.isEmpty(resourceRequest)) {
      logger.error('Bad Request: Missing resource name and type.');
      throw new BadRequestError('Resource name and type are required.');
    }
    const { resourceId, name, type } = resourceRequest;

    if (_.isUndefined(resourceId) || _.isNull(resourceId)) {
      logger.error('Bad Request: Missing Resource Id.');
      throw new BadRequestError('resourceId is required.');
    }

    if (_.isUndefined(name) && _.isUndefined(type)) {
      logger.error('Bad Request: Either name or type is required');
      throw new BadRequestError(
        'Please provide either resource name or type to update.',
      );
    }

    await this.getResourceCount({ _id: resourceId });

    const resourceUpdated = await ResourceModel.findOneAndUpdate(
      { _id: resourceId },
      _.pick(resourceRequest, ['name', 'type']),
      { new: true },
    );
    return _.pick(resourceUpdated, ['_id', 'name', 'type']);
  }

  public async deleteResource(
    resourceRequest: IDeleteResourceRequest,
  ): Promise<void> {
    const resourceId = resourceRequest.resourceId;
    if (_.isUndefined(resourceId) || _.isNull(resourceId)) {
      logger.error('Bad Request: Missing resource id.');
      throw new BadRequestError('Please provide resourceId.');
    }

    await this.getResourceCount({ _id: resourceId });
    await ResourceModel.findOneAndDelete({ _id: resourceId });
  }

  public async getResource(
    resourceRequest: IGetResourceRequest,
  ): Promise<IResourceData> {
    const resourceId = resourceRequest.resourceId;
    if (_.isEmpty(resourceRequest)) {
      logger.error('Bad Request: Missing resource id.');
      throw new BadRequestError('Please provide resourceId');
    }

    await this.getResourceCount({ _id: resourceId });
    const resource = await ResourceModel.findOne({ _id: resourceId });
    return _.pick(resource, ['_id', 'name', 'type']);
  }

  public async getAllResources(
    resourceRequest: IGetAllResourcesRequest,
  ): Promise<IResourceData[]> {
    const { accessType, user } = resourceRequest;
    const filter =
      accessType === 'admin'
        ? { accessType: { $in: ['admin', 'private'] } }
        : { accessType };

    const resources = await ResourceModel.find(filter);

    switch (accessType) {
      case 'admin':
      case 'private': {
        return _.map(
          _.filter(
            resources,
            (resource) =>
              _.isUndefined(resource.createdBy) ||
              (resource.createdBy &&
                resource.createdBy.toString() === user._id.toString()),
          ),
          (resource) => _.pick(resource, ['_id', 'name', 'type']),
        );
      }
      default: {
        return _.map(resources, (resource) =>
          _.pick(resource, ['_id', 'name', 'type']),
        );
      }
    }
  }
}

import type { Document, Model } from 'mongoose';
import type { IUserSchema, IResourceSchema } from '@interfaces/schema';
import { IResourceData } from '@interfaces/response';
import {
  TLoginRequest,
  IAddResourceRequest,
  IGetAllResourcesRequest,
  IGetResourceRequest,
  IUpdateResourceRequest,
  IDeleteResourceRequest,
} from '@interfaces/request';

export interface IAuthService {
  users: Model<IUserSchema & Document<any, any, any>, {}, {}, {}>;

  login(loginRequest: TLoginRequest): Promise<string>;
}

export interface IResourceService {
  resources: Model<IResourceSchema & Document<any, any, any>, {}, {}, {}>;

  addResource(resourceRequest: IAddResourceRequest): Promise<IResourceData>;
  getAllResources(
    resourceRequest: IGetAllResourcesRequest,
  ): Promise<IResourceData[]>;
  getResource(resourceRequest: IGetResourceRequest): Promise<IResourceData>;
  updateResource(
    resourceRequest: IUpdateResourceRequest,
  ): Promise<IResourceData>;
  deleteResource(resourceRequest: IDeleteResourceRequest): Promise<void>;
}

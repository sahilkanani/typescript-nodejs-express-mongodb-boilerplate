import type { Request } from 'express';
import type { IUserData } from '@interfaces/response';
import type { TAccessType } from '@interfaces/schema';

export interface IRequestWithUser extends Request {
  user: IUserData;
}

export type TLoginRequest = Pick<IUserData, 'email' | 'password'>;

export interface IAddResourceRequest {
  name: string;
  type: string;
  accessType: TAccessType;
  user?: IUserData;
}

export interface IGetAllResourcesRequest {
  accessType: TAccessType;
  user?: IUserData;
}

export interface IGetResourceRequest {
  resourceId: string;
  accessType: TAccessType;
  user?: IUserData;
}

export interface IUpdateResourceRequest {
  resourceId: string;
  name?: string;
  type?: string;
  accessType: TAccessType;
  user?: IUserData;
}

export interface IDeleteResourceRequest {
  resourceId: string;
  accessType: TAccessType;
  user?: IUserData;
}

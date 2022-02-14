import type { ObjectId } from 'mongodb';

export type TAccessType = 'admin' | 'private' | 'public';

export interface IUserSchema {
  name: string;
  email: string;
  password: string;
  role: TAccessType;
}

export interface IResourceSchema {
  name: string;
  type: string;
  accessType: TAccessType;
  createdBy: ObjectId;
}

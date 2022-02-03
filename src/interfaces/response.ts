import type { TAccessType } from '@interfaces/schema';

type TAllPrimTypes = string | number | boolean | null | undefined | Object;
type TAllTypes = TAllPrimTypes | TAllPrimTypes[];
interface IObjectAny {
  [key: string]: TAllTypes;
}

export interface ITokenData {
  token: string;
  expiresIn: number;
}

export interface IUserData {
  _id?: string;
  email: string;
  name: string;
  password: string;
  role: TAccessType;
}

export interface IResourceData {
  _id?: string;
  name: string;
  type: string;
  accessType?: TAccessType;
}

export interface IResponseData {
  cookie?: string;
  status?: number;
  data?: IObjectAny;
}

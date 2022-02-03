import type { IResponseData } from '@interfaces/response';
import type { Response } from 'express';

const success = (responseData: IResponseData, response: Response) => {
  if (responseData.cookie) {
    response.setHeader('Set-Cookie', [responseData.cookie]);
  }

  response.set(responseData.status || 200).json(responseData.data || {});
};

export default success;

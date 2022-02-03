import type { Router } from 'express';

export interface IRoute {
  path: string;
  router: Router;
}

export interface IDbConfig {
  host: string;
  port: number;
  database: string;
}

export interface IError {
  status: number;
  message: string;
}

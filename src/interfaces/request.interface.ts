import { Request } from "express";

export interface RequestWithParams extends Request {
  user?: any;
  token?: string;
}
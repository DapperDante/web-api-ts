import { ErrorFactory } from "../classes/error.class";
import redis from "../connections/redis.connection";
import { RouteHandler } from "../interfaces/route.interface";

export const checkBlacklist: RouteHandler = async (req, res, next) => {
  try{
    const { token } = req;
    const isBlackListed = await redis.get(`blacklist:${token!}`);
    if(isBlackListed){
      throw ErrorFactory.createError("PermissionDeniedError", "You are blacklisted from this resource")
    }
    next();
  }catch(err){
    next(err);
  }
};

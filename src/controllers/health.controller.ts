import { RouteHandler } from "../interfaces/route.interface";
import { dbComponent, redisComponent } from "../server";

export const healthCheck: RouteHandler = async (req, res, next) => {
	res.status(200).json({
		api: "ok",
		database: await dbComponent.healthCheck(),
		redis: await redisComponent.healthCheck(),
		timestamp: new Date().toISOString(),
	});
};

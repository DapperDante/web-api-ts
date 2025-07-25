import database from "../connections/db.connection";
import redis from "../connections/redis.connection";
import { RouteHandler } from "../interfaces/route.interface";

export const healthCheck: RouteHandler = async (req, res, next) => {
	res.status(200).json({
		api: "ok",
		database: await healthDatabase(),
		redis: await healthRedis(),
		timestamp: new Date().toISOString(),
	});
};

const healthDatabase = async () => {
	let result;
	await database
		.query("SELECT 1")
		.then(() => {
			result = "ok";
		})
		.catch(() => {
			result = "error";
		});
	return result;
};

const healthRedis = async () => {
	let result;
	await redis
		.ping()
		.then(() => {
			result = "ok";
		})
		.catch(() => {
			result = "error";
		});
	return result;
};

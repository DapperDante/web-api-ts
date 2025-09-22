import { createClient, RedisClientType } from "redis";
import { Component } from "../interfaces/component.interface";
import { appEnv, redisEnv } from "../config/env.config";
import { RateLimiterRedis } from "rate-limiter-flexible";
import { loggerSystem } from "../config/logger.config";

export class RedisComponent implements Component {
	private _component: RedisClientType;
	private _rateLimiter: RateLimiterRedis;
	constructor() {
		this._component = createClient({
			socket: {
				host: redisEnv.REDIS_HOST,
				port: redisEnv.REDIS_PORT,
				connectTimeout: 2000,
			},
		});
		this._rateLimiter = new RateLimiterRedis({
			storeClient: this._component,
			keyPrefix: "middleware",
			points: appEnv.API_RATE_LIMIT,
			duration: 15 * 60,
			useRedisPackage: true,
		});
	}
	connect() {
		this._component
			.connect()
			.then(() => {
				console.log("Redis connected successfully");
			})
			.catch(error => {
				loggerSystem.error(`Redis connection failed: ${error.message}`);
			});
	}
	async healthCheck() {
		return this._component
			.ping()
			.then(() => true)
			.catch(() => false);
	}

	get component() {
		return this._component;
	}
	get rateLimiter() {
		return this._rateLimiter;
	}
}

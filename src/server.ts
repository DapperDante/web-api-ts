import app from "./app";
import { appEnv } from "./config/env.config";
import { loggerSystem } from "./config/logger.config";
import database from "./connections/db.connection";
import redis from "./connections/redis.connection";

database
	.authenticate()
	.then(() => {
		console.log(`Database connected successfully to: ${database.getDatabaseName()}`);
	})
	.catch(error => {
		loggerSystem.error(`Database connection failed: ${error.message}`);
	});

redis
	.connect()
	.then(() => {
		console.log("Redis connected successfully");
	})
	.catch(error => {
		loggerSystem.error(`Redis connection failed: ${error.message}`);
	});

const server = app.listen(appEnv.PORT);

server.on("listening", () => {
	console.log(`Server is running on port ${appEnv.PORT}`);
});

server.on("error", error => {
	loggerSystem.error(`Server error: ${error.message}`);
});

server.keepAliveTimeout = appEnv.API_KEEP_ALIVE_TIMEOUT;
server.headersTimeout = appEnv.API_HEADERS_TIMEOUT;

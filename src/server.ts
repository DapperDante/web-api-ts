import app from "./app";
import { DatabaseComponent } from "./components/database.component";
import { RedisComponent } from "./components/redis.component";
import { appEnv } from "./config/env.config";
import { loggerSystem } from "./config/logger.config";

const dbComponent = new DatabaseComponent();
dbComponent.connect();
const redisComponent = new RedisComponent();
redisComponent.connect();

const server = app.listen(appEnv.PORT);

server.on("listening", () => {
	console.log(`Server is running on port ${appEnv.PORT}`);
});

server.on("error", error => {
	loggerSystem.error(`Server error: ${error.message}`);
});

server.keepAliveTimeout = appEnv.API_KEEP_ALIVE_TIMEOUT;
server.headersTimeout = appEnv.API_HEADERS_TIMEOUT;

export {
	dbComponent,
	redisComponent
}
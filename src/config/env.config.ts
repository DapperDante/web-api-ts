import dotenv from "dotenv";
dotenv.config();

const appEnv = {
	PORT: process.env.PORT,
	NODE_ENV: process.env.NODE_ENV,
	PRODUCTION: process.env.NODE_ENV === "production",
	CORS_ORIGINS: process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split(',') : '*',
	JWT_SECRET: process.env.JWT_SECRET!,
	BCRYPT_SALT_ROUNDS: Number(process.env.BCRYPT_SALT_ROUNDS),
	API_RATE_LIMIT: process.env.API_RATE_LIMIT ? Number(process.env.API_RATE_LIMIT) : 100,
	API_PAYLOAD_LIMIT: process.env.API_PAYLOAD_LIMIT ? process.env.API_PAYLOAD_LIMIT : '1mb',
	API_TIMEOUT_RESPONSE: process.env.API_TIMEOUT_RESPONSE ? Number(process.env.API_TIMEOUT_RESPONSE) : 5000,
	API_TIMEOUT_REQUEST: process.env.API_TIMEOUT_REQUEST ? Number(process.env.API_TIMEOUT_REQUEST) : 5000,
	API_KEEP_ALIVE_TIMEOUT: process.env.API_KEEP_ALIVE_TIMEOUT ? Number(process.env.API_KEEP_ALIVE_TIMEOUT) : 30000,
	API_HEADERS_TIMEOUT: process.env.API_HEADERS_TIMEOUT ? Number(process.env.API_HEADERS_TIMEOUT) : 30000
};

const dbEnv = {
	DB_HOST: process.env.DB_HOST,
	DB_PORT: Number(process.env.DB_PORT)!,
	DB_USER: process.env.DB_USER!,
	DB_PASSWORD: process.env.DB_PASSWORD,
	DB_NAME: process.env.DB_NAME!,
	DB_DIALECT: process.env.DB_DIALECT as 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql',
	DB_LOGGING: !!(Number(process.env.DB_LOGGING) || 0),
};

const redisEnv = {
	REDIS_URL: process.env.REDIS_URL!,
}

export { appEnv, dbEnv, redisEnv };
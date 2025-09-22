import { Sequelize } from "sequelize";
import { dbEnv } from "../config/env.config";
import { Component } from "../interfaces/component.interface";
import { loggerSystem } from "../config/logger.config";

export class DatabaseComponent implements Component {
	component: Sequelize;
	constructor() {
		this.component = new Sequelize(dbEnv.DB_NAME, dbEnv.DB_USER, dbEnv.DB_PASSWORD, {
			host: dbEnv.DB_HOST,
			port: dbEnv.DB_PORT,
			dialect: dbEnv.DB_DIALECT,
			logging: false,
		});
	}
	connect() {
		this.component
			.authenticate()
			.then(() => {
				console.log(`Database connected successfully to: ${this.component.getDatabaseName()}`);
			})
			.catch(error => {
				loggerSystem.error(`Database connection failed: ${error.message}`);
			});
	}
	async healthCheck(): Promise<boolean> {
		return this.component
			.query("SELECT 1")
			.then(() => true)
			.catch(() => false);
	}
}

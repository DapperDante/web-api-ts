import { Sequelize } from "sequelize";
import { dbEnv, appEnv } from "../config/env.config";

const database = new Sequelize(
  dbEnv.DB_NAME,
  dbEnv.DB_USER,
  dbEnv.DB_PASSWORD,
  {
    host: dbEnv.DB_HOST,
    dialect: dbEnv.DB_DIALECT,
    logging: appEnv.NODE_ENV === "development" ? console.log : false
  }
);

export default database;
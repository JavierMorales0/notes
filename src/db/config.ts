/**
 * Set the database configuration to use in the application
 * PostgreSQL is the default database
 */
import * as dotenv from "dotenv";

dotenv.config();
const dbConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || '5432',
  database: process.env.DB_DATABASE,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
};

export default dbConfig;

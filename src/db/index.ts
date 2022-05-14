import { Pool } from "pg";
import dbConfig from "./config";

export default new Pool({
  user: dbConfig.user,
  password: dbConfig.password,
  host: dbConfig.host,
  port: parseInt(dbConfig.port),
  database: dbConfig.database,
});

"use strict";
/**
 * Set the database configuration to use in the application
 * PostgreSQL is the default database
 */
Object.defineProperty(exports, "__esModule", { value: true });
const dbConfig = {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || "postgres",
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "postgres",
};
exports.default = dbConfig;

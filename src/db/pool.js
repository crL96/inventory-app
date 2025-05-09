const { Pool } = require("pg");
require("dotenv").config();

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    ssl: {
        rejectUnauthorized: true,
    }
};

module.exports = new Pool(config)
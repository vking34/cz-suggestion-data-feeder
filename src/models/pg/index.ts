import { Pool } from 'pg';

export default new Pool({
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    host: process.env.PG_HOST,
    database: process.env.PG_DB,
    port: 5432,
    Promise: global.Promise
});
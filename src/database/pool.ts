import { Pool } from 'pg';

type DBConfig = {
    user: string;
    host: string;
    db: string;
    password: string;
    port: number;
};

export const dbPool = (config: DBConfig): Pool => {
    return new Pool({
        user: config.user,
        host: config.host,
        database: config.db,
        password: config.password,
        port: config.port,
    });
};

import express, { Request, Response, Express, Router } from 'express';
import { green, red } from 'chalk';
import { json } from 'body-parser';
import { Server } from 'http';
import cors from 'cors';
import { healthCheckHandler } from './router/v1';
import { getEnv } from './config/env';
import { gracefulShutdown, ifProd } from './helpers/process';
import { dbPool } from './database/pool';
import JSONResponse from './models/response';
import { getHttpStatusCode } from './models/errorResponse';

const app: Express = express();
const PORT: number = Number(getEnv('PORT'));

// get gb config from env
const DB_USER: string = getEnv('PGUSER');
const DB_HOST: string = getEnv('PGHOST');
const DB_PASS: string = getEnv('PGPASSWORD');
const DB_NAME: string = getEnv('PGDATABASE');
const DB_PORT: number = Number(getEnv('PGDATABASE'));
const dbConfig = { user: DB_USER, password: DB_PASS, host: DB_HOST, port: DB_PORT, db: DB_NAME };

// create db pool
const db = dbPool(dbConfig);
db.connect((err) => {
    if (err) {
        console.error(red('[DB_POOL] cannot connect to database', err));
    } else {
        console.log(green('[DB_POOL] connected to database'));
    }
});

// middleware
app.use(cors());
app.use(json());

// v1 endpoint (express router example)
const v1Router: Router = express.Router();
v1Router.get('/health-check', healthCheckHandler);
app.use('/v1', v1Router);

// ping
app.get('/ping', (_: Request, res: Response): void => {
    res.status(200);
    res.send('pong');
});

// test query for get all dummies
app.get(
    '/dummies',
    async (_: Request, res: Response): Promise<void> => {
        const resp = new JSONResponse();
        try {
            const query = 'SELECT user_id, username, email, created_at FROM starter_table';
            const queryResult = await db.query(query);
            const data = queryResult.rows;
            resp.setData(data);
            res.status(200);
            res.send(resp);
        } catch (err) {
            resp.setError(err);
            res.status(getHttpStatusCode(resp.code));
            res.send(resp);
        }
    },
);

// http server
const server: Server = app.listen(PORT, (): void => {
    const runningEnv = ifProd ? 'production' : 'development';
    console.log(green(`[SERVER] Express 🏃 on PORT ${PORT} in ${runningEnv} mode!`));
});

// graceful shutdown
process
    .on('SIGTERM', gracefulShutdown('SIGTERM', server, db))
    .on('SIGINT', gracefulShutdown('SIGINT', server, db))
    .on('uncaughtException', gracefulShutdown('uncaughtException', server, db));

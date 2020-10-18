import express, { Request, Response, Express, Router } from 'express';
import { green } from 'chalk';
import { json } from 'body-parser';
import { Server } from 'http';
import cors from 'cors';
import { healthCheckHandler } from './router/v1';
import { getEnv } from './config/env';
import { gracefulShutdown, ifProd } from './helpers/process';

const app: Express = express();
const PORT: number = Number(getEnv('PORT'));

// middleware
app.use(cors());
app.use(json());

// v1 endpoint
const v1Router: Router = express.Router();
v1Router.get('/health-check', healthCheckHandler);
app.use('/v1', v1Router);

// ping
app.get('/ping', (_: Request, res: Response): void => {
    res.status(200);
    res.send('pong');
});

// http server
const server: Server = app.listen(PORT, (): void => {
    const runningEnv = ifProd ? 'production' : 'development';
    console.log(green(`Express 🏃 on PORT ${PORT} in ${runningEnv} mode!`));
});

// graceful shutdown
process
    .on('SIGTERM', gracefulShutdown('SIGTERM', server))
    .on('SIGINT', gracefulShutdown('SIGINT', server))
    .on('uncaughtException', gracefulShutdown('uncaughtException', server));

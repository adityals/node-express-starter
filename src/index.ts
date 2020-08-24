import express, { Request, Response, Express, Router } from 'express';
import { green } from 'chalk';
import { json } from 'body-parser';
import cors from 'cors';
import { healthCheckHandler } from './router/v1';
import { getEnv } from './config/env';
import { gracefulShutdown } from './helpers/process';

const app: Express = express();
const PORT: number = Number(getEnv('PORT'));
const __PROD__: boolean = getEnv('NODE_ENV') === 'production';

// middleware
app.use(cors());
app.use(json());

// v1 endpoinnt
const v1Router: Router = express.Router();
v1Router.post('/health-check', healthCheckHandler);
app.use('/v1', v1Router);

// ping
app.get('/ping', (_: Request, res: Response): void => {
    res.status(200);
    res.send('pong');
});

// http server
const server = app.listen(PORT, (): void => {
    const runningEnv = __PROD__ ? 'production' : 'development';
    console.log(green(`Express 🏃 on PORT ${PORT} in ${runningEnv} mode!`));
});

// graceful shutdown
process
    .on('SIGTERM', gracefulShutdown('SIGTERM', server))
    .on('SIGINT', gracefulShutdown('SIGINT', server))
    .on('uncaughtException', gracefulShutdown('uncaughtException', server));

import express, { Request, Response, Express, Router } from 'express';
import { green } from 'chalk';
import { json } from 'body-parser';
import cors from 'cors';
import { healthCheckHandler } from './router/v1';
import { getEnv } from './config/env';

const app: Express = express();
const PORT: number = Number(getEnv('PORT'));
const __PROD__: boolean = process.env.NODE_ENV === 'production';

// middleware
app.use(cors());
app.use(json());

// v1 endpoinnt
const v1Router: Router = express.Router();
v1Router.post('/health-check', healthCheckHandler);
app.use('/v1', v1Router);

app.get('/ping', (_: Request, res: Response) => {
    res.status(200);
    res.send('pong');
});

app.listen(PORT, (): void => {
    const runningEnv = __PROD__ ? 'production' : 'development';
    console.log(green(`Express 🏃 on PORT ${PORT} in ${runningEnv} mode!`));
});

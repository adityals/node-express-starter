import { yellow, green, red } from 'chalk';
import { Server } from 'http';
import { Pool } from 'pg';

export const ifProd: boolean = process.env.NODE_ENV === 'production';

/**
 * graceful shutdown
 * @param signal
 * @param httpServer
 * @param dbPool
 */
export const gracefulShutdown = (signal: string, httpServer: Server, dbPool: Pool) => {
    return () => {
        console.warn(yellow(`[Process] getting signal -> ${signal}...`));

        console.warn(yellow('[Process] closing http server...'));

        httpServer.close((): void => {
            console.warn(green('[Process] server closed'));
            console.warn(yellow('[Process] closing db conn...'));
            dbPool.end((): void => {
                console.warn(green('[Process] db closed'));
                process.exit(0);
            });
        });

        // Force close server after 5s
        setTimeout((): void => {
            console.log(red('[Process] 🚨 Forcing server close!!!'));
            process.exit(1);
        }, 5000).unref();
    };
};

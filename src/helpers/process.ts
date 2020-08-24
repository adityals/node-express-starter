import { yellow, red } from 'chalk';
import { Server } from 'http';
/**
 * graceful shutdown
 * @param signal
 */
export const gracefulShutdown = (signal: string, httpServer: Server) => {
    return (err: Error) => {
        console.warn(yellow(`\n[Process] Getting signal -> ${signal}...`));
        if (err) {
            console.error(red(`[Process] Error when get signal : ${err.stack || err}`));
        }

        console.warn(yellow('[Process] closing http server ...'));

        httpServer.close(() => {
            console.warn(yellow('[Process] server closed'));
            const processExit: number = err ? 1 : 0;
            console.warn(yellow(`[Process] exiting with code ${processExit}`));
        });

        // Force close server after 5secs
        setTimeout((e) => {
            console.log('🚨[Process] Forcing server close !!!', e);
            process.exit(1);
        }, 5000).unref();
    };
};

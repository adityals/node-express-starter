import { yellow, green, red } from 'chalk';
import { Server } from 'http';
/**
 * graceful shutdown
 * @param signal
 */
export const gracefulShutdown = (signal: string, httpServer: Server) => {
    return () => {
        console.warn(yellow(`\n[Process] Getting signal -> ${signal}...`));

        console.warn(yellow('[Process] closing http server ...'));

        httpServer.close((): void => {
            console.warn(green('[Process] server closed'));
            process.exit(0);
        });

        // Force close server after 5s
        setTimeout((): void => {
            console.log(red('🚨[Process] Forcing server close !!!'));
            process.exit(0);
        }, 5000).unref();
    };
};

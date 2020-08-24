import { Request, Response } from 'express';

/**
 * get html from figma api
 * @param req
 * @param res
 */
export const healthCheckHandler = (_: Request, res: Response): void => {
    try {
        res.status(200);
        res.send({ code: 200000, message: 'OK' });
    } catch (err) {
        res.status(500);
        console.error(err);
    }
};

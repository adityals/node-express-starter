import { Request, Response } from 'express';
import { getHttpStatusCode } from '../../models/errorResponse';
import JSONResponse from '../../models/response';

/**
 * health check handler
 * @param req
 * @param res
 */
export const healthCheckHandler = (_: Request, res: Response): void => {
    const resp = new JSONResponse();
    res.status(getHttpStatusCode(resp.code));
    res.send(resp);
};

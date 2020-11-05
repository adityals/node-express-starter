const BAD_REQUEST = 'Bad Request';
const INTERNAL_SERVER_ERROR = 'Internal Server Error';

// generic error
export const errorBadRequest: Error = new Error(BAD_REQUEST);
export const errorInternalServer: Error = new Error(INTERNAL_SERVER_ERROR);

export const getErrorCode = (err: string): number => {
    return { [BAD_REQUEST]: 400000 }[err] || 500000;
};

export const getHttpStatusCode = (errorCode: number): number => {
    return Number(String(errorCode).substring(0, 3)) || 500;
};

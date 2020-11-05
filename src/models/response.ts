import { getErrorCode } from './errorResponse';

export default class JSONResponse {
    code: number;
    message: string;
    data: any;

    constructor() {
        this.code = 200000;
        this.message = 'Success';
        this.data = undefined;
    }

    setData(data: any): JSONResponse {
        this.data = data;
        return this;
    }

    setError(error: Error): JSONResponse {
        if (error) {
            const errorString = error.message;
            const responseCode = getErrorCode(errorString);
            this.code = responseCode;
            this.message = error.message;
        } else {
            this.code = 500100;
            this.message = 'Undefined Error';
        }
        return this;
    }
}

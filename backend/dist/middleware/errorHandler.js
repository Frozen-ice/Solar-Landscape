"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.AppError = void 0;
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.AppError = AppError;
const errorHandler = (err, req, res, next) => {
    const error = err;
    error.statusCode = error.statusCode || 500;
    error.status = error.status || 'error';
    if (process.env.NODE_ENV === 'development') {
        const response = {
            status: error.status,
            message: error.message,
            error: error,
            stack: error.stack
        };
        res.status(error.statusCode).json(response);
    }
    else {
        // Production mode
        if (error.isOperational) {
            const response = {
                status: error.status,
                message: error.message
            };
            res.status(error.statusCode).json(response);
        }
        else {
            // Programming or unknown errors
            console.error('ERROR 💥', error);
            const response = {
                status: 'error',
                message: 'Something went wrong'
            };
            res.status(500).json(response);
        }
    }
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpLogger = exports.logger = void 0;
var winston_1 = require("winston");
exports.logger = winston_1.createLogger({
    transports: [
        new winston_1.transports.File({
            level: 'info',
            filename: './info-file.log',
        }),
        new winston_1.transports.File({
            level: 'error',
            filename: './error-file.log'
        }),
        new winston_1.transports.Console({
            level: 'debug',
            handleExceptions: true
        }),
        new winston_1.transports.File({
            level: 'http',
            filename: './http-file.log'
        }),
    ],
});
exports.httpLogger = function (req, res, next) {
    if (req.url.startsWith('/graphql')) {
        exports.logger.http('REQUEST', req.body);
    }
    next();
};

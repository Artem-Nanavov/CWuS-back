import { Response, Request, NextFunction } from "express";
import {
  createLogger,
  transports,
} from "winston";

export const logger = createLogger({
  transports: [
    new transports.File({
      level: 'info',
      filename: './info-file.log',
    }),
    new transports.File({
      level: 'error',
      filename: './error-file.log'
    }),
    new transports.Console({
      level: 'debug',
      handleExceptions: true
    }),
    new transports.File({
      level: 'http',
      filename: './http-file.log'
    }),
  ],
});

export const httpLogger = (req: Request, res: Response, next: NextFunction) => {
  if ( req.url.startsWith('/graphql') ) {
    logger.http('REQUEST', req.body);
  }

  next();
};
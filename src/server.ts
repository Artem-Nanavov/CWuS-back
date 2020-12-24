import cors from 'cors';
import http from 'http';
import bodyParser from 'body-parser';
import authRouter from './routes/auth';
import meRouter from './routes/user';
import express, { Express, NextFunction } from 'express';
import { corsOptions } from "./middleware/cors";
import { logger, httpLogger } from "./logger/logger";
import cookieParser from 'cookie-parser';
import {Socket, Server} from 'socket.io';
import { ExtendedError } from 'socket.io/dist/namespace';

const app: Express = express();
const server = http.createServer(app);

const io = new Server(server, {cors: {origin: ['http://localhost:3000']}});

const port: number = 8000;

app.use(cookieParser())
app.use( cors(corsOptions) );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({ extended: true }) );

app.use(httpLogger);

app.use('/auth', authRouter);
app.use('/user', meRouter);

io.use((socket, next) => {
  if (!!socket.request.headers['authorization']) {
    return next(new Error('not authorized'));
  }

  next();
});

io.on('connection', async (socket: Socket) => {
  console.log(socket.request.headers['authorization']);
  console.log('socket connect');
});

server.listen(port, () => {
  logger.info(`🚀  Server ready at http://localhost:${ port }/`)
});
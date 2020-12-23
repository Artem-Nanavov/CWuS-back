import {Socket} from 'socket.io';
import { logger } from '../logger/logger';

const newUser = (socket: Socket, username: string) => {
  logger.http('new user', username);

  socket.broadcast.emit('user join', { username });
};

const newMessage = (socket: Socket, message: string) => {
  logger.http('new message', message);
};

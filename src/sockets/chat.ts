import { logger } from './../logger/logger';
import { IMessage } from './../interfaces/socket.d';
import {Socket} from 'socket.io';
import pool from '../database/database';

export const newUser = (socket: Socket, username: string) => {
  logger.info(`new user: ${ username }`);

  socket.broadcast.emit('user join', { username });
};

export const newMessage = async (socket: Socket, message: IMessage) => {
  try {
    logger.info(`new message: ${ message }`);

    const newMsg = await pool.query('INSERT INTO messages (username, text, owner_id, date) VALUES ($1, $2, $3, $4) RETURNING *', [
      message.username,
      message.text,
      message.owner_id,
      new Date(),
    ])

    socket.broadcast.emit('new message', newMsg.rows[0]);
  } catch (e) {
    logger.error('server error', e.message);
  }
};

export const getAllMsgs = async () => {
  try {
    const allMsgs = await pool.query('SELECT * FROM messages');

    return allMsgs.rows;
  } catch (e) {
    logger.error('server error', e.message);

    return [];
  }
};

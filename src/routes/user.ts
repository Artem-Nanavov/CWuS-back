import pool from '../database/database';
import {generateAccessToken, parseToken} from '../utils/jwtGenerator';
import { Router, Response, Request } from 'express';
import { logger } from '../logger/logger';

const router = Router();

router.get('/me', async (req: Request, res: Response) => {
  try {
    logger.info(`me data: ${ await req.header('Authorization') }`);
    const token = await req.header('Authorization');

    if (token) {
      const decoded = await parseToken(token) as {[key: string]: any};

      if (decoded === null) {
        return res.status(401).json({
          message: 'Invalid token',
        });
      }
  
      const {user_id} = decoded;
  
      const user = await pool.query('SELECT * FROM users WHERE _id = $1', [
        user_id,
      ]);
  
      if (user.rows.length === 0) {
        return res.status(401).json({
          message: 'User not found',
        });
      }
  
      return res.status(200).json({
        _id: user.rows[0]._id,
        username: user.rows[0].username,
      });
    }


    return res.status(401).json({
      message: 'Invalid token',
    });
  } catch (e) {
    logger.error('Server Error', e.message);

		res.status(500).send('Server Error');
  }
});

router.post('/refresh-tokens', async (req: Request, res: Response) => {
  try {
    const token = await req.cookies.refresh;

    if (!token) {
      return res.status(401).json({
        message: 'Invalid token',
      });
    }

    const decoded = parseToken(token) as {[key: string]: any};

    if (decoded === null) {
      return res.status(401).json({
        message: 'Invalid token',
      });
    }

    const {user_id} = decoded;

    const access = await generateAccessToken(user_id);

    return res.status(200).json({
      access,
    });
  } catch (e) {
    logger.error('Server Error', e.message);

		res.status(500).send('Server Error');
  }
});

router.post('/logout', async (req: Request, res: Response) => {
  try {
    res.cookie('refresh', null, {maxAge: 0});

    res.status(200);
    return res.end();
  } catch (e) {
    logger.error('Server Error', e.message);

		res.status(500).send('Server Error');
  }
});

export default router;

import bcrypt from 'bcrypt';
import pool from '../database/database';
import {validateEmail} from '../middleware/validinfo';
import {parseAccessToken} from '../utils/jwtGenerator';
import { Router, Response, Request } from 'express';

const router = Router();

router.get('/me', async (req: Request, res: Response) => {
  try {
    const token = await req.header('Authorization');

    if (!token) {
      return res.status(401).json({
        message: 'Invalid token',
      });
    }

    const decoded = parseAccessToken(token) as {[key: string]: any};

    if (decoded === null) {
      return res.status(401).json({
        message: 'Invalid token',
      });
    }

    const {user_id} = decoded.payload;

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
  } catch (e) {
    console.error( e.message );

		res.status(500).send('Server Error');
  }
});

export default router;

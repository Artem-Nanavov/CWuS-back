import { logger } from './../logger/logger';
import bcrypt from 'bcrypt';
import pool from '../database/database';
import {validateEmail} from '../middleware/validinfo';
import {generateRefreshToken, generateAccessToken} from '../utils/jwtGenerator';
import { Router, Response, Request } from 'express';

const router = Router();

router.post('/reg', async (req: Request, res: Response) => {
	try {
		logger.info('reg data', req.header('Authorization'));
		const authData = req.header('Authorization');

		if (!authData || authData.trim() === '') {
			return res.status(401).json({
				message: 'Values are incorrect',
			});
		}

		const { username, email, password } = JSON.parse(authData);

		if (!validateEmail(email)) {
			return res.status(403).send('Invalid email');
		}

		const user = await pool.query('SELECT * FROM users WHERE email = $1', [
			email
		]);

		if ( user.rows.length > 0 ) {
			return res.status(401).json({
				message: 'User already exist',
			});
		}

		const saltRound: number = 10;
		const salt: string = await bcrypt.genSalt(saltRound);

		const bcryptPassword: string = await bcrypt.hash(password, salt);

		const newUser = await pool.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *', [
			username, 
			email, 
			bcryptPassword
		]);

		const refresh: string = await generateRefreshToken(newUser.rows[0]._id);
		const access: string = await generateAccessToken(newUser.rows[0]._id);

    res.cookie('refresh', refresh, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

		return res.status(200).json({
			access,
			refresh,
		});
	} catch (e) {
		logger.error('auth login error', e.message)

		res.status(500).send('Server Error');
	}
});

router.post('/login', async (req: Request, res: Response) => {
	try {
		logger.info('login data', req.header('Authorization'));
		const authData = req.header('Authorization');

		if (!authData || authData.trim() === '') {
			return res.status(401).json({
				message: 'Values are incorrect',
			});
		}

		const { login, password } = JSON.parse(authData);

		if (!validateEmail(login)) {
			return res.status(401).send('Invalid email');
		}

		const user = await pool.query('SELECT * FROM users WHERE email = $1', [
			login
		]);

		if ( user.rows.length === 0 ) {
			return res.status(401).json({
				message: 'Values are incorrect',
			});
		};

		const validPassword: boolean = await bcrypt.compare(password, user.rows[0].password);

		if ( !validPassword ) {
			return res.status(401).json({
				error: true,
				message: 'Values are incorrect',
			});
		};

		const refresh: string = await generateRefreshToken(user.rows[0]._id);
		const access: string = await generateAccessToken(user.rows[0]._id);

    res.cookie('refresh', refresh, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

		res.status(200).json({
			refresh,
			access
		});
	} catch (e) {
		logger.error('auth login error', e.message)

		res.status(500).send('Server Error');
	};
});

export default router;

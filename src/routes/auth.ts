import bcrypt from 'bcrypt';
import pool from '../database/database';
import {validateEmail} from '../middleware/validinfo';
import {generateRefreshToken} from '../utils/jwtGenerator';
import { Router, Response, Request } from 'express';

const router = Router();

router.post('/reg', async (req: Request, res: Response) => {
	try {
		const { username, email, password } = req.body;

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

		await pool.query('INSERT INTO freeUsers (username, _id) VALUES ($1, $2)', [
			username,
			newUser.rows[0]._id,
		]);

		const refresh_token: string = await generateRefreshToken(newUser.rows[0]._id);

		return res.status(200).json({
			refresh_token,
		});
	} catch (e) {
		console.error( e.message );

		res.status(500).send('Server Error');
	}
});

router.post('/login', async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;

		if (!validateEmail(email)) {
			return res.status(401).send('Invalid email');
		}

		const user = await pool.query('SELECT * FROM users WHERE email = $1', [
			email
		]);

		if ( user.rows.length === 0 ) {
			return res.status(401).json({
				message: 'Email is incorrect',
			});
		};

		const validPassword: boolean = await bcrypt.compare(password, user.rows[0].password);

		if ( !validPassword ) {
			return res.status(401).json({
				error: true,
				message: 'Password is incorrect',
			});
		};

		const refresh_token: string = await generateRefreshToken(user.rows[0]._id);

		res.status(200).json({
			refresh_token,
		});
	} catch (e) {
		console.error( e.message );

		res.status(500).send('Server Error');
	};
});

export default router;

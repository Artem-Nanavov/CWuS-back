import {parseToken} from '../utils/jwtGenerator';
import { Router, Response, Request } from 'express';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  try {
    const token = await req.header('Authorization');

    if (token) {
      const decoded = await parseToken(token);

      if (!decoded) {
        res.status(401);
        return res.end();
      }

      res.status(200);
      return res.end();
    }

    return res.status(401).send('Invalid token');
  } catch (e) {
		console.error( e.message );

		res.status(500).send('Server Error');
  }
});

export default router;
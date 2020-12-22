import cors from 'cors';
import bodyParser from 'body-parser';
import authRouter from './routes/auth';
import meRouter from './routes/user';
import express, { Express } from 'express';
import { corsOptions } from "./middleware/cors";
import { logger, httpLogger } from "./logger/logger";

const app: Express = express();
const port: number = 8000;

app.use( cors(corsOptions) );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({ extended: true }) );

app.use(httpLogger);

app.use('/auth', authRouter);
app.use('/user', meRouter);

app.listen(port, () => {
  logger.info(`🚀  Server ready at http://localhost:${ port }/`)
});
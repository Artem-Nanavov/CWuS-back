import { Pool } from 'pg';
import databaseConfig from "../configs/db.config";

const pool = new Pool( databaseConfig );

export default pool;
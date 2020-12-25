module.exports = {
  development: {
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : '1234',
      database : 'test',
    }
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    pool: {
       min: 2,
       max: 10
    },
    migrations: {
      tablename: 'knex_migrations',
      directory: './migrations',
    }
  }
};

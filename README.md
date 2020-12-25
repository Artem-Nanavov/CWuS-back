# CWuS-API

If you don't have knex installed: run the command `npm i knex -g`

If you don't have postgreSQl: you cant install postgreSQL here
Or leave it empty and use the [here][postgreSQL link].

[postgreSQL link]: https://www.postgresql.org/download/

first time:
Run: `npm i`
Run: `knex migrate:latest`
Run: `npm run dev`

API port:       8000

## API endpoints


`/auth/reg`
~~~~
Description:
    Registers new user and returns cookie with refresh token and some user data

Protocol:
    http

Method:
    POST

Request Header data:
    email: string
    username: string
    password: string

Response cookie with refresh token;
Response data:
	access
~~~~


`/auth/login`
~~~~~
Description:
    aser auth, returns cookie with token and some user data

Protocol:
    http

Method:
    POST

Request Header data:
    email: string
    password: string

Response cookie with refresh token;
Response data:
	access
~~~~~

# Express MySQL User API

A small Node.js/Express API example for basic user operations backed by MySQL.

## Requirements

- Node.js and npm
- MySQL

## Setup

Install the dependencies:

```bash
npm init -y
npm install express mysql
```

Configure `setting.json` with the keys read by `app.js`:

```json
{
  "IP": "127.0.0.1",
  "PORT": 3000,
  "mysql_host": "127.0.0.1",
  "mysql_username": "your_mysql_username",
  "mysql_password": "your_mysql_password"
}
```

The current `setting.json` uses `host` and `port`, while the application reads
`IP` and `PORT`. Rename those keys as shown above, or update `app.js` to use
the existing names. The MySQL connection in `app.js` also does not select a
database; configure a default database for the MySQL user or add a `database`
option to the connection settings before using the API.

The API expects a `users` table with `username` and `password` columns in the
selected database.

Start the server:

```bash
node app.js
```

By default, the example configuration listens on `http://127.0.0.1:3000`.

## Endpoints

Requests with a body use JSON.

| Method | Path | Expected body | Purpose |
|---|---|---|---|
| `GET` | `/` | — | Lists the available routes |
| `POST` | `/user/register` | `{"username":"...","password":"..."}` | Registers a user |
| `POST` | `/user/login` | `{"username":"...","password":"..."}` | Looks up a matching user |
| `POST` | `/user/logout` | — | Placeholder; session handling is not implemented |
| `POST` | `/user/profile` | `{"username":"..."}` | Looks up a user by username |
| `POST` | `/user/update` | `{"username":"...","password":"..."}` | Updates a user's password |
| `DELETE` | `/user/delete` | `{"username":"..."}` | Deletes a user |
| `POST` | `/user/change-password` | `{"username":"...","password":"..."}` | Updates a user's password |

Example:

```bash
curl.exe -X POST http://127.0.0.1:3000/user/register -H "Content-Type: application/json" -d "{\"username\":\"alice\",\"password\":\"example\"}"
```

## Important

This is an instructional prototype, not production-ready authentication.
Queries currently interpolate request values directly into SQL, passwords are
not hashed, and the database query/connection handling is asynchronous but is
not awaited by the routes. Do not expose this API to untrusted users or use
real credentials until those issues are addressed. Keep database credentials
private and do not commit real passwords to GitHub.

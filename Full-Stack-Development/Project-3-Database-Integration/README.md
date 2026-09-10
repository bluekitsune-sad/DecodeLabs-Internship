# Project 3 — Database Integration

## Project Title

**DecodeLabs Users CRUD API with SQLite Persistence**

## Objective

Upgrade the backend API milestone from in-memory data to a **persistent
database**. Demonstrate the four pillars:

```text
Pillar 1 — Schema & Design
Pillar 2 — Integration & Connection
Pillar 3 — CRUD & RESTful HTTP
Pillar 4 — Integrity & Security
```

Data written to the API must survive a server restart.

## Features

- Persistent storage with SQLite (file-based, survives restarts)
- Full CRUD: `CREATE`, `READ`, `UPDATE`, `DELETE`
- RESTful routes: `GET/POST /api/users`, `GET/PATCH/DELETE /api/users/:id`
- Database-level integrity: primary key, `NOT NULL`, `UNIQUE (email)`
- Server-side validation before every write
- SQL injection protection via parameterized prepared statements
- Duplicate-email and record-not-found handling
- Safe JSON error responses; no database stack traces exposed
- Automated CRUD + persistence tests

## Technology Stack

```text
Node.js
Express 4
SQLite (better-sqlite3 driver)
Node.js built-in test runner (node:test) + Supertest
```

Database choice rationale is documented in `DATABASE.md` (SQLite selected as an
implementation choice: no external server required, persistent, relational).

## Architecture

```text
Client
  ↓
HTTP Request
  ↓
Route              (src/routes)
  ↓
Validation         (src/validation)
  ↓
Controller         (src/controllers)
  ↓
Service            (src/services)
  ↓
Database layer     (src/models + src/database)
  ↓
SQLite file
  ↓
JSON response
```

`app.js` composes the app; `server.js` starts it and manages the connection.

## API Endpoints

| Method | Endpoint             | Purpose                 |
| ------ | -------------------- | ----------------------- |
| GET    | `/`                  | API info                |
| GET    | `/api/users`         | List all users          |
| GET    | `/api/users/:id`     | Get one user            |
| POST   | `/api/users`         | Create a user           |
| PATCH  | `/api/users/:id`     | Partially update a user |
| DELETE | `/api/users/:id`     | Delete a user           |

Full documentation with request/response examples: see `API.md`.

## Request Examples

```http
POST /api/users
Content-Type: application/json

{ "name": "Alice Chen", "email": "alice@example.com" }
```

```http
PATCH /api/users/1
Content-Type: application/json

{ "name": "Alice Chen Li" }
```

## Response Examples

Created user — `201 Created`:

```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Alice Chen",
    "email": "alice@example.com",
    "created_at": "2026-01-01 09:00:00"
  }
}
```

Error — `400 Bad Request`:

```json
{
  "success": false,
  "error": { "message": "'name' is required" }
}
```

## Validation Rules

| Item | Rule                                        |
| ---- | ------------------------------------------- |
| `name` | Required, non-empty string (trimmed)     |
| `email` | Required, valid basic email format       |
| `id` | Positive integer                            |
| PATCH body | At least one of `name` / `email`      |

Validation happens **on the server** for every request. Duplicate emails are
rejected both by validation-flow detection and by the database `UNIQUE`
constraint.

## HTTP Status Codes

| Code | Meaning                                     |
| ---- | ------------------------------------------- |
| 200  | OK — successful read/update/delete          |
| 201  | Created — record successfully stored        |
| 400  | Bad Request — invalid input                 |
| 404  | Not Found — unknown route or missing record |
| 500  | Internal Server Error — unexpected failure  |

## Database

- File: `./data/users.db` (path configurable via `DATABASE_URL`)
- Table: `users(id, name, email, created_at)`
- Constraints: `PRIMARY KEY (id)`, `NOT NULL (name, email)`,
  `UNIQUE (email)`
- No relationships/FKs needed at this milestone

See `DATABASE.md` and `docs/database-schema.md` for full details and an ERD.

## How to Install

Requires Node.js 18+.

```bash
npm install
```

## How to Run

```bash
npm start
```

Listens on `http://localhost:3000` by default. Copy `.env.example` to `.env`
to change:

```text
PORT=3000
DATABASE_URL=./data/users.db
```

## How to Test

```bash
npm test
```

The test suite covers:

- **CREATE:** valid record, missing field, duplicate email, invalid data,
  malformed JSON
- **READ:** all records, existing id, non-existing id, invalid id
- **UPDATE:** existing record, non-existing record, invalid data, duplicate
  outcome
- **DELETE:** existing record, non-existing record
- **Persistence:** create → close database → reopen → record still present
- **Routing:** unknown endpoint

A manual restart test was also executed (create → stop server → start server →
record still present).

## Project Structure

```text
Project-3-Database-Integration/
│
├── src/
│   ├── routes/
│   │   └── users.routes.js
│   ├── controllers/
│   │   └── users.controller.js
│   ├── services/
│   │   └── user.service.js
│   ├── models/
│   │   └── user.model.js
│   ├── validation/
│   │   └── user.validation.js
│   ├── database/
│   │   └── connection.js
│   ├── app.js
│   └── server.js
├── tests/
│   └── users.test.js
├── docs/
│   └── database-schema.md
├── API.md
├── DATABASE.md
├── README.md
├── package.json
├── .env.example
└── .gitignore
```

## Known Limitations

- Single `users` entity; no related tables/relationships yet
- SQLite is single-writer (fine for a single API instance)
- No authentication (not required by the PRD)

## Future Improvements

- Add related resources (e.g. orders) with foreign keys and a one-to-many
  relationship
- Add `GET /api/users/:id/orders`-style nested endpoints
- Move to PostgreSQL/MySQL when server infrastructure becomes available
- Add pagination and search/filtering
- Add a request-logging middleware
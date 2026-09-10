# DATABASE.md

## Database choice

**SQLite** (via the `better-sqlite3` driver).

### Why SQLite was selected

The PRD lists PostgreSQL, MySQL and MongoDB as *examples* of the SQL/relational
and NoSQL families, but does not mandate a specific database. The existing
Full Stack P2 implementation is a small Node.js/Express API, and for this
internship milestone the chosen database must be:

- **Persistent** — data must survive a server restart (a core P3 requirement).
- **Relational-capable** — to demonstrate schema design, primary keys and
  `NOT NULL`/`UNIQUE` constraints.
- **Simple to run and grade** — no external database server or Docker setup
  required; the PRD explicitly warns against adding unnecessary
  infrastructure.

SQLite satisfies all of these: it is a relational database stored in a single
file, supports primary keys and constraints, persists across restarts, and
needs no separate server. This is documented as an **implementation choice**
per the PRD (Rule 3), not an official DecodeLabs requirement.

- Integration layer: `better-sqlite3` (a small, synchronous, well-supported
  SQLite driver for Node.js) — chosen as the **single** ORM/driver.

## Connection setup

The database path comes from the `DATABASE_URL` environment variable:

```text
DATABASE_URL=./data/users.db
```

- Never hardcoded in source.
- `.env.example` documents the variable; the real `.env` is gitignored.
- The connection module (`src/database/connection.js`) creates the file and
  table on first connect.
- SQLite's WAL journal mode is enabled for better concurrent reads.

## Tables / collections

### `users`

| Field       | Type    | Constraints                | Purpose                 |
| ----------- | ------- | -------------------------- | ----------------------- |
| `id`        | INTEGER | PRIMARY KEY AUTOINCREMENT  | Unique row identifier   |
| `name`      | TEXT    | NOT NULL                   | User's full name        |
| `email`     | TEXT    | NOT NULL, UNIQUE           | Unique contact email    |
| `created_at`| TEXT    | NOT NULL DEFAULT `now`     | Creation timestamp      |

## Primary keys

- `users.id` is the primary key — every record is uniquely identified.

## Foreign keys

- None. The project uses a single entity (`users`) and does not require
  related tables, so no foreign keys are defined (the PRD says to avoid
  unneeded relationships).

## Relationships

- None currently. The schema has no one-to-one / one-to-many / many-to-many
  relationships. If future tasks add e.g. `orders`, a one-to-many
  `users.id → orders.user_id` relationship could be added.

## Constraints and integrity

Enforced at the database level, not only in application code:

```text
NOT NULL  — name, email, created_at
UNIQUE    — email
PRIMARY KEY — id
```

This means invalid inserts (missing name/email, duplicate email) are rejected
by the database itself.

## CRUD endpoints

| Operation | HTTP method | Endpoint             | SQL-action            |
| --------- | ----------- | -------------------- | --------------------- |
| CREATE    | POST        | `/api/users`         | `INSERT`              |
| READ      | GET         | `/api/users`         | `SELECT` (all)        |
| READ      | GET         | `/api/users/:id`     | `SELECT` (one)        |
| UPDATE    | PATCH       | `/api/users/:id`     | `UPDATE`              |
| DELETE    | DELETE      | `/api/users/:id`     | `DELETE`              |

## Validation

Server-side validation before any write (`src/validation/user.validation.js`):

- `name`: required, string, non-empty after trimming
- `email`: required, string, valid basic email format
- `id`: must be a positive integer

## Security

- **SQL injection protection:** all queries use parameterized prepared
  statements (`?` placeholders) — user input is never concatenated into SQL.
- Input is never trusted from the client.
- No raw database stack traces are returned to clients; unexpected errors
  return a safe `500 {"success":false,...}` envelope.

## Environment variables

| Variable        | Example             | Purpose                          |
| --------------- | ------------------- | -------------------------------- |
| `PORT`          | `3000`              | HTTP port for the API            |
| `DATABASE_URL`  | `./data/users.db`   | SQLite database file path        |

`DATABASE_URL` supports either a plain file path or a `sqlite:` prefix
(e.g. `sqlite:./data/users.db`).

## Persistence verification

Verified by both the automated test suite and a manual restart test:

```
1. Start server
2. POST /api/users  → 201 (record created)
3. Stop server
4. Start server
5. GET /api/users   → record still present
```
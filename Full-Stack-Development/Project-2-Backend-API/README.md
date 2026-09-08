# Project 2 — Backend API Development

## Project Title

**DecodeLabs Users REST API**

## Objective

Develop a simple backend REST API that demonstrates core backend skills:

- Server-side application logic
- HTTP methods (`GET`, `POST`)
- JSON request/response handling
- User-input processing
- Server-side validation ("never trust the client")
- Graceful error handling
- Correct HTTP status codes
- REST-style resource naming

## Features

- `GET /api/users` — list users
- `POST /api/users` — create a user (validated on the server)
- JSON request and response bodies with a consistent response envelope
- Server-side validation of required fields, types and email format
- Invalid JSON and unknown routes handled without crashing
- In-memory data storage (no database required by the task)
- Automated tests with the Node.js built-in test runner + Supertest

## Technology Stack

```text
Node.js
Express 4
JavaScript (CommonJS)
Node.js built-in test runner (node:test) + Supertest
```

## Architecture

Request flow:

```text
Request
   ↓
Route            (routes/users.routes.js)
   ↓
Validation       (validation/user.validation.js)
   ↓
Controller       (controllers/users.controller.js)
   ↓
Application logic (services/user.service.js)
   ↓
Response         (JSON envelope)
```

Global concerns (JSON parsing, 404 handler, error handler) live in `app.js`.

## API Endpoints

| Method | Endpoint        | Purpose                  |
| ------ | --------------- | ------------------------ |
| GET    | `/`             | API info                 |
| GET    | `/api/users`    | List all users           |
| POST   | `/api/users`    | Create a new user        |

See `API.md` for full documentation with request/response examples.

## Request Examples

```http
GET /api/users
```

```http
POST /api/users
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com"
}
```

## Response Examples

List users:

```json
{
  "success": true,
  "data": [
    { "id": 1, "name": "John Doe", "email": "john@example.com" }
  ]
}
```

Created user:

```json
{
  "success": true,
  "data": { "id": 1, "name": "John Doe", "email": "john@example.com" }
}
```

Error:

```json
{
  "success": false,
  "error": { "message": "'name' is required" }
}
```

## Validation Rules

`POST /api/users` validates on the server:

| Field   | Rule                                        |
| ------- | ------------------------------------------- |
| `name`  | Required, must be a string, non-empty after trimming |
| `email` | Required, must be a string, valid basic email format |

Additional rules:

- Request body must be a JSON object (not `null`, an array, or a primitive)
- Malformed JSON is rejected with `400 Bad Request`

## HTTP Status Codes

| Code | Meaning                                    | Used for        |
| ---- | ------------------------------------------ | --------------- |
| 200  | OK — successful read                       | GET endpoints   |
| 201  | Created — resource created                 | POST success    |
| 400  | Bad Request — invalid/malformed input      | POST validation |
| 404  | Not Found — unknown route                  | unknown routes  |
| 500  | Internal Server Error — unexpected failure | error handler   |

## How to Install

Requires Node.js 18+.

```bash
npm install
```

## How to Run

```bash
npm start
```

The server listens on `http://localhost:3000` by default. Override with the
`PORT` environment variable, e.g. copy `.env.example` to `.env` and set:

```text
PORT=4000
```

## How to Test

```bash
npm test
```

The test suite covers:

- GET — successful request with empty data, and data after creation
- POST — valid request, missing required field, invalid field, non-string
  value, non-object body, malformed JSON
- Routing — unknown endpoint returns 404

## Project Structure

```text
Project-2-Backend-API/
│
├── src/
│   ├── routes/
│   │   └── users.routes.js
│   ├── controllers/
│   │   └── users.controller.js
│   ├── services/
│   │   └── user.service.js
│   ├── validation/
│   │   └── user.validation.js
│   ├── app.js
│   └── server.js
├── tests/
│   └── users.test.js
├── API.md
├── README.md
├── package.json
├── .env.example
└── .gitignore
```

## Future Improvements

- Persist data with a real database when a future task requires it
- Add `GET /api/users/:id`, `PUT` and `DELETE` resources
- Add request logging and structured JSON logs
- Add duplicate-email checks
- Wire the Full Stack P1 contact form to these endpoints
# API Documentation

Base URL: `http://localhost:3000`

All responses use a consistent JSON envelope:

```json
{
  "success": true,
  "data": {}
}
```

Errors use:

```json
{
  "success": false,
  "error": {
    "message": "Description of what went wrong"
  }
}
```

---

## GET /api/users

| Field             | Value               |
| ----------------- | ------------------- |
| HTTP method       | `GET`               |
| Purpose           | List all users      |
| Request parameters| None                |
| Request body      | None                |
| Successful response | `200 OK`          |

### Example — `200 OK`

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Alice Chen",
      "email": "alice@example.com",
      "created_at": "2026-01-01 09:00:00"
    }
  ]
}
```

---

## GET /api/users/:id

| Field             | Value                 |
| ----------------- | --------------------- |
| HTTP method       | `GET`                 |
| Purpose           | Retrieve one user     |
| Request parameters| `id` (positive integer) |
| Request body      | None                  |
| Successful response | `200 OK`            |
| Error responses   | `400`, `404`          |

### Example — `200 OK`

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

### Errors

Non-existing id — `404 Not Found`:

```json
{
  "success": false,
  "error": { "message": "User not found" }
}
```

Invalid id (e.g. `abc`) — `400 Bad Request`:

```json
{
  "success": false,
  "error": { "message": "Invalid user id" }
}
```

---

## POST /api/users

| Field             | Value                       |
| ----------------- | --------------------------- |
| HTTP method       | `POST`                      |
| Purpose           | Create a user               |
| Request body      | `name`, `email`             |
| Successful response | `201 Created`             |
| Error responses   | `400`                       |

### Example request

```http
POST /api/users
Content-Type: application/json

{
  "name": "Alice Chen",
  "email": "alice@example.com"
}
```

### Example — `201 Created`

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

### Errors — `400 Bad Request`

Missing field:

```json
{ "success": false, "error": { "message": "'name' is required" } }
```

Invalid email:

```json
{ "success": false, "error": { "message": "'email' must be a valid email address" } }
```

Duplicate email (enforced by the database `UNIQUE` constraint):

```json
{ "success": false, "error": { "message": "A user with this email already exists." } }
```

Malformed JSON:

```json
{ "success": false, "error": { "message": "Invalid JSON in request body" } }
```

---

## PATCH /api/users/:id

| Field             | Value                        |
| ----------------- | ---------------------------- |
| HTTP method       | `PATCH`                      |
| Purpose           | Partially update a user      |
| Request parameters| `id` (positive integer)      |
| Request body      | at least one of `name`, `email` |
| Successful response | `200 OK`                   |
| Error responses   | `400`, `404`                 |

### Example request

```http
PATCH /api/users/1
Content-Type: application/json

{
  "name": "Alice Chen Li"
}
```

### Example — `200 OK`

```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Alice Chen Li",
    "email": "alice@example.com",
    "created_at": "2026-01-01 09:00:00"
  }
}
```

Errors mirror GET/validation rules: invalid id → `400`, non-existing id → `404`,
duplicate email → `400`.

---

## DELETE /api/users/:id

| Field             | Value                    |
| ----------------- | ------------------------ |
| HTTP method       | `DELETE`                 |
| Purpose           | Remove a user            |
| Request parameters| `id` (positive integer)  |
| Request body      | None                     |
| Successful response | `200 OK`               |
| Error responses   | `400`, `404`             |

### Example — `200 OK`

```json
{
  "success": true,
  "data": { "id": 1 }
}
```

Errors: invalid id → `400`, non-existing id → `404`.

---

## GET / (API info)

| Field             | Value                       |
| ----------------- | --------------------------- |
| HTTP method       | `GET`                       |
| Purpose           | API information / health    |
| Successful response | `200 OK`                  |

### Example — `200 OK`

```json
{
  "success": true,
  "data": {
    "name": "DecodeLabs Database Integration API",
    "endpoints": [
      "GET    /api/users",
      "GET    /api/users/:id",
      "POST   /api/users",
      "PATCH  /api/users/:id",
      "DELETE /api/users/:id"
    ]
  }
}
```

---

## Unknown routes

Any non-existent route returns `404 Not Found`:

```json
{
  "success": false,
  "error": { "message": "Route not found" }
}
```
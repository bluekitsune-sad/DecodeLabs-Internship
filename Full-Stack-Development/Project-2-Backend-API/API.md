# API Documentation

Base URL: `http://localhost:3000`

The API responds with JSON only. All responses use a consistent envelope:

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
| Endpoint          | `/api/users`        |
| HTTP method       | `GET`               |
| Purpose           | List all users      |
| Request parameters| None                |
| Request body      | None                |
| Successful response | `200 OK`          |
| Error responses   | None (route always exists) |

### Example request

```http
GET /api/users
```

### Example response — `200 OK`

```json
{
  "success": true,
  "data": []
}
```

With data:

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com"
    }
  ]
}
```

---

## POST /api/users

| Field             | Value                |
| ----------------- | -------------------- |
| Endpoint          | `/api/users`         |
| HTTP method       | `POST`               |
| Purpose           | Create a new user    |
| Request parameters| None (path params)   |
| Request body      | `name`, `email`      |
| Successful response | `201 Created`      |
| Error responses   | `400 Bad Request`    |

### Example request

```http
POST /api/users
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com"
}
```

### Example response — `201 Created`

```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Error examples

Missing required field — `400 Bad Request`:

```json
{
  "success": false,
  "error": {
    "message": "'name' is required"
  }
}
```

Invalid email format — `400 Bad Request`:

```json
{
  "success": false,
  "error": {
    "message": "'email' must be a valid email address"
  }
}
```

Malformed JSON — `400 Bad Request`:

```json
{
  "success": false,
  "error": {
    "message": "Invalid JSON in request body"
  }
}
```

---

## GET / (info)

| Field             | Value                       |
| ----------------- | --------------------------- |
| Endpoint          | `/`                         |
| HTTP method       | `GET`                       |
| Purpose           | API information / health    |
| Successful response | `200 OK`                  |

### Example response

```json
{
  "success": true,
  "data": {
    "name": "DecodeLabs Backend API",
    "endpoints": ["GET /api/users", "POST /api/users"]
  }
}
```

---

## Unknown routes

Any route that does not exist returns:

```http
GET /api/does-not-exist
```

```json
{
  "success": false,
  "error": {
    "message": "Route not found"
  }
}
```

Status: `404 Not Found`
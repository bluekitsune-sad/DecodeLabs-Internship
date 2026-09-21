# API — Users

Base URL: `http://localhost:3000`

All responses use a JSON envelope:

```json
{ "success": true, "data": ... }
```

Errors:

```json
{ "success": false, "error": { "message": "..." } }
```

## Endpoints

| Method | Path            | Description                    |
| ------ | --------------- | ------------------------------ |
| GET    | `/`             | API index                      |
| GET    | `/api/users`    | List all users                 |
| GET    | `/api/users/:id`| Get a single user              |
| POST   | `/api/users`    | Create a user                  |
| PATCH  | `/api/users/:id`| Partially update a user        |
| DELETE | `/api/users/:id`| Delete a user                  |

## Examples

### List users

```
GET /api/users
```

```json
{ "success": true, "data": [ { "id": 1, "name": "Ava Martinez", "email": "ava@example.com", "created_at": "2026-09-21 10:00:00" } ] }
```

### Create a user

```
POST /api/users
Content-Type: application/json
```

```json
{ "name": "Ava Martinez", "email": "ava@example.com" }
```

`201 Created` on success with the created record; `400` for validation errors or
a duplicate email.

### Update a user

```
PATCH /api/users/1
Content-Type: application/json
```

```json
{ "name": "Ava Martinez Chen" }
```

`200` with the updated record; `400` invalid data; `404` unknown id.

### Delete a user

```
DELETE /api/users/1
```

`200` with `{ "success": true, "data": { "id": 1 } }`; `404` unknown id.

## Status codes

| Code | Meaning                            |
| ---- | ---------------------------------- |
| 200  | Success (list/get/update/delete)   |
| 201  | Created                            |
| 400  | Invalid input / duplicate email / bad JSON |
| 403  | Origin not allowed by CORS         |
| 404  | Route or resource not found        |
| 500  | Server error                       |

## CORS

Only these origins may call the API from a browser:

- `http://localhost:5500`
- `http://127.0.0.1:5500`

Requests from any other origin receive `403`.
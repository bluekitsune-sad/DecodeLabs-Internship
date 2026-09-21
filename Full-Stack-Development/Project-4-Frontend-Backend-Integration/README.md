# Full Stack Project 4 — Frontend & Backend Integration

Connects the three earlier full-stack projects into one working application:

- **Project 1** frontend patterns (responsive, mobile-first HTML/CSS/JS)
- **Project 2** REST API (`GET/POST/PATCH/DELETE` on `/api/users`)
- **Project 3** SQLite database (persistent `users` table)

A static frontend on `http://localhost:5500` talks to the API on
`http://localhost:3000` using `fetch()` and async/await. The backend persists
users in SQLite and is configured with **CORS** scoped to the frontend origin.

## Architecture

```text
Browser (frontend :5500)
   |  fetch() -> JSON body
   v
Express API (backend :3000)
   |  cors() -> routes -> controller -> service
   v
better-sqlite3 (SQLite data/users.db)
```

Request/response flow:

```text
User interacts with frontend
   -> JavaScript serializes JSON (stringify)
   -> fetch() sends HTTP request to backend
   -> route/controller validates the request
   -> database is read or written
   -> backend returns JSON with a status code
   -> frontend parses JSON (response.json())
   -> DOM is updated dynamically
```

## Getting started

Node.js 18+ required.

```bash
npm install
```

### Run everything (backend + frontend)

```bash
npm run dev
```

Then open http://localhost:5500 in a browser.

### Run separately

```bash
npm start             # API on http://localhost:3000
npm run start:frontend  # frontend on http://localhost:5500
```

### Tests

```bash
npm test
```

Runs the backend test suite (Node's built-in test runner + supertest) covering
the API lifecycle, validation, persistence, error handling, and CORS.

## Frontend behaviour

The page (`frontend/index.html` + `frontend/js/app.js`) implements:

- **GET** — loads and renders users as cards on load and on Refresh
- **POST** — "Add a user" form, serialized with `JSON.stringify`
- **PATCH** — inline edit dialog, sent as a partial update
- **DELETE** — delete button with confirmation
- **Loading state** — "Loading users…" while a request is in flight
- **Success state** — confirmation banner after create/update/delete
- **Error state** — friendly inline error messages (no raw stack traces)
- **try/catch + async/await** around every request; no blocking patterns
- **DOM safety** — user-controlled text is inserted with `textContent`, never
  raw `innerHTML`

## Files

```text
Project-4-Frontend-Backend-Integration/
├── backend/
│   ├── src/
│   │   ├── database/connection.js   # SQLite connection + schema
│   │   ├── models/user.model.js     # SQL access layer
│   │   ├── validation/…             # request validation
│   │   ├── services/user.service.js # business logic
│   │   ├── controllers/…            # HTTP layer (status codes + JSON envelopes)
│   │   ├── routes/users.routes.js   # REST routes
│   │   ├── app.js                   # Express app (cors + json + routes)
│   │   └── server.js                # API entry point (port 3000)
│   └── tests/users.test.js
├── frontend/
│   ├── index.html
│   ├── css/style.css                # responsive, mobile-first
│   ├── js/app.js                    # fetch/async UI logic
│   └── server.js                    # static server (port 5500)
├── dev.js                           # launches both servers
├── README.md
├── API.md
├── .env.example
└── .gitignore
```

The layered backend structure (routes → controllers → services → models →
database) is reused directly from Project 3, per the integration requirement
that completed work should be preserved rather than rewritten.
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const os = require("os");
const path = require("path");

const request = require("supertest");

const TEST_DIR = path.join(os.tmpdir(), "decodelabs-p3-tests");
const TEST_DB = path.join(TEST_DIR, `users-${process.pid}.db`);

fs.mkdirSync(TEST_DIR, { recursive: true });
process.env.DATABASE_URL = TEST_DB;

const app = require("../src/app");
const { closeDatabase } = require("../src/database/connection");

let createdUserId;

test("GET /api/users returns 200 with an empty list on a fresh database", async () => {
  const res = await request(app).get("/api/users");
  assert.equal(res.status, 200);
  assert.equal(res.body.success, true);
  assert.ok(Array.isArray(res.body.data));
  assert.equal(res.body.data.length, 0);
});

test("POST /api/users creates a persistent record and returns 201", async () => {
  const res = await request(app)
    .post("/api/users")
    .send({ name: "Alice Chen", email: "alice@example.com" });

  assert.equal(res.status, 201);
  assert.equal(res.body.success, true);
  assert.ok(Number.isInteger(res.body.data.id));
  assert.equal(res.body.data.name, "Alice Chen");
  assert.equal(res.body.data.email, "alice@example.com");
  assert.ok(res.body.data.created_at);
  createdUserId = res.body.data.id;
});

test("POST /api/users with a missing required field returns 400", async () => {
  const res = await request(app)
    .post("/api/users")
    .send({ email: "bob@example.com" });

  assert.equal(res.status, 400);
  assert.equal(res.body.success, false);
  assert.match(res.body.error.message, /name/i);
});

test("POST /api/users with invalid email format returns 400", async () => {
  const res = await request(app)
    .post("/api/users")
    .send({ name: "Bob", email: "not-an-email" });

  assert.equal(res.status, 400);
  assert.equal(res.body.success, false);
  assert.match(res.body.error.message, /email/i);
});

test("POST /api/users with a duplicate email returns 400", async () => {
  const res = await request(app)
    .post("/api/users")
    .send({ name: "Alice Again", email: "alice@example.com" });

  assert.equal(res.status, 400);
  assert.equal(res.body.success, false);
  assert.match(res.body.error.message, /exist/i);
});

test("GET /api/users/:id returns an existing user", async () => {
  const res = await request(app).get(`/api/users/${createdUserId}`);
  assert.equal(res.status, 200);
  assert.equal(res.body.success, true);
  assert.equal(res.body.data.email, "alice@example.com");
});

test("GET /api/users/:id with a non-existing id returns 404", async () => {
  const res = await request(app).get("/api/users/999999");
  assert.equal(res.status, 404);
  assert.equal(res.body.success, false);
});

test("GET /api/users/:id with an invalid id returns 400", async () => {
  const res = await request(app).get("/api/users/abc");
  assert.equal(res.status, 400);
  assert.equal(res.body.success, false);
});

test("PATCH /api/users/:id updates an existing record", async () => {
  const res = await request(app)
    .patch(`/api/users/${createdUserId}`)
    .send({ name: "Alice Chen Li" });

  assert.equal(res.status, 200);
  assert.equal(res.body.success, true);
  assert.equal(res.body.data.name, "Alice Chen Li");
  assert.equal(res.body.data.email, "alice@example.com");
});

test("PATCH /api/users/:id with a non-existing id returns 404", async () => {
  const res = await request(app)
    .patch("/api/users/999999")
    .send({ name: "Nobody" });

  assert.equal(res.status, 404);
  assert.equal(res.body.success, false);
});

test("PATCH /api/users/:id with invalid data returns 400", async () => {
  const res = await request(app)
    .patch(`/api/users/${createdUserId}`)
    .send({ email: "bad-email" });

  assert.equal(res.status, 400);
  assert.equal(res.body.success, false);
});

test("PATCH /api/users/:id with a duplicate email returns 400", async () => {
  await request(app)
    .post("/api/users")
    .send({ name: "Bob Jones", email: "bob@example.com" });

  const res = await request(app)
    .patch(`/api/users/${createdUserId}`)
    .send({ email: "bob@example.com" });

  assert.equal(res.status, 400);
  assert.equal(res.body.success, false);
});

test("DELETE /api/users/:id removes an existing record", async () => {
  const res = await request(app).delete(`/api/users/${createdUserId}`);
  assert.equal(res.status, 200);
  assert.equal(res.body.success, true);
  assert.equal(res.body.data.id, createdUserId);

  const check = await request(app).get(`/api/users/${createdUserId}`);
  assert.equal(check.status, 404);
});

test("DELETE /api/users/:id with a non-existing id returns 404", async () => {
  const res = await request(app).delete("/api/users/999999");
  assert.equal(res.status, 404);
  assert.equal(res.body.success, false);
});

test("unknown route returns 404", async () => {
  const res = await request(app).get("/api/nope");
  assert.equal(res.status, 404);
  assert.equal(res.body.success, false);
});

test("malformed JSON body returns 400", async () => {
  const res = await request(app)
    .post("/api/users")
    .set("Content-Type", "application/json")
    .send('{"name": "unterminated');

  assert.equal(res.status, 400);
  assert.equal(res.body.success, false);
  assert.match(res.body.error.message, /JSON/i);
});

test("data persists after the database is closed and reopened", async () => {
  const res = await request(app)
    .post("/api/users")
    .send({ name: "Persist Me", email: "persist@example.com" });

  assert.equal(res.status, 201);
  const persistedId = res.body.data.id;

  closeDatabase();

  const after = await request(app).get(`/api/users/${persistedId}`);
  assert.equal(after.status, 200);
  assert.equal(after.body.success, true);
  assert.equal(after.body.data.email, "persist@example.com");
});

test.after(() => {
  closeDatabase();
  try {
    fs.rmSync(TEST_DIR, { recursive: true, force: true });
  } catch (_err) {
    // ignore cleanup failures
  }
});
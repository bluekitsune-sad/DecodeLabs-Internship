const test = require("node:test");
const assert = require("node:assert/strict");

const request = require("supertest");

const app = require("../src/app");

test("GET /api/users returns 200 with an empty user list", async (t) => {
  const res = await request(app).get("/api/users");

  assert.equal(res.status, 200);
  assert.equal(res.body.success, true);
  assert.ok(Array.isArray(res.body.data));
  assert.equal(res.body.data.length, 0);
});

test("POST /api/users creates a user and returns 201", async (t) => {
  const res = await request(app)
    .post("/api/users")
    .send({ name: "John Doe", email: "john@example.com" });

  assert.equal(res.status, 201);
  assert.equal(res.body.success, true);
  assert.equal(res.body.data.name, "John Doe");
  assert.equal(res.body.data.email, "john@example.com");
  assert.ok(Number.isInteger(res.body.data.id));
});

test("POST /api/users missing required field returns 400", async (t) => {
  const res = await request(app)
    .post("/api/users")
    .send({ email: "jane@example.com" });

  assert.equal(res.status, 400);
  assert.equal(res.body.success, false);
  assert.match(res.body.error.message, /name|required/i);
});

test("POST /api/users invalid email format returns 400", async (t) => {
  const res = await request(app)
    .post("/api/users")
    .send({ name: "Jane Doe", email: "not-an-email" });

  assert.equal(res.status, 400);
  assert.equal(res.body.success, false);
  assert.match(res.body.error.message, /email/i);
});

test("POST /api/users non-string name returns 400", async (t) => {
  const res = await request(app)
    .post("/api/users")
    .send({ name: 123, email: "jane@example.com" });

  assert.equal(res.status, 400);
  assert.equal(res.body.success, false);
  assert.match(res.body.error.message, /name/i);
});

test("POST /api/users with a JSON array body returns 400", async (t) => {
  const res = await request(app)
    .post("/api/users")
    .send([]);

  assert.equal(res.status, 400);
  assert.equal(res.body.success, false);
});

test("POST /api/users with malformed JSON returns 400", async (t) => {
  const res = await request(app)
    .post("/api/users")
    .set("Content-Type", "application/json")
    .send('{"name": "bad json"');

  assert.equal(res.status, 400);
  assert.equal(res.body.success, false);
  assert.match(res.body.error.message, /JSON/i);
});

test("GET /api/users returns previously created users", async (t) => {
  const res = await request(app).get("/api/users");

  assert.equal(res.status, 200);
  assert.equal(res.body.success, true);
  assert.ok(res.body.data.some((user) => user.email === "john@example.com"));
});

test("unknown route returns 404", async (t) => {
  const res = await request(app).get("/api/does-not-exist");

  assert.equal(res.status, 404);
  assert.equal(res.body.success, false);
  assert.match(res.body.error.message, /not found/i);
});
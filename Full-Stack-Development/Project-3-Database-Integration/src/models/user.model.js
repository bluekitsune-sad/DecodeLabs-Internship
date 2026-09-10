const { getDb } = require("../database/connection");

class DuplicateEmailError extends Error {
  constructor(message) {
    super(message);
    this.name = "DuplicateEmailError";
  }
}

const USER_COLUMNS = "id, name, email, created_at";

function list() {
  return getDb()
    .prepare(`SELECT ${USER_COLUMNS} FROM users ORDER BY id ASC`)
    .all();
}

function findById(id) {
  return getDb()
    .prepare(`SELECT ${USER_COLUMNS} FROM users WHERE id = ?`)
    .get(id);
}

function create({ name, email }) {
  try {
    const info = getDb()
      .prepare("INSERT INTO users (name, email) VALUES (?, ?)")
      .run(name, email);
    return findById(info.lastInsertRowid);
  } catch (err) {
    if (String(err.code).startsWith("SQLITE_CONSTRAINT")) {
      throw new DuplicateEmailError("A user with this email already exists.");
    }
    throw err;
  }
}

function update(id, { name, email }) {
  const fields = [];
  const params = [];

  if (name !== undefined) {
    fields.push("name = ?");
    params.push(name);
  }
  if (email !== undefined) {
    fields.push("email = ?");
    params.push(email);
  }
  if (fields.length === 0) {
    return findById(id);
  }

  params.push(id);
  const statement = getDb().prepare(
    `UPDATE users SET ${fields.join(", ")} WHERE id = ?`
  );

  try {
    statement.run(...params);
  } catch (err) {
    if (String(err.code).startsWith("SQLITE_CONSTRAINT")) {
      throw new DuplicateEmailError("A user with this email already exists.");
    }
    throw err;
  }
  return findById(id);
}

function remove(id) {
  const info = getDb().prepare("DELETE FROM users WHERE id = ?").run(id);
  return info.changes > 0;
}

module.exports = { DuplicateEmailError, list, findById, create, update, remove };
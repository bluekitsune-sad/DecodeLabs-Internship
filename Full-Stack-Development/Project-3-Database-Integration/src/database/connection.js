const fs = require("fs");
const path = require("path");

const Database = require("better-sqlite3");

let db = null;

function resolveDbPath() {
  const url = process.env.DATABASE_URL || "./data/users.db";
  if (url.startsWith("sqlite:")) {
    return url.replace(/^sqlite:/, "");
  }
  return url;
}

function initDatabase() {
  if (db) {
    return db;
  }

  const dbPath = resolveDbPath();
  if (dbPath !== ":memory:") {
    fs.mkdirSync(path.dirname(path.resolve(dbPath)), { recursive: true });
  }

  db = new Database(dbPath);
  db.pragma("journal_mode = WAL");
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      name       TEXT    NOT NULL,
      email      TEXT    NOT NULL UNIQUE,
      created_at TEXT    NOT NULL DEFAULT (datetime('now'))
    );
  `);
  return db;
}

function getDb() {
  return initDatabase();
}

function closeDatabase() {
  if (db) {
    db.close();
    db = null;
  }
}

module.exports = { initDatabase, getDb, closeDatabase };
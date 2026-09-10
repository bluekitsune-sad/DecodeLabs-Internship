const app = require("./app");
const { initDatabase, closeDatabase } = require("./database/connection");

const PORT = process.env.PORT || 3000;

try {
  initDatabase();
} catch (err) {
  console.error("Failed to connect to the database:", err.message);
  process.exit(1);
}

const server = app.listen(PORT, () => {
  console.log(`API listening on port ${PORT}`);
});

function shutdown() {
  server.close(() => {
    closeDatabase();
    process.exit(0);
  });
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
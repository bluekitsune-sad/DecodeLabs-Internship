const express = require("express");

const usersRouter = require("./routes/users.routes");

const app = express();

app.use(express.json());

app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    data: {
      name: "DecodeLabs Database Integration API",
      endpoints: [
        "GET    /api/users",
        "GET    /api/users/:id",
        "POST   /api/users",
        "PATCH  /api/users/:id",
        "DELETE /api/users/:id",
      ],
    },
  });
});

app.use("/api/users", usersRouter);

app.use((_req, res) => {
  res.status(404).json({
    success: false,
    error: { message: "Route not found" },
  });
});

app.use((err, _req, res, _next) => {
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({
      success: false,
      error: { message: "Invalid JSON in request body" },
    });
  }

  console.error(err);
  return res.status(500).json({
    success: false,
    error: { message: "Internal server error" },
  });
});

module.exports = app;
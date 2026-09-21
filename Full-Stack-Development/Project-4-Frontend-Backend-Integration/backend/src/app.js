const express = require("express");
const cors = require("cors");

const usersRouter = require("./routes/users.routes");

const app = express();

const FRONTEND_ORIGINS = [
  "http://localhost:5500",
  "http://127.0.0.1:5500",
];

app.use(
  cors({
    origin(origin, callback) {
      // Allow requests with no Origin header (curl, non-browser clients).
      if (!origin || FRONTEND_ORIGINS.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
  })
);
app.use(express.json());

app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    data: {
      name: "DecodeLabs Frontend/Backend Integration API",
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
  if (err.message && err.message.startsWith("Not allowed by CORS")) {
    return res.status(403).json({
      success: false,
      error: { message: "Origin not allowed by CORS" },
    });
  }

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
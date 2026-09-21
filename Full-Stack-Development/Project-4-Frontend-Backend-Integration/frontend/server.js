const path = require("path");
const express = require("express");

const PORT = process.env.FRONTEND_PORT || 5500;

const app = express();
app.use(express.static(path.join(__dirname)));

app.listen(PORT, () => {
  console.log(`Frontend serving on http://localhost:${PORT}`);
});
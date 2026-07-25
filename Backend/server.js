const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Hello from Express Backend 🚀",
    server: "Express.js",
    status: "Running",
    timestamp: new Date().toLocaleString(),
  });
});

app.listen(PORT, () => {
  console.log(`✅ Express Server running on http://localhost:${PORT}`);
});
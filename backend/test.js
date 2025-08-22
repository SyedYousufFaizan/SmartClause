const express = require("express");

console.log("🔥 Starting server file...");

const app = express();
const port = 5000;

app.get("/", (req, res) => {
  res.send("Server is working!");
});

app.listen(port, () => {
  console.log(`✅ Server is running at http://localhost:${port}`);
});

const express = require("express");
const dotenv = require("dotenv");
// const cookieParser = require("cookie-parser");

dotenv.config();
const app = express();

// middleware
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello");
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`server listening on ${PORT}`);
});

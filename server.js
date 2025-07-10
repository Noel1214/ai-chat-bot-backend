const express = require("express");
// const dotenv = require("dotenv");
// const cookieParser = require("cookie-parser");
const cors = require("cors");

const aiChatRoute = require("./routes/ai-chat-route.js");

// dotenv.config();
const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("hello");
});

app.use("/ai", aiChatRoute);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`server listening on ${PORT}`);
});

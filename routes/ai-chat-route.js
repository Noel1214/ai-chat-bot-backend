const express = require("express");
const router = express.Router();

const aiChatController = require("../controllers/ai-chat-controller.js");

router.route("/").get(aiChatController);

module.exports = router;

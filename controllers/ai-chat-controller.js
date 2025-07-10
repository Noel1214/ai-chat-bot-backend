const generateResponse = require("../utils/generate-response.js");

const aiChatController = async (req, res) => {
  generateResponse(req, res);
};

module.exports = aiChatController;

const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");

router.route("/google").get(authController.googleLogin);
router.route("/google/callback").get(authController.googleCallback);

module.exports = router;

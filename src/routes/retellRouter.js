const express = require("express");
const router = express.Router();

const { handleRetellWebhook } = require("../controllers/retellController"); // ✅ Correct import

router.post("/retell-webhook", handleRetellWebhook); // ✅ Route setup

module.exports = router;

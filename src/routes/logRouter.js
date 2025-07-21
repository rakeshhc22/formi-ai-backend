const express = require("express");
const router = express.Router();
const { logCallSummary } = require("../controllers/logController");

router.post("/", logCallSummary);

module.exports = router;

const express = require("express");
const router = express.Router();
const { queryCSV } = require("../controllers/queryController");

router.post("/", queryCSV);

module.exports = router;

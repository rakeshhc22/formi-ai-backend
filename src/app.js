// src/app.js (CommonJS version)
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const queryRouter = require("./routes/queryRouter");
const logRouter = require("./routes/logRouter");
const retellRouter = require("./routes/retellRouter"); 

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/query", queryRouter);
app.use("/api/log", logRouter);
app.use("/", retellRouter);

app.get("/", (req, res) => {
  res.send("🌐 Formi Voice AI Backend is Running");
});

module.exports = app;

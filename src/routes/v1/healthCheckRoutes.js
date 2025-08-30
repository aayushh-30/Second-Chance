const express = require("express");
const { healthCheck } = require("../../controllers/healthCheckController");

const Router = express.Router();

Router.get("/health", healthCheck);

module.exports = Router;

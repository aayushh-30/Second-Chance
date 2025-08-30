const express = require("express")

const Router = express.Router()

Router.use("/user",require("./userRoutes"));
Router.use("/items",require("./itemRoutes"));
Router.use("/health", require("./healthCheckRoutes"));

module.exports = Router
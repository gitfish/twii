const express = require("express");
const dataRoute = require("./data/index");

const route = express.Router();
route.use("/data", dataRoute);

module.exports = route;
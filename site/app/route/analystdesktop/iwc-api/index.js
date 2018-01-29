const express = require("express");
const selfRoute = require("./self/index");

const route = express.Router();
route.use("/self", selfRoute);

module.exports = route;
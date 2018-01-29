const express = require("express");
const selfRoute = require("./self/index");
const listingsRoute = require("./listings/index");

const route = express.Router();
route.use("/self", selfRoute);
route.use("/listings", listingsRoute);

module.exports = route;
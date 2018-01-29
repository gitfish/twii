const express = require("express");
const pnrRoute = require("./pnr/index");
const matchRoute = require("./match/index.js");
const historyRoute = require("./history/index.js");
const iatRoute = require("./iat/index");
const cruRoute = require("./cru/index");
const vesselRoute = require("./vessel/index");

const route = express.Router();

route.use("/pnr", pnrRoute);
route.use("/iat", iatRoute);
route.use("/cru", cruRoute);
route.use("/match", matchRoute);
route.use("/TravellerHistoryService", historyRoute);
route.use("/vessel", vesselRoute);

module.exports = route;
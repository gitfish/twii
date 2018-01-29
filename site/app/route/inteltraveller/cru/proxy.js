//const targetUrl = "http://10.3.1.140:7808/risk/traveller/cru/CRUDataService";
const targetUrl = "http://10.3.1.140:7808/IntelTraveller/cru/CRUDataService";
const request = require("request");

const express = require("express");
const route = express.Router();
route.post("/CRUDataService", (req, res) => {
    req.pipe(request(targetUrl)).pipe(res);
});

module.exports = route;
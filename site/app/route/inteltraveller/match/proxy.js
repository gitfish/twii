//const targetUrl = "http://10.3.16.20:7800/inteltraveller/match/ProfileMatchDataService";
//const targetUrl = "http://10.3.1.140:7808/risk/traveller/profilematchdataservice";
const targetUrl = "http://10.3.1.140:7808/IntelTraveller/match/ProfileMatchDataService";
const request = require("request");

const express = require("express");
const route = express.Router();
route.post("/profilematchdataservice", (req, res) => {
    req.pipe(request(targetUrl)).pipe(res);
});

module.exports = route;
//const targetUrl = "http://10.3.16.20:7800/IntelTraveller/iat/IATTravellerDataService";
//const targetUrl = "http://10.3.1.140:7808/risk/traveller/iat/IATTravellerDataService";
const targetUrl = "http://10.3.1.140:7808/IntelTraveller/iat/IATTravellerDataService";
const request = require("request");

const express = require("express");
const route = express.Router();
route.post("/IATTravellerDataService", (req, res) => {
    req.pipe(request(targetUrl)).pipe(res);
});

module.exports = route;
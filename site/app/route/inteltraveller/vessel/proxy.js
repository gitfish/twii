//const targetUrl = "http://10.3.16.20:7800/service/Vessel/VesselDataService";
//const targetUrl = "http://10.3.1.140:7808/service/vessel/VesselDataService";
const targetUrl = "http://10.3.1.140:7808/IntelTraveller/vessel/VesselDataService";
const request = require("request");

const express = require("express");
const route = express.Router();
route.post("/VesselDataService", (req, res) => {
    req.pipe(request(targetUrl)).pipe(res);
});

module.exports = route;
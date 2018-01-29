//const targetUrl = "http://10.3.1.140:7808/risk/traveller/pnr/PNRDataService";
const targetUrl = "http://10.3.1.140:7808/IntelTraveller/pnr/PNRDataService";
const request = require("request");

const express = require("express");
const route = express.Router();
route.post("/PNRDataService", (req, res) => {
    console.log("proxying /PNRDataService to " + targetUrl);
    req.pipe(request(targetUrl)).pipe(res);
});

module.exports = route;
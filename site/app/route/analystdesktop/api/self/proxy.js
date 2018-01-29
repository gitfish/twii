const targetUrl = "http://localhost:8000/api/self/profile/";
const request = require("request");
const express = require("express");

const route = express.Router();

const profileGetHandler = (req, res) => {
    req.pipe(request(targetUrl)).pipe(res);
};

route.get("/profile", profileGetHandler);
route.get("/profile/", profileGetHandler);

module.exports = route;
const targetUrl = "http://localhost:8000/api/listings/search/";
const request = require("request");
const express = require("express");

const route = express.Router();

const searchGetHandler = (req, res) => {
    req.pipe(request(targetUrl)).pipe(res);
};

route.get("/search", searchGetHandler);
route.get("/search/", searchGetHandler);

module.exports = route;
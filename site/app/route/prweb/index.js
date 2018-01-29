const express = require("express");
const path = require("path");

const route = express.Router();

route.use("/PRServletContainerAuth", (req, res) => {
    res.sendFile("/pegamock.html", { root: __dirname });
});

module.exports = route;
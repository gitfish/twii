const path = require("path");
const express = require("express");
const apiRoute = require("./api/index");
const iwcApiRoute = require("./iwc-api/index");

const route = express.Router();
route.use("/api", apiRoute);
route.use("/iwc-api", iwcApiRoute);
const contentDir = path.join(__dirname, "..", "..", "..", "dist");

const siteRoute = express.Router();
siteRoute.use((req, res, next) => {
    var ext = path.extname(req.path);
    if(!ext || ext === ".html") {
        res.sendFile("index.html", { root: contentDir });
    } else {
        next();
    }
});
siteRoute.use(express.static(contentDir));

route.use("/widget/site", siteRoute);

module.exports = route;


"use strict";
const express = require("express");
const path = require("path");
const morgan = require("morgan");
const analystDesktopRoute = require("./route/analystdesktop");
const intelTravellerRoute = require("./route/inteltraveller");
const solrRoute = require("./route/solr");
const dataServicesRouter = require("./route/dataServices");
const cucumberMockRouter = require("./route/cucumberMockRouter");
const prwebRouter = require("./route/prweb");
const yargs = require("yargs");

const app = express();
app.use(morgan("tiny"));
app.use("/IntelTraveller", intelTravellerRoute);
app.use("/analystdesktop", analystDesktopRoute);
app.use("/solr", solrRoute);
app.use("/prweb", prwebRouter);

const contentDir = path.join(__dirname, "..", "dist");

// switch depending upon the backend argument
if (yargs.argv.cucumberMock) {
    app.use("/DataServices", cucumberMockRouter);
} else {
    app.use("/DataServices", dataServicesRouter);
}

app.use("/DataServicesPNR", dataServicesRouter);


app.use(function(req, res, next) {
    var ext = path.extname(req.path);
    if(!ext || ext === ".html") {
        res.sendFile("index.html", { root: contentDir });
    } else {
        next();
    }
});

app.use(express.static(contentDir));

module.exports = app;
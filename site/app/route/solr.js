const express = require("express");
const axios = require("axios");

const solrBaseUrl = "http://rhd1e1.corpnet.customs:9011/solr";
const solrRouter = express.Router();
solrRouter.get("/*", (req, res, next) => {
    const path = solrBaseUrl + req.path;
    axios.get(solrBaseUrl + req.path, {
        params: req.query
    }).then((result) => {
        res.json(result.data).end();
    }).catch((error) => {
        console.error(error);
        res.status(500).end();
    });
});

module.exports = solrRouter;

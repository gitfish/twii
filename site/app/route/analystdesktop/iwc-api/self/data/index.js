const express = require("express");
const bodyParser = require('body-parser');

const route = express.Router();
route.use(bodyParser.json());

const data = {};

const getByKeyHandler = (req, res) => {
    if(data[req.params.key]) {
        res.json(data[req.params.key]);
    }
    res.status(404).json({ code: "KEY_NOT_FOUND", message: "Unable to find entry: " + req.params.key });
};

const putByKeyHandler = (req, res) => {
    data[req.params.key] = req.body;
    res.status(201).end();
};

route.get("/:key", getByKeyHandler);
route.get("/:key/", getByKeyHandler);
route.put("/:key", putByKeyHandler);
route.put("/:key/", putByKeyHandler);

module.exports = route;
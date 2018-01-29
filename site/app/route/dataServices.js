const express = require("express");
const axios = require("axios");
const https = require("https");
const fs = require("fs");
const bodyParser = require("body-parser");

const apiBaseUrl = "http://e1-analyst04:3010";
//const apiBaseUrl = "http://localhost:3010";
//const apiBaseUrl = "http://10.3.1.140:7808/";

const apiUsername = "adpta0";
const apiPassword = "pP@ssw0rd!";

https.globalAgent.options.ca = fs.readFileSync('dibpca.cer');
const dsRouter = express.Router();
dsRouter.use(bodyParser.raw({ type: '*/*' }));

let _lbCookie, _pdCookie;
dsRouter.all("/*", (req, res, next) => {

    let apiCallWithAuthPromise = () => {
        Promise.resolve()
            .then(formLoginGet())
            .then(formLoginPost())
            .then(apiCall(req))
            .then((result) => {
                handleResult(result, res);
            }).catch((error) => {
                handleApiError(res, error);
            });
    };
    if (_lbCookie && _pdCookie) {
        Promise.resolve()
            .then(apiCall(req))
            .then((result) => {
                handleResult(result, res);
            }).catch((error) => {
                if (error.response && error.response.status === 401) {
                    console.log("Cookie expired or invalid. Re-authenticating...");
                    apiCallWithAuthPromise();
                } else {
                    handleApiError(res, error);
                }
            });
    } else {
        apiCallWithAuthPromise();
    }
});

function formLoginGet() {
    return () => {
        return axios.get(apiBaseUrl + "/formlogin.html")
            .then((result) => {
                _lbCookie = extractCookie(result);
                console.log("> %s - %s", result.config.url, result.statusText);
            });
    };
}

function formLoginPost () {
    return () => {
        return axios.post(apiBaseUrl + "/pkmslogin.form",
            "login-form-type=pwd&username=" + encodeURIComponent(apiUsername) + "&password=" + encodeURIComponent(apiPassword),
            {headers: {"Content-Type": "application/x-www-form-urlencoded", "Cookie": _lbCookie}})
            .then((result) => {
                console.log("> %s - %s", result.config.url, result.statusText);
                _pdCookie = extractCookie(result);
            });
    };
}

function apiCall (req) {
    return () => {
        let reqConfig = {
            url: apiBaseUrl + req.originalUrl,
            method: req.method,
            data: req.method === 'POST' ? req.body : undefined,
            headers: {
                "Cookie": _lbCookie + "; " + _pdCookie,
                "Content-Type": req.header("Content-Type") || 'application/octet-stream'
            }
        };
        return axios(reqConfig).then((result) => {
            console.log("> %s - %s", result.config.url, result.statusText);
            return result;
        });
    };
}

function handleApiError (res, error) {
    console.error("API Error: ", error);
    if (error.response) {
        res.status(error.response.status);
        res.send(error.response.data);
    } else {
        res.status(500).send(JSON.stringify(error));
    }
}

function handleResult(result, res) {
    res.set('Content-Type', result.headers["content-type"]);
    res.send(result.data);
}

function extractCookie(result) {
    let cookieHeader = result.headers["set-cookie"];
    let cookies = /(.*=.*);.*/g.exec(cookieHeader[0]);
    return cookies[1];
}

module.exports = dsRouter;
const express = require("express");

const route = express.Router();

const profileConfig = {
    id: 1,
    display_name: "Analyst Desktop Development User",
    user: {
        username: "ADPTA0",
        email: "ADPTA0@border.gov.au",
        groups: [{
            name: "USER"
        }, {
            name: "ORG_STEWARD"
        }, {
            name: "APPS_MALL_STEWARD"
        }, {
            name: "analyst_desktop_entity_search"
        }, {
            name: "analyst_desktop_match_evaluation"
        }, {
            name: "analyst_desktop_risk_resume"
        }, {
            name: "analyst_desktop_pnr_search"
        }]
    }
};

const profileGetHandler = (req, res) => {
    res.json(profileConfig).end();
};

route.get("/profile", profileGetHandler);
route.get("/profile/", profileGetHandler);

module.exports = route;
const express = require("express");

const route = express.Router();

const searchConfig = [{
    id: 1,
    is_enabled: true,
    title: "Entity Search",
    launch_url: "/entity/search",
    security_marking: "analyst_desktop_entity_search"
}, {
    id: 2,
    is_enabled: true,
    title: "Clipboard",
    launch_url: "/entity/profile",
    security_marking: "analyst_desktop_entity_search"
}, {
    id: 3,
    is_enabled: true,
    title: "ME Case Management",
    launch_url: "/me/portal",
    security_marking: "analyst_desktop_match_evaluation"
}, {
    id: 4,
    is_enabled: true,
    title: "Risk Resume Search",
    launch_url: "/vra/search",
    security_marking: "analyst_desktop_risk_resume"
}, {
    id: 5,
    is_enabled: true,
    title: "PNR Search",
    launch_url: "/pnr/search",
    security_marking: "analyst_desktop_pnr_search"
}];

const searchGetHandler = (req, res) => {
    res.json(searchConfig).end();
};

route.get("/search", searchGetHandler);
route.get("/search/", searchGetHandler);

module.exports = route;
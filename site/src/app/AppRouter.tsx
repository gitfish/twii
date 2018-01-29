import * as React from "react";
import Router from "roota/lib/Router";
import configure from "config/configure";
import NavRouter from "nav/NavRouter";
import EntityRouter from "entity/EntityRouter";
import HelpRouter from "help/HelpRouter";
import UserRouter from "user/UserRouter";
import MERouter from "me/MERouter";
import IconRouter from "icon/IconRouter";
import VRARouter from "vra/VRARouter";
import PNRRouter from "pnr/PNRRouter";
import DashboardRouter from "dashboard/DashboardRouter";
import ListingRouter from "listing/ListingRouter";
import { SmartGateRouter } from "smartgate/SmartGateRouter";

const r = new Router();

// these are our 'interceptors'
r.use((req, next) => {
    return configure(AppConfig.configName).then(next);
});

// application mappings
r.use("/icon", IconRouter);
r.use("/nav", NavRouter);
r.use("/help", HelpRouter);
r.use("/user", UserRouter);

r.use("/search", req => {
    return import("search/component/SearchApplet").then(m => {
        return <m.SearchApplet host={req.app} />;
    });
});
r.use("/entity", EntityRouter);
r.use("/me", MERouter);
r.use("/vra", VRARouter);
r.use("/pnr", PNRRouter);
r.use("/dashboard", DashboardRouter);
r.use("/listing", ListingRouter);
r.use("/smartgate", SmartGateRouter);

r.use("/blank", req => {
    return null;
});

r.use((req, next) => {
    if(req.path === "/" || req.path === "/index" || req.path === "/dashboard") {
        return import("dashboard/component/DashboardListApplet").then(m => {
            return <m.DashboardListApplet host={req.app} />;
        });
    }
    return next(req);
});

export { r as default, r as AppRouter }
import * as React from "react";
import { Router } from "@twii/router/lib/Router";
import { exactPath } from "@twii/router/lib/Routers";
import { createSampleRouter } from "@twii/sample-base/lib/sampleRouter";

const r = new Router();
r.use(createSampleRouter());

r.use((req, next) => {
    if(req.path === "/" || req.path === "/index" || req.path === "/dashboards") {
        return import("./component/DashboardListApp").then(m => {
            return <m.DashboardListApp host={req.app} />;
        });
    }
    return next();
});

export { r as AppRouter }

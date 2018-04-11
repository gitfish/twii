import * as React from "react";
import { Router } from "@pu/router/lib/Router";
import { exactPath } from "@pu/router/lib/Routers";
import { createSampleRouter } from "@pu/sample-base/lib/sampleRouter";

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

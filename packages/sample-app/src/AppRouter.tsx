import * as React from "react";
import { Router } from "@twii/router/lib/Router";
import { exactPath } from "@twii/router/lib/Routers";
import { createSampleRouter } from "@twii/sample-base/lib/sampleRouter";
import { ConfigRouter } from "@twii/core/lib/ConfigRouter";
import { OzoneRouter } from "@twii/ozone-app/lib/OzoneRouter";
import * as configMap from "./config/map";

const r = new Router();
r.use(new ConfigRouter({
    env: AppConfig.env,
    configMap: configMap
}));
r.use((req, next) => {
    console.log("-- Sample App Router Request: " + JSON.stringify(req));
    return next();
});
r.use(OzoneRouter);
const sampleRouter = createSampleRouter();
r.use(sampleRouter);
r.use("/dashboards", req => {
    return import("./component/DashboardListApp").then(m => {
        return <m.DashboardListApp host={req.app} />;
    });
});

r.use((req, next) => {
    if(req.path === "/" || req.path === "/index" || req.path === "/home") {
        return import("@twii/sample-base/lib/component/Home").then(m => {
            return (
                <m.Home host={req.app} />
            );
        });
    }
    return next();
});

r.defaultHandler = (req) => {
    return <div>We haven't got anything useful at {req.path}</div>;
};

export { r as AppRouter }

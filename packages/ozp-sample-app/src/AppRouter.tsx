import * as React from "react";
import { Router } from "@twii/router/lib/Router";
import { exactPath } from "@twii/router/lib/Routers";
import { ConfigRouter } from "@twii/common/lib/ConfigRouter";
import { configMap } from "@twii/ozp/lib/config/configMap";
import { createSampleRouter } from "@twii/sample-base/lib/sampleRouter";
import { createOzpRouter } from "@twii/ozp/lib/ozpRouter";

const r = new Router();
r.use(new ConfigRouter({
    configId: AppConfig.env.configId,
    env: AppConfig.env,
    configMap: configMap
}));
r.use(createOzpRouter());
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

import * as React from "react";
import { Router } from "roota/lib/Router";
import { exactPath } from "roota/lib/Routers";
import { AppWrapper } from "@twii/ui-core/lib/app/component/AppWrapper";

const AppRouter = new Router();

AppRouter.use("/samples/form", exactPath(req => {
    return import("@twii/ui-sample-base/lib/Form").then(m => {
        return <m.FormSampleApp />;
    });
}));

AppRouter.use((req, next) => {
    if(req.path === "/" || req.path === "/index" || req.path === "/dashboard") {
        return import("./component/DashboardListApp").then(m => {
            return <m.DashboardListApp host={req.app} />;
        });
    }
    return next();
});

export { AppRouter }

import * as React from "react";
import { Router } from "roota/lib/Router";
import { exactPath } from "roota/lib/Routers";

const AppRouter = new Router();

AppRouter.use("/samples/form", exactPath(req => {
    return import("@twii/sample-base/lib/component/Form").then(m => {
        return <m.FormSamples />;
    });
}));

AppRouter.use("/samples/picker", exactPath(req => {
    return import("@twii/sample-base/lib/component/Picker").then(m => {
        return <m.PickerSamples />;
    });
}));

AppRouter.use("/samples/dashboard", exactPath(req => {
    return import("./component/DashboardSample").then(m => {
        return <m.DashboardSample host={req.app} />;
    });
}));

AppRouter.use("/app/add", exactPath(req => {
    return import("./component/AppList").then(m => {
        return <m.AppListApp host={req.app} />;
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

import * as React from "react";
import { Router } from "roota/lib/Router";
import { exactPath } from "roota/lib/Routers";

const AppRouter = new Router();

AppRouter.use("/samples/form", exactPath(req => {
    return import("@twii/sample-base/lib/component/Form").then(m => {
        return <m.FormSamplesApp host={req.app} />;
    });
}));

AppRouter.use("/samples/picker", exactPath(req => {
    return import("@twii/sample-base/lib/component/Picker").then(m => {
        return <m.PickerSamplesApp host={req.app} />;
    });
}));

AppRouter.use("/samples/personform", exactPath(req => {
    return import("@twii/sample-base/lib/component/PersonForm").then(m => {
        return <m.PersonFormSamplesApp host={req.app} />;
    });
}));

AppRouter.use("/samples/dashboard", exactPath(req => {
    return import("./component/DashboardSample").then(m => {
        return <m.DashboardSampleApp host={req.app} />;
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

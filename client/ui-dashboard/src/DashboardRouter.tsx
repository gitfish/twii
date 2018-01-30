import * as React from "react";
import Router from "roota/lib/Router";
import { exactPath } from "roota/lib/Utils";

const r = new Router();
r.use("/layout", exactPath(req => {
    return import("./component/DashboardLayoutButton").then(m => {
        return <m.DashboardListLayoutApplet />;
    });
}));

export { r as default, r as DashboardRouter }
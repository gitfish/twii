import * as React from "react";
import Router from "roota/lib/Router";
import ListingListStore from "listing/ListingListStore";
import UserProfileHandleStore from "user/UserProfileHandleStore";
import { exactPath } from "common/RouterUtils";

const r = new Router();
r.use("/layout", exactPath(req => {
    return import("./component/DashboardLayoutButton").then(m => {
        return <m.DashboardListLayoutApplet />;
    });
}));

export { r as default, r as DashboardRouter }
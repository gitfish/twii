import * as React from "react";
import { Router } from "@twii/router/lib/Router";
import { exactPath } from "@twii/router/lib/Routers";
import { ConfigRouter } from "@twii/common/lib/ConfigRouter";
import { configMap } from "@twii/ozp/lib/config/configMap";

const r = new Router();
r.use(new ConfigRouter({
    configId: AppConfig.env.configId,
    env: AppConfig.env,
    configMap: configMap
}));
r.use("/listing", exactPath(req => {
    return import("@twii/ozp/lib/listing/component/ListingListApp").then(m => {
        return <m.ListingListApp host={req.app} />; 
    });  
}));
r.use("/listing/bookmark", exactPath(req => {
    return import("@twii/ozp/lib/listing/component/ListingBookmarksApp").then(m => {
        return <m.ListingBookmarksApp host={req.app} />; 
    });
}));
r.use("/listing/storefront", exactPath(req => {
    return import("@twii/ozp/lib/listing/component/ListingStoreFrontApp").then(m => {
        return <m.ListingStoreFrontApp host={req.app} />; 
    });
}));
r.use("/listing/:listingId", exactPath(req => {
    return import("@twii/ozp/lib/listing/component/ListingApp").then(m => {
        return <m.ListingApp host={req.app} listingId={parseInt(req.params.listingId)} />;
    });
}));
r.use("/listing/:listingId/launch", exactPath(req => {
    return import("@twii/ozp/lib/listing/component/ListingLaunch").then(m => {
        return <m.ListingLaunchApp host={req.app} listingId={parseInt(req.params.listingId)} />; 
    });
}));

r.use((req, next) => {
    if(req.path === "/" || req.path === "/index" || req.path === "/dashboards") {
        return import("./component/DashboardListApp").then(m => {
            return <m.DashboardListApp host={req.app} />;
        });
    }
    return next();
});

export { r as AppRouter }

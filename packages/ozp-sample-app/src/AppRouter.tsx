import * as React from "react";
import { Router } from "@pu/router/lib/Router";
import { exactPath } from "@pu/router/lib/Routers";

const r = new Router();
let appliedConfigId : string;
r.use((req, next) => {
    let configId = req.params._config || AppConfig.env.configId;
    if(configId && configId !== appliedConfigId) {
        appliedConfigId = configId;
        console.log("-- Applying Configuration: " + configId);
        return import("./config/configs").then(m => {
            const h = m[configId];
            if(h) {
                return h(AppConfig.env).then(next);
            }
            return next();
        });
    }
    return next();
});
r.use("/listing", exactPath(req => {
    return import("@pu/ozp/lib/listing/component/ListingListApp").then(m => {
        return <m.ListingListApp host={req.app} />; 
    });  
}));
r.use("/listing/bookmark", exactPath(req => {
    return import("@pu/ozp/lib/listing/component/ListingBookmarksApp").then(m => {
        return <m.ListingBookmarksApp host={req.app} />; 
    });
}));
r.use("/listing/storefront", exactPath(req => {
    return import("@pu/ozp/lib/listing/component/ListingStoreFrontApp").then(m => {
        return <m.ListingStoreFrontApp host={req.app} />; 
    });
}));
r.use("/listing/:listingId", exactPath(req => {
    return import("@pu/ozp/lib/listing/component/ListingApp").then(m => {
        return <m.ListingApp host={req.app} listingId={parseInt(req.params.listingId)} />;
    });
}));
r.use("/listing/:listingId/launch", exactPath(req => {
    return import("@pu/ozp/lib/listing/component/ListingLaunch").then(m => {
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

import * as React from "react";
import { Router } from "@twii/router/lib/Router";
import { exactPath } from "@twii/router/lib/Routers";

const createOzpRouter = () => {
    const r = new Router();
    r.use("/listing", exactPath(req => {
        return import("./listing/component/ListingListApp").then(m => {
            return <m.ListingListApp host={req.app} />; 
        });  
    }));
    r.use("/listing/bookmark", exactPath(req => {
        return import("./listing/component/ListingBookmarksApp").then(m => {
            return <m.ListingBookmarksApp host={req.app} />; 
        });
    }));
    r.use("/listing/storefront", exactPath(req => {
        return import("./listing/component/ListingStoreFrontApp").then(m => {
            return <m.ListingStoreFrontApp host={req.app} />; 
        });
    }));
    r.use("/listing/:listingId", exactPath(req => {
        return import("./listing/component/ListingApp").then(m => {
            return <m.ListingApp host={req.app} listingId={parseInt(req.params.listingId)} />;
        });
    }));
    r.use("/listing/:listingId/launch", exactPath(req => {
        return import("./listing/component/ListingLaunch").then(m => {
            return <m.ListingLaunchApp host={req.app} listingId={parseInt(req.params.listingId)} />; 
        });
    }));
    return r;
};

export { createOzpRouter }
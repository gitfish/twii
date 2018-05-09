import * as React from "react";
import { Router } from "@twii/router/lib/Router";
import { exactPath } from "@twii/router/lib/Routers";

const r = new Router();
r.use("/ozone/bookmarks", exactPath(req => {
    return import("./listing/component/ListingBookmarksApp").then(m => {
        return <m.ListingBookmarksApp host={req.app} />; 
    });
}));
r.use("/ozone/listings", exactPath(req => {
    return import("./listing/component/ListingListApp").then(m => {
        return <m.ListingListApp host={req.app} />; 
    });  
}));
r.use("/ozone/store", exactPath(req => {
    return import("./listing/component/ListingStoreFrontApp").then(m => {
        return <m.ListingStoreFrontApp host={req.app} />; 
    });
}));
r.use("/ozone/listings/add", exactPath(req => {
    return import("./listing/component/ListingAddApp").then(m => {
        return <m.ListingAddApp host={req.app} />;
    });
}));

r.use("/ozone/listings/:listingId", exactPath(req => {
    return import("./listing/component/ListingApp").then(m => {
        return <m.ListingApp host={req.app} listingId={req.params.listingId} />;
    });
}));
r.use("/ozone/listings/:listingId/launch", exactPath(req => {
    return import("./listing/component/ListingLaunch").then(m => {
        return <m.ListingLaunchApp host={req.app} listingId={req.params.listingId} />; 
    });
}));
r.use("/ozone/listings/:listingId/edit", exactPath(req => {
    return import("./listing/component/ListingEditApp").then(m => {
        return <m.ListingEditApp host={req.app} listingId={req.params.listingId} />;
    });
}));

export { r as OzoneRouter }
import * as React from "react";
import Router from "roota/lib/Router";
import UserGroup from "user/UserGroup";
import { requiresAuthHandler } from "user/UserAuthHandler";
import { exactPath } from "common/RouterUtils";

const r = new Router();
const listingHandler = exactPath(requiresAuthHandler(UserGroup.ADMIN, req => {
    return import("./component/ListingListApp").then(m => {
        return <m.ListingListApp host={req.app} />;
    });
}), true);
r.use(listingHandler);
const listingAddHandler = exactPath(requiresAuthHandler(UserGroup.ADMIN, req => {
    return import("./component/ListingAddApp").then(m => {
        return <m.ListingAddApp host={req.app} from={req.params.from} />;
    });
}))
r.use("/add", listingAddHandler);
const listingEditHandler = exactPath(requiresAuthHandler(UserGroup.ADMIN, req => {
    return import("./component/ListingEditApplet").then(m => {
        return <m.ListingEditApplet host={req.app} listingId={req.params.listingId} />;
    });
}));
r.use("/:listingId/edit", listingEditHandler);
r.use("/menu/shop", exactPath(req => {
    return import("./component/ListingStoreAppMenuItem").then(m => {
        return <m.ListingStoreAppMenuItem host={req.app} />;
    });
}));
r.use("/bookmarks", exactPath(req => {
    return import("./component/ListingBookmarksApp").then(m => {
        return <m.ListingBookmarksApp host={req.app} />;
    });
}));
r.use("/shop", exactPath(req => {
    return import("./component/ListingStoreFrontApp").then(m => {
        return <m.ListingStoreFrontApp host={req.app} />;
    });
}));
r.use("/:listingId/launch", exactPath(req => {
    return import("./component/ListingLaunch").then(m => {
        return <m.ListingLaunchApp host={req.app} listingId={req.params.listingId} />;
    });
}));
r.use("/:listingId/review", exactPath(req => {
    return import("./component/ListingReviewListApp").then(m => {
        return <m.ListingReviewListApp host={req.app} listingId={req.params.listingId} />;
    });
}));
r.use("/:listingId", exactPath(req => {
    return import("./component/ListingApp").then(m => {
        return <m.ListingApp host={req.app} listingId={req.params.listingId} />;
    });
}));

export { r as default, r as ListingRouter }
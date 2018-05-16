import * as React from "react";
import { Router } from "@twii/router/lib/Router";
import { requiresUserProfile } from "./user/UserAuthRouters";
import { reactRouter } from "@twii/router-react/lib/reactRouter";

const r = new Router();
r.use(requiresUserProfile);
r.use("/ozone/bookmarks", reactRouter(() => import("./listing/component/ListingBookmarksApp")));
r.use("/ozone/listings", reactRouter(() => import("./listing/component/ListingListApp")));
r.use("/ozone/store", reactRouter(() => import("./listing/component/ListingStoreFrontApp")));
r.use("/ozone/listings/add", reactRouter(() => import("./listing/component/ListingAddApp")));
r.use("/ozone/listings/:listingId", reactRouter(() => import("./listing/component/ListingApp")));
r.use("/ozone/listings/:listingId/launch", reactRouter(() => import("./listing/component/ListingLaunch")));
r.use("/ozone/listings/:listingId/edit", reactRouter(() => import("./listing/component/ListingEditApp")));

export { r as OzoneRouter }
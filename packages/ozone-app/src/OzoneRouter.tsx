import * as React from "react";
import { Router } from "@twii/router/lib/Router";
import { requiresUserProfile } from "@twii/ozone/lib/user/UserAuthRouters";
import { reactRouter } from "@twii/router-react/lib/reactRouter";

const r = new Router();
r.use(requiresUserProfile);
r.use("/ozone/bookmarks", reactRouter(() => import("@twii/ozone/lib/listing/component/ListingBookmarksApp")));
r.use("/ozone/listings", reactRouter(() => import("@twii/ozone/lib/listing/component/ListingListApp")));
r.use("/ozone/store", reactRouter(() => import("@twii/ozone/lib/listing/component/ListingStoreFrontApp")));
r.use("/ozone/listings/add", reactRouter(() => import("@twii/ozone/lib/listing/component/ListingAddApp")));
r.use("/ozone/listings/:listingId", reactRouter(() => import("@twii/ozone/lib/listing/component/ListingApp")));
r.use("/ozone/listings/:listingId/launch", reactRouter(() => import("@twii/ozone/lib/listing/component/ListingLaunch")));
r.use("/ozone/listings/:listingId/edit", reactRouter(() => import("@twii/ozone/lib/listing/component/ListingEditApp")));

export { r as OzoneRouter, r as default }
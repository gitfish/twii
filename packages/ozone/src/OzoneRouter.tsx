import * as React from "react";
import { Router } from "@twii/router/lib/Router";
import { requiresUserProfile } from "./user/UserAuthRouters";
import { componentRouter } from "@twii/common-ui/lib/componentRouter";

const r = new Router();
r.use(requiresUserProfile);
r.use("/ozone/bookmarks", componentRouter(() => import("./listing/component/ListingBookmarksApp")));
r.use("/ozone/listings", componentRouter(() => import("./listing/component/ListingListApp")));
r.use("/ozone/store", componentRouter(() => import("./listing/component/ListingStoreFrontApp")));
r.use("/ozone/listings/add", componentRouter(() => import("./listing/component/ListingAddApp")));
r.use("/ozone/listings/:listingId", componentRouter(() => import("./listing/component/ListingApp")));
r.use("/ozone/listings/:listingId/launch", componentRouter(() => import("./listing/component/ListingLaunch")));
r.use("/ozone/listings/:listingId/edit", componentRouter(() => import("./listing/component/ListingEditApp")));

export { r as OzoneRouter }
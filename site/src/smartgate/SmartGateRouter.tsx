import * as React from "react";
import Router from "roota/lib/Router";
import { exactPath } from "common/RouterUtils";
const SmartGateRouter = new Router();

SmartGateRouter.use("/search/result", exactPath((req) => {
    return import("./component/SmartGateSearchResultApp").then(m => {
        return <m.SmartGateSearchResultApp host={req.app} />;
    });
}));

SmartGateRouter.use("/search", exactPath((req) => {
    return import("./component/SmartGateSearchApp").then(m => {
        return <m.SmartGateSearchApp host={req.app} />;
    });
}));

export { SmartGateRouter }
import * as React from "react";
import { Router } from "@pu/router/lib/Router";
import { exactPath } from "@pu/router/lib/Routers";
import { createSampleRouter } from "@pu/sample-base/lib/sampleRouter";

const r = new Router();
const sampleRouter = createSampleRouter();
r.use(sampleRouter);

r.use((req, next) => {
    if(req.path === "/" || req.path === "/index" || req.path === "/home") {
        return import("@pu/sample-base/lib/component/Home").then(m => {
            return (
                <m.Home host={req.app} />
            );
        });
    }
    return next();
});

r.defaultHandler = (req) => {
    return <div>We haven't got anything useful at {req.path}</div>;
};

export { r as AppRouter }

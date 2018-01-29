import * as React from "react";
import Router from "roota/lib/Router";
const r = new Router();

r.use("/default", (req, next) => {
    if(req.basePath === req.path) {
        return import("./component/DefaultHelp").then(m => {
            return <m.DefaultHelpMenuItem />;
        });
    }
    return next();
});

export { r as default, r as HelpRouter }
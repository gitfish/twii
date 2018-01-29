import * as React from "react";
import Router from "roota/lib/Router";

const r = new Router();

r.use("/menuitem", req => {
    return import("./component/UserProfileMenuItem").then(m => {
        return <m.UserProfileMenuItem />;
    });
});
r.use("/", (req, next) => {
    if(req.basePath === req.path) {
        return import("./component/UserProfileApplet").then(m => {
            return <m.UserProfileApplet host={req.app} />;
        });
    }
    return next();
});

export { r as default, r as UserRouter }
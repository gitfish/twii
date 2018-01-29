import * as React from "react";
import Router from "roota/lib/Router";
const r = new Router();

r.use("/menuitem", req => {
    return import("./component/GlobalNavMenuItem").then(m => {
        return <m.GlobalNavMenuItem />;
    });
});
r.use("/", req => {
    return import("./component/GlobalNavApplet").then(m => {
        return <m.GlobalNavApplet host={req.app} />;
    });
});

export { r as default, r as NavRouter }
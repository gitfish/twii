import * as React from "react";
import { Router } from "roota/lib/Router";
import { exactPath } from "roota/lib/Utils";
import { AppWrapper } from "@twii/ui-core/lib/app/component/AppWrapper";

const AppRouter = new Router();
AppRouter.use("/user/profile/menuItem", exactPath(req => {
    return import("user/component/UserProfile").then(m => {
        return <m.UserProfileMenuItemWithCallout />;
    });
}));

AppRouter.use("/error/sample", exactPath(req => {
    return Promise.reject({ message: "Sample Error" });
}));

AppRouter.use("/samples/form", exactPath(req => {
    return import("samples/Form").then(m => {
        return <m.FormExamplesApplet />;
    });
}));

AppRouter.use((req, next) => {
    if(req.path === "/" || req.path === "/index" || req.path === "/home") {
        return import("samples/Home").then(m => {
            return <m.HomeApplet host={req.app} />;
        });
    }
    return next();
});

AppRouter.defaultHandler = (req) => {
    return import("./DefaultApplet").then(m => {
        return <m.DefaultApplet host={req.app} />;
    })
};

export { AppRouter as default, AppRouter }

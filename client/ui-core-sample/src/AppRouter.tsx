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
        return <m.FormExamplesApp host={req.app} />;
    });
}));

AppRouter.use("/samples/package", exactPath(req => {
    return import("samples/Package").then(m => {
        return <m.PackageApp host={req.app} />
    });
}));

AppRouter.use((req, next) => {
    if(req.path === "/" || req.path === "/index" || req.path === "/home") {
        return import("samples/Home").then(m => {
            return <m.HomeApp host={req.app} />;
        });
    }
    return next();
});

AppRouter.defaultHandler = (req) => {
    return import("./DefaultApp").then(m => {
        return <m.DefaultApp host={req.app} />;
    })
};

export { AppRouter }

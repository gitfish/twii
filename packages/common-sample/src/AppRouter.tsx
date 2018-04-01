import * as React from "react";
import { Router } from "roota/lib/Router";
import { exactPath } from "roota/lib/Routers";

const AppRouter = new Router();

AppRouter.use("/samples/error", exactPath(req => {
    return Promise.reject({ message: "Sample Error" });
}));

AppRouter.use("/samples/form", exactPath(req => {
    return import("@twii/sample-base/lib/component/Form").then(m => {
        return (
            <m.FormSamplesApp host={req.app} />
        );
    });
}));

AppRouter.use("/samples/picker", exactPath(req => {
    return import("@twii/sample-base/lib/component/Picker").then(m => {
        return (
            <m.PickerSamplesApp host={req.app} />
        );
    });
}));

AppRouter.use("/samples/personform", exactPath(req => {
    return import("@twii/sample-base/lib/component/PersonForm").then(m => {
        return (
            <m.PersonFormSamplesApp host={req.app} />
        );
    });
}));

AppRouter.use("/samples/sticky", exactPath(req => {
    return import("@twii/sample-base/lib/component/Sticky").then(m => {
        return (
            <m.StickySampleApp host={req.app} />
        );
    });
}));

AppRouter.use((req, next) => {
    if(req.path === "/" || req.path === "/index" || req.path === "/home" || req.path === "/samples/home") {
        return import("@twii/sample-base/lib/component/Home").then(m => {
            return (
                <m.Home host={req.app} />
            );
        });
    }
    return next();
});

AppRouter.defaultHandler = (req) => {
    return <div>We haven't got anything useful at {req.path}</div>;
};

export { AppRouter as default, AppRouter }

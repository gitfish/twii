import * as React from "react";
import { Router } from "roota/lib/Router";
import { exactPath } from "roota/lib/Routers";
import { SampleNavigationView } from "./component/SampleNavigationView";

const AppRouter = new Router();

AppRouter.use("/samples/error", exactPath(req => {
    return Promise.reject({ message: "Sample Error" });
}));

AppRouter.use("/samples/form", exactPath(req => {
    return import("@twii/sample-base/lib/component/Form").then(m => {
        return (
            <SampleNavigationView host={req.app}>
                <m.FormSamples />
            </SampleNavigationView>
        );
    });
}));

AppRouter.use("/samples/picker", exactPath(req => {
    return import("@twii/sample-base/lib/component/Picker").then(m => {
        return (
            <SampleNavigationView host={req.app}>
                <m.PickerSamples />
            </SampleNavigationView>
        );
    });
}));

AppRouter.use("/samples/personform", exactPath(req => {
    return import("@twii/sample-base/lib/component/PersonForm").then(m => {
        return (
            <SampleNavigationView host={req.app}>
                <m.PersonFormSamples />
            </SampleNavigationView>
        );
    });
}));

AppRouter.use((req, next) => {
    if(req.path === "/" || req.path === "/index" || req.path === "/home") {
        return import("samples/component/Home").then(m => {
            return (
                <SampleNavigationView host={req.app}>
                    <m.Home host={req.app} />
                </SampleNavigationView>
            );
        });
    }
    return next();
});

AppRouter.defaultHandler = (req) => {
    return <div>We haven't got anything useful at {req.path}</div>;
};

export { AppRouter as default, AppRouter }

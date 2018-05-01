import * as React from "react";
import { Router } from "@twii/router/lib/Router";
import { exactPath } from "@twii/router/lib/Routers";
import { sampleAppHandler } from "./component/SampleHostAppView";
import { samples } from "./samples";
import { ISample } from "./ISample";
import { IRouterManager } from "../../router/lib/IRouterManager";

const registerSample = (sample : ISample, router : IRouterManager) => {
    if(sample.path) {
        router.use(sample.path, exactPath(sampleAppHandler(sample)));
    }

    if(sample.items) {
        sample.items.forEach(item => {
            registerSample(item, router);
        });
    }  
};

const createSampleRouter = () : Router => {
    const r = new Router();
    r.use("/samples/home", req => {
        return import("./component/Home").then(m => {
            return <m.Home host={req.app} />;
        });
    });

    samples.forEach(sample => {
        registerSample(sample, r);
    });
    
    return r;
};


export { createSampleRouter }
import * as React from "react";
import { IRequestHandler } from "@twii/router/lib/IRequestHandler";
import { exactPath } from "@twii/router/lib/Routers";
import { IRequest } from "@twii/router/lib/IRequest";

interface IComponentRouterOptions {
    exact?: boolean;
    allowTrailingSlash?: boolean;
}

const DefaultComponentRouterOptions = {
    exact: true,
    allowTrailingSlash: false
};

const componentRouter = (importer: () => Promise<any>, exportKey?: string, opts: IComponentRouterOptions = DefaultComponentRouterOptions) => {
    const handler = (request : IRequest) => {
        return importer().then(m => {
            const type = exportKey ? m[exportKey] : m.default;
            if(!type) {
                throw { code: "ILLEGAL_ARGUMENT", message: "Unable to resolve Component Type"};
            }
            return React.createElement(type, request);
        });
    };
    return opts.exact ? exactPath(handler, opts) : handler;
};

export { IComponentRouterOptions, DefaultComponentRouterOptions, componentRouter, componentRouter as default }
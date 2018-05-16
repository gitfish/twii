import * as React from "react";
import { IRequestHandler } from "@twii/router/lib/IRequestHandler";
import { exactPath } from "@twii/router/lib/Routers";
import { IRequest } from "@twii/router/lib/IRequest";

interface IReactRouterOptions {
    exportKey?: string;
    exact?: boolean;
    allowTrailingSlash?: boolean;
    requestPropKey?: string;
}

const DefaultReactRouterOptions = {
    exact: true,
    allowTrailingSlash: false,
    requestPropKey: "match"
};

const reactRouter = (importer: () => Promise<any>, opts: IReactRouterOptions = DefaultReactRouterOptions) => {
    const handler = (request : IRequest) => {
        return importer().then(m => {
            const type = opts.exportKey ? m[opts.exportKey] : m.default;
            if(!type) {
                throw { code: "ILLEGAL_ARGUMENT", message: "Unable to resolve React Component Type"};
            }
            const props = {};
            props[opts.requestPropKey] = opts.requestPropKey;
            return React.createElement(type, props);
        });
    };
    return opts.exact ? exactPath(handler, opts) : handler;
};

export {
    IReactRouterOptions,
    DefaultReactRouterOptions,
    reactRouter,
    reactRouter as default
}
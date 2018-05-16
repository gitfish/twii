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

const reactRouter = (importer: () => Promise<any> | any, opts?: IReactRouterOptions) => {
    const mergedOpts = Object.assign({}, DefaultReactRouterOptions, opts);
    const handler = (request : IRequest) => {
        return Promise.resolve(importer()).then(m => {
            const type = mergedOpts.exportKey ? m[mergedOpts.exportKey] : m.default;
            if(!type) {
                throw { code: "ILLEGAL_ARGUMENT", message: "Unable to resolve React Component Type"};
            }
            const props = {};
            props[mergedOpts.requestPropKey] = request;
            return React.createElement(type, props);
        });
    };
    return mergedOpts.exact ? exactPath(handler, mergedOpts) : handler;
};

export {
    IReactRouterOptions,
    DefaultReactRouterOptions,
    reactRouter,
    reactRouter as default
}
import { IRequestHandler } from "./IRequestHandler";

interface IExactPathOptions {
    allowTrailingSlash?: boolean;
}

const exactPath = (handler : IRequestHandler, opts?: IExactPathOptions) : IRequestHandler => {
    return (req, next) => {
        if(req.basePath === req.path || (opts && opts.allowTrailingSlash && req.path === `${req.basePath}/`)) {
            return handler(req, next);
        }
        next();
    };
};


const injectParametersInterceptor = (params : any, handler?: IRequestHandler) : IRequestHandler => {
    return (req, next) => {
        const nextReq = Object.assign({}, req);
        nextReq.params = Object.assign({}, nextReq.params, params);
        if(handler) {
            return handler(nextReq, next);
        }
        return next(nextReq);
    };
};

const injectQueryInterceptor = (query : any, handler?: IRequestHandler) : IRequestHandler => {
    return (req, next) => {
        const nextReq = Object.assign({}, req);
        nextReq.query = Object.assign({}, nextReq.query, query);
        if(handler) {
            return handler(nextReq, next);
        }
        return next(nextReq);
    };
};

export {
    IExactPathOptions,
    exactPath,
    injectParametersInterceptor,
    injectQueryInterceptor
}
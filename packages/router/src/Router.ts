
import { IRequest } from "./IRequest";
import { IRouter } from "./IRouter";
import { IRequestHandler } from "./IRequestHandler";
import { IRouterManager } from "./IRouterManager";
import { PathTemplate } from "./PathTemplate";
import * as isFunction from "lodash.isfunction";
import * as isString from "lodash.isstring";

interface IRouterEntry {
    r: IRouter;
    next?: IRouterEntry;
}

const notFoundHandler : IRequestHandler = (req : IRequest) => {
    return Promise.reject({ code: "NOT_FOUND", request: req, message: `Unable to find handler for ${req.path}`});
};

const uselessRouter : IRouter = {
    handleRequest(req : IRequest, next?: IRequestHandler) {
        return Promise.resolve(next ? next(req) : notFoundHandler(req));
    }
};

class RequestHandlerRouter implements IRouter {
    private _requestHandler : IRequestHandler;
    constructor(requestHandler : IRequestHandler) {
        this._requestHandler = requestHandler;
    }
    handleRequest(req : IRequest, next?: IRequestHandler) {
        return Promise.resolve(this._requestHandler(req, next));
    }
}

const createRouter = (router : IRouter | IRequestHandler) : IRouter  => {
    if(isFunction(router)) {
        return new RequestHandlerRouter(router as IRequestHandler);
    }
    return router ? router as IRouter : uselessRouter;
};

class PathRouter implements IRouter {
    private _pathTemplate : PathTemplate;
    private _router : IRouter;
    constructor(path : string, router : IRouter | IRequestHandler) {
        this._pathTemplate = new PathTemplate(path, { end: false });
        this._router = createRouter(router);
    }
    handleRequest(req : IRequest, next?: IRequestHandler) {
        const testPath = req.basePath ? req.path.substring(req.basePath.length) : req.path;
        const testResult = this._pathTemplate.test(testPath);
        if(testResult.match) {
            const handlerReq = Object.assign({}, req);
            handlerReq.params = Object.assign({}, req.params, testResult.params);
            const matchedPath = this._pathTemplate.toPath(handlerReq.params);
            handlerReq.basePath = req.basePath ? req.basePath + matchedPath : matchedPath;
            return this._router.handleRequest(handlerReq, next);
        }
        return Promise.resolve(next ? next(req) : notFoundHandler(req));
    }
}

class Router implements IRouter, IRouterManager {
    private _root : IRouterEntry;
    private _last : IRouterEntry;
    defaultHandler : IRequestHandler;
    use(pathOrRouter: string | IRouter | IRequestHandler, router?: IRouter | IRequestHandler) : void {
        let r : IRouter;
        if(isString(pathOrRouter)) {
            r = new PathRouter(pathOrRouter as string, router);
        } else {
            r = createRouter(pathOrRouter as IRouter | IRequestHandler);
        }
        const e = { r: r };
        if(!this._root) {
            this._root = e;
        } else {
            this._last.next = e;
        }
        this._last = e;
    }
    private _processEntry(req : IRequest, e : IRouterEntry, fallThrough : IRequestHandler) : Promise<any> {
        if(e) {
            const next = (nr : IRequest) => {
                return e.next ? this._processEntry(nr || req, e.next, fallThrough) : fallThrough(req);
            };
            return e.r.handleRequest(req, next);
        }
        return fallThrough(req);
    }
    handleRequest(req : IRequest, next: IRequestHandler = notFoundHandler) : Promise<any> {
        const fallThrough = (req) => {
            return this.defaultHandler ? this.defaultHandler(req, next) : next(req);
        };
        return this._processEntry(req, this._root, fallThrough);
    }
}

export { Router }
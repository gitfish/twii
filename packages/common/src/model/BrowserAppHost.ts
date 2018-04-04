import { AbstractAppHost } from "./AbstractAppHost";
import { action } from "mobx";
import { IAppHost } from "../IAppHost";
import { IRequest } from "@twii/router/lib/IRequest";
import { IRouter } from "@twii/router/lib/IRouter";
import { computed } from "mobx";
import * as PathUtils from "../PathUtils";
import * as qs from "qs";
import { stripRight } from "../StringUtils";

interface IWindowAppHostResolver {
    (window : Window, sourceHost?: IAppHost) : Promise<IAppHost> | IAppHost;
}

const globalWindowAppHostResolver = (globalKey : string, pollInterval : number = 120, maxWait = 20000) : IWindowAppHostResolver => {
    return (window : Window, sourceHost : IAppHost) => {
        return new Promise((resolve, reject) => {
            let interval;
            const startTs = new Date().getTime();
            interval = setInterval(() => {
                if(window[globalKey]) {
                    resolve(window[globalKey] as IAppHost);
                    clearInterval(interval);
                }
                const currentTs = new Date().getTime();
                if(currentTs - startTs > maxWait) {
                    clearInterval(interval);
                    reject("Unable to get new app host instance");
                }
            }, pollInterval > 0 ? pollInterval : 120);
        });
    }
};

class BrowserAppHost extends AbstractAppHost {
    window : Window;
    private windowAppHostResolver?: IWindowAppHostResolver;
    basePath : string;
    private _extension : string;

    get root() {
        return true;
    }

    get extension() {
        return this._extension;
    }

    getUrl(request : IRequest) : string {
        let url = PathUtils.join(PathUtils.sep, this.basePath, request && request.path ? request.path : this.path);
        if(this._extension) {
            url += this._extension;
        }
    
        let queryString;
        if(request && request.query) {
            queryString = qs.stringify(request.query);
        }
    
        if(queryString) {
            url += "?" + queryString;
        }
        
        return url;
    }

    @action
    setInitialized(initialized : boolean) {
        this._initialized = initialized;
        if(!initialized) {
            this.setRequest(undefined);
            this.window.removeEventListener("popstate", this._handlePopState);
        }
    }

    get locationPath() {
        let path = this.window.location.pathname;
        if(this.basePath) {
            const basePath = stripRight(this.basePath, PathUtils.sep);
            var basePathIdx = path.indexOf(basePath);
            if(basePathIdx >= 0) {
                path = path.substring(basePathIdx + basePath.length);
            }
        }
        const extension = PathUtils.extname(path);
        if(extension) {
            path = path.substring(0, path.length - extension.length);
        }
        return path;
    }
    get locationQuery() {
        const search = this.window.location.search;
        return search && search.length > 1 ? qs.parse(search.substring(1)) : {}
    }

    get locationRequest() {
        return { path: this.locationPath, query: this.locationQuery };
    }

    @action
    protected _handlePopState = (e : PopStateEvent) => {
        if(e.state && e.state.id === this.id) {
            this._req = undefined;
            this._loadImpl();
        }
    }

    protected _pushHistory(url : string) {
        this.window.history.pushState({ id: this.id }, null, url);
    }

    protected _init(request?: IRequest) : Promise<any> {
        this._extension = PathUtils.extname(this.window.location.pathname);
        if(request) {
            this.setRequest(request);
        }
        this.window.addEventListener("popstate", this._handlePopState);
        this.window.history.replaceState({ id: this.id }, null, this.url);
        return this._loadImpl();
    }

    open(request: IRequest) : Promise<IAppHost> {
        if(!this.windowAppHostResolver) {
            Promise.reject({ code: "INVALID_STATE", message: "No Window App Host Resolver configured"});
        }
        const url = this.getUrl(request);
        const w = this.window.open(url, request ? request.windowName || request.path : "", request ? request.windowFeatures : undefined);
        return Promise.resolve(this.windowAppHostResolver(w, this));
    }

    close() {
        this.window.close();
    }

    addEventListener(type, handler) : void {
        this.window.addEventListener(type, handler);
    }
    removeEventListener(type, handler) : void {
        this.window.removeEventListener(type, handler);
    }
    emit(event) {
        this.window.dispatchEvent(event as Event);
    }

    @computed
    get defaultRequest() : IRequest {
        return this.locationRequest;
    }
}

export {
    IWindowAppHostResolver,
    globalWindowAppHostResolver,
    BrowserAppHost
}
import { observable, action, computed } from "mobx";
import SyncModel from "common/SyncModel";
import { toPromise as syncToPromise } from "common/SyncUtils";
import IRouter from "roota/lib/IRouter";
import IRequest from "roota/lib/IRequest";
import IAppHost from "./IAppHost";
import * as PathUtils from "util/Path";
import * as qs from "qs";
import * as IdUtils from "util/Id";
import { stripRight } from "util/String";
import AppRouter from "./AppRouter";
import { WindowAppHostKey } from "./AppConstants";
import { Sequence } from "util/Id";

const nextHostId = () => {
    return IdUtils.next("window-app-host-");
};

class WindowAppHost implements IAppHost {
    private _id : string;
    private _newWindowIdSequence = new Sequence();
    private _root : boolean = false;
    private _extension? : string;

    window : Window;
    basePath : string;
    private _router : IRouter;
    
    @observable private _req : IRequest;
    @observable sync = new SyncModel();
    @observable.ref view : any;
    @observable private _state : any = {};
    @observable _initialized : boolean = false;

    get id() {
        if(!this._id) {
            this._id = nextHostId();
        }
        return this._id;
    }
    set id(id : string) {
        this._id = id;
    }

    get root() {
        return this._root;
    }
    set root(value) {
        this._root = value;
    }

    set router(value : IRouter) {
        this._router = value;
    }
    get router() {
        return this._router || AppRouter;
    }

    get title() {
        return this.window.document.title;
    }
    set title(value : string) {
        this.setTitle(value);
    }
    setTitle(title : string) {
        this.window.document.title = title;
    }

    @computed
    get state() {
        return this._state;
    }
    set state(value : any) {
        this.setState(value);
    }

    @action
    setState(state : any) {
        this._state = Object.assign({}, this._state, state);
    }

    get extension() {
        return this._extension;
    }

    @computed
    get initialized() {
        return this._initialized;
    }
    set initialized(value) {
        this.setInitialized(value);
    }
    
    @action
    setInitialized(initialized : boolean) {
        this._initialized = initialized;
        if(!initialized) {
            this.setRequest(undefined);
            this.window.removeEventListener("popstate", this._handlePopState);
        }
    }

    get url() {
        return this.getUrl(this.request);
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
    setView(view : any) : void {
        this.view = view;
    }

    @action
    protected _loadDone = (value : any) => {
        this.view = value;
        this.sync.syncEnd();
    }

    @action
    protected _loadError = (error : any) => {
        console.log("Application Context Load Error");
        console.warn(error);
        this.sync.syncError(error);
    }

    @action
    protected _loadImpl() : Promise<any> {
        this.sync.syncStart();
        if(this.router) {
            const req : IRequest = Object.assign(this.request, { app: this });
            // NOTE: merging query into params
            req.params = Object.assign({}, req.query, req.params);
            return this.router.handleRequest(req).then(this._loadDone).catch(this._loadError);
        } else {
            this._loadError({ code: "ILLEGAL_STATE", message: "No Router configured" });
        }
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

    protected _replaceHistory(url : string) {
        this.window.history.replaceState({ id: this.id}, null, url);
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

    @action
    load(request?: IRequest) : Promise<any> {
        if(!request && this.sync.syncing) {
            return syncToPromise(this.sync);
        }

        if(request && request.title) {
            this.setTitle(request.title);
        }
        if(!this._initialized) {
            this._initialized = true;
            return this._init(request);
        }

        const currentUrl = this.url;
        if(request) {
            this.setRequest(request);
        }
        const url = this.getUrl(this.request);

        if(url !== currentUrl) {
            if(request && request.replace) {
                this._replaceHistory(url);
            } else {
                this._pushHistory(url);
            }
            return this._loadImpl();
        }
        return Promise.resolve(this.view);
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

    @computed
    get request() : IRequest {
        return this._req || this.locationRequest;
    } 
    set request(value) {
        this.setRequest(value);
    }
    @action
    setRequest(request : IRequest) {
        this._req = request;
    }

    @computed
    get path() {
        const r = this.request;
        return r ? r.path : undefined;
    }

    @computed
    get params() {
        const r = this.request;
        return Object.assign({}, r ? r.query : undefined, r ? r.params : undefined);
    }

    private _reloadHost = (host : WindowAppHost, request : IRequest) => {
        host.setRequest(undefined);
        host.sync.clear();
        if(!host.id) {
            host.id = nextHostId();
        }
        host.setInitialized(false);
        host.load(request);
    }

    open(request: IRequest) : Promise<IAppHost> {
        const url = this.getUrl(request);
        const w = window.open(url, request ? request.windowName || request.path : "", request ? request.windowFeatures : undefined);
        // TODO: kick off a timeout poll to detect the host on the window
        return new Promise((resolve, reject) => {
            let interval;
            const startTs = new Date().getTime();
            interval = setInterval(() => {
                if(w[WindowAppHostKey]) {
                    resolve(w[WindowAppHostKey]);
                    clearInterval(interval);
                }
                const currentTs = new Date().getTime();
                if(currentTs - startTs > 20000) {
                    clearInterval(interval);
                    reject("Unable to get new host instance");
                }
            }, 120);
        });
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

    toJSON() {
        return Object.assign({}, this._req, { id: this.id });
    }
}

export { WindowAppHost as default, WindowAppHost }
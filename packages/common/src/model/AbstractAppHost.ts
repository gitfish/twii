import { observable, action, computed } from "mobx";
import { Sync } from "./Sync";
import { toPromise as syncToPromise } from "../SyncUtils";
import { IRouter } from "@twii/router/lib/IRouter";
import { IRequest } from "@twii/router/lib/IRequest";
import { IAppHost } from "../IAppHost";
import * as PathUtils from "../PathUtils";
import * as qs from "qs";
import * as Id from "../Id";
import { stripRight } from "../StringUtils";
import { IEventEmitter } from "../IEventEmitter";
import { StateManager } from "./StateManager";

const IdPrefix = "app-host-";

const nextId = () => {
    return Id.next(IdPrefix);
};

abstract class AbstractAppHost extends StateManager implements IAppHost {
    private _id : string;
    private _router : IRouter;
    
    @observable private _title : string;
    @observable sync = new Sync();
    @observable.ref view : any;
    @observable protected _root : boolean = false;
    @observable private _request : IRequest;
    @observable protected _initialized : boolean = false;

    get id() {
        if(!this._id) {
            this._id = nextId();
        }
        return this._id;
    }
    set id(value) {
        this.setId(value);
    }
    setId(id : string) {
        this._id = id;
    }
 
    @computed
    get root() {
        return this._root;
    }
    set root(value) {
        this.setRoot(value);
    }
    @action
    setRoot(root : boolean) {
        this._root = root;
    }

    get router() {
        return this._router;
    }
    set router(router : IRouter) {
        this.setRouter(router);
    }

    @action
    setRouter(router : IRouter) {
        if(router !== this._router) {
            this._router = router;
            if(this._initialized) {
                this._loadImpl();
            }
        }
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
    }

    @computed
    get title() {
        return this._title;
    }
    set title(value : string) {
        this.setTitle(value);
    }

    @action
    setTitle(title : string) {
        this._title = title;
    }

    get url() {
        return this.getUrl(this.request);
    }

    getUrl(request : IRequest) : string {
        const initPath = request && request.path ? request.path : this.path;
        let url = initPath ? PathUtils.join(PathUtils.sep, initPath) : "";
        
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
        console.log("App Host Load Error");
        console.warn(error);
        this.sync.syncError(error);
    }

    @action
    protected _loadImpl() : Promise<any> {
        this.sync.syncStart();
        if(this.router) {
            const req : IRequest = Object.assign({}, this.request, { app: this, host: this });
            // NOTE: merging query into params
            req.params = Object.assign({}, req.query, req.params);
            return Promise.resolve(this.router.handleRequest(req)).then(this._loadDone).catch(this._loadError);
        } else {
            this._loadError({ code: "ILLEGAL_STATE", message: "No Router configured" });
        }
    }

    protected _init(request?: IRequest) : Promise<any> {
        this.setRequest(request || this.defaultRequest);
        return this._loadImpl();
    }

    protected _pushHistory(url : string) {
        // does nothing by default
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
        this.setRequest(request || this.defaultRequest);
        const url = this.getUrl(this.request);

        if(url !== currentUrl) {
            this._pushHistory(url);
            return this._loadImpl();
        }
        return Promise.resolve(this.view);
    }

    abstract open(request: IRequest);

    protected get defaultRequest() : IRequest {
        return {};
    }

    @computed
    get request() : IRequest {
        return Object.assign({}, this._request);
    }
    set request(value) {
        this.setRequest(value);
    }

    @action
    protected setRequest(request : IRequest) {
        this._request = request;
    }

    @action
    clearRequest() {
        this._request = undefined;
    }

    get path() {
        const r = this.request;
        return r ? r.path : undefined;
    }

    get params() {
        const r = this.request;
        return Object.assign({}, r ? r.query : undefined, r ? r.params : undefined);
    }

    abstract close();

    abstract addEventListener(type, handler) : void;
    abstract removeEventListener(type, handler) : void;
    abstract emit(event) : void;

    toJSON() {
        return { id: this.id };
    }
}

export { AbstractAppHost, nextId }
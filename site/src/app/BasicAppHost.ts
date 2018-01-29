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
import EventEmitter from "util/EventEmitter";
import AppRouter from "./AppRouter";

class BasicAppHost extends EventEmitter implements IAppHost {
    private _id = IdUtils.next("basic-app-host-");
    private _router : IRouter;
    
    @observable private _title : string;
    @observable private _req : IRequest;
    @observable sync = new SyncModel();
    @observable.ref view : any;
    @observable private _state : any = {};
    @observable _initialized : boolean = false;
    @observable _root : boolean = false;

    get id() {
        return this._id;
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
    
    set router(value : IRouter) {
        this._router = value;
    }
    get router() {
        return this._router || AppRouter;
    }

    @computed
    get initialized() {
        return this._initialized;
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

    get url() {
        return this.getUrl(this.request);
    }

    getUrl(request : IRequest) : string {
        let url = PathUtils.join(PathUtils.sep, request && request.path ? request.path : this.path);
        
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
            const req : IRequest = Object.assign({}, this.request, { app: this });
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
            if(request) {
                this.setRequest(request);
            }
            return this._loadImpl();
        }

        const currentUrl = this.url;
        if(request) {
            this.setRequest(request);
        }
        const url = this.getUrl(this.request);

        if(url !== currentUrl) {
            return this._loadImpl();
        }
        return Promise.resolve(this.view);
    }

    @computed
    get request() : IRequest {
        return this._req || {};
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

    open(request: IRequest) {
        const url = this.getUrl(request);
        const newHost = new BasicAppHost();
        newHost.router = this.router;
        return Promise.resolve(newHost);
    }

    close() {
        // does nothing
    }

    toJSON() {
        return Object.assign({}, this._req, { id: this.id });
    }
}

export { BasicAppHost as default, BasicAppHost }
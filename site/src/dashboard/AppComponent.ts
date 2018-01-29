import { observable, computed, action, autorun } from "mobx";
import SyncModel from "common/SyncModel";
import { toPromise as syncToPromise } from "common/SyncUtils";
import IComponent from "./IComponent";
import Component from "./Component";
import AppRouter from "app/AppRouter";
import IRouter from "roota/lib/IRouter";
import IRequest from "roota/lib/IRequest";
import IAppComponent from "./IAppComponent";
import * as qs from "qs";

class AppComponent extends Component implements IAppComponent {
    private _router : IRouter;
    @observable protected _saveLocation = false;
    @observable sync = new SyncModel();
    @observable.ref view : any;
    @observable protected _state : any = {};
    @observable protected _title : string;
    @observable protected _path : string;
    @observable protected _initPath : string;
    @observable protected _params : any;
    @observable protected _query : any;
    @observable protected _initParams : any;
    @observable protected _initQuery : any;
    @observable _initialized : boolean = false;

    protected _createElement() {
        const e = document.createElement("div");
        e.classList.add("app-component");
        return e;
    }

    get root() {
        return false;
    }

    get router() {
        return this._router || AppRouter;
    }
    set router(router : IRouter) {
        this._router = router;
    }

    @computed
    get initialized() {
        return this._initialized;
    }

    @computed
    get saveLocation() {
        return this._saveLocation;
    }
    set saveLocation(value) {
        this.setSaveLocation(value);
    }

    @action
    setSaveLocation(saveLocation : boolean) {
        this._saveLocation = saveLocation;
    }

    @computed
    get path() {
        return this._path;
    }
    set path(value : string) {
        this.setPath(value);
    }
    @action
    setPath(value : string) {
        if(!this._initPath) {
            this._initPath = value;
        }
        if(value !== this._path) {
            this._path = value;
        }
    }

    @computed
    get params() {
        return Object.assign({}, this._query, this._params);
    }
    set params(value) {
        this.setParams(value);
    }
    @action
    setParams(params : any) {
        if(!this._initParams) {
            this._initParams = params;
        }
        this._params = params;
    }

    @computed
    get query() {
        return Object.assign({}, this._query);
    }
    set query(value) {
        this.setQuery(value);
    }
    @action
    setQuery(query : any) {
        if(!this._initQuery) {
            this._initQuery = query;
        }
        this._query = query;
    }

    @computed
    get request() {
        return { path: this.path, params: this.params, query: this.query };
    }

    @action
    setRequest(request : IRequest) {
        if(request) {
            if(request.replace) {
                this._initPath = undefined;
                this._initParams = undefined;
                this._initQuery = undefined;
            }
            if(request.title) {
                this.setTitle(request.title);
            }
            if(request.path) {
                this.setPath(request.path);
            }
            this.setParams(request.params);
            this.setQuery(request.query);
        } else {
            this.setPath(undefined);
            this.setParams(undefined);
            this.setQuery(undefined);
        }
    }

    @computed
    get title() {
        return this._title;
    }
    set title(value) {
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

    @action
    protected _loadDone = (value : any) => {
        this.view = value;
        this.sync.syncEnd();
    }

    @action
    protected _loadError = (error : any) => {
        this.setTitle("Error");
        console.log("Application Context Load Error");
        console.warn(error);
        this.sync.syncError(error);
    }

    @action
    protected _loadImpl() : Promise<any> {
        if(!this.title) {
            this.setTitle("Loading...");
        }
        this.sync.syncStart();
        const req : IRequest = Object.assign({}, this.request, { app: this });
        // NOTE: merging query into params
        req.params = Object.assign({}, req.query, req.params);
        return this.router.handleRequest(req).then(this._loadDone).catch(this._loadError);
    }

    getUrl(request : IRequest) {
        let url = request && request.path ? request.path : this.path;
    
        let queryString;
        if(request && request.query) {
            queryString = qs.stringify(request.query);
        }
    
        if(queryString) {
            url += "?" + queryString;
        }
        
        return url;
    }

    get url() {
        return this.getUrl(this.request);
    }

    open(request : IRequest, opts?: any) {
        // to be implemented
        return null;
    }

    @action
    close() {
        this.emit({ type: "beforeclose" });
        this.unmount();
        this.removeFromParent();
        this.emit({ type: "close" });
    }

    @action
    load(request?: IRequest) {
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
        const url = this.url;
        if(url !== currentUrl) {
            return this._loadImpl();
        }
        return Promise.resolve(this.view);
    }

    @computed
    get config() {
        return {
            type: this.type,
            path: this.saveLocation ? this._path : this._initPath,
            params: this.saveLocation ? this._params : this._initParams,
            query: this.saveLocation ? this._query : this._initQuery
        };
    }

    @action
    setConfig(config) {
        this.setPath(config ? config.path : undefined);
        this.setParams(config ? config.params : undefined);
        this.setQuery(config ? config.query : undefined);
        return Promise.resolve();
    }

}

export { AppComponent as default, AppComponent }
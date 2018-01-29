import { observable, action, computed } from "mobx";
import SyncModel from "common/SyncModel";
import ISort from "common/ISortProps";
import ISearchService from "./ISearchService";
import ISearchRequest from "./ISearchRequest";
import ISearchResponse from "./ISearchResponse";
import ISearchCoreModel from "./ISearchCoreModel";
import SearchServiceContext from "./SearchServiceContext";

class SearchCoreModel implements ISearchCoreModel {
    private _service : ISearchService;
    @observable id: string;
    @observable name: string;
    @observable sync = new SyncModel();
    @observable request : ISearchRequest;
    @observable sortBy : string;
    @observable sortDescending : boolean = false;
    @observable offset : number = 0;
    @observable limit : number = 10;
    @observable total : number = 0;
    @observable items : any[] = [];

    get service() : ISearchService {
        return this._service || SearchServiceContext.value;
    }
    set service(value) {
        this._service = value;
    }

    @action
    setId(id : string) {
        this.id = id;
    }

    @action
    setName(name : string) {
        this.name = name;
    }

    @action
    private _refreshDone = (r : ISearchResponse) => {
        this.items = r.items || [];
        this.total = r.total;
        this.sync.syncEnd();
    }

    @action
    private _refreshError = (error : any) => {
        this.items = [];
        this.sync.syncError(error);
    }

    @action
    refresh() : Promise<any> {
        const reqCheck = this.request;
        const req = Object.assign({}, this.request);
        req.core = this.id;
        req.offset = this.offset;
        req.limit = this.limit;
        req.sortBy = this.sortBy;
        req.sortDescending = this.sortDescending;
        this.sync.syncStart();
        return this.service.search(req).then((r) => {
            if(reqCheck === this.request){
                this._refreshDone(r)
            }
        }).catch((error) => {
            if(reqCheck === this.request) {
                this._refreshError(error);
            }
        });
    }

    @action
    search(request : ISearchRequest) : Promise<any> {
        if(request !== this.request) {
            this.request = request;
            this.offset = 0;
            this.sortBy = undefined;
            this.sortDescending = false;
            return this.refresh();
        }
        return Promise.resolve();
    }

    @action
    setOffset(offset : number) {
        if(offset !== this.offset) {
            this.offset = offset;
            this.refresh();
        }
    }

    @action
    setLimit(limit : number) {
        if(limit !== this.limit) {
            this.limit = limit;
            this.offset = Math.floor(this.offset / this.limit) * this.limit;
            this.refresh();
        }
    }

    @action
    setSortBy(sortBy : string) {
        if(sortBy !== this.sortBy) {
            this.sortBy = sortBy;
            this.sortDescending = false;
        } else {
            this.sortDescending = !this.sortDescending;
            
        }
        this.refresh();
    }

    @action
    setSortDescending(sortDescending : boolean) {
        if(sortDescending !== this.sortDescending) {
            this.sortDescending = sortDescending;
            this.refresh();
        }
    }

    @computed
    get pageOffset() {
        return Math.floor(this.offset / this.limit);
    }

    set pageOffset(pageOffset : number) {
        if(pageOffset >= 0 || this.pageOffset < this.pageCount) {
            this.setOffset(pageOffset * this.limit);
        }
    }

    @computed
    get pageCount() {
        return Math.ceil(this.total / this.limit);
    }

    @computed
    get hasNext() {
        return this.offset + this.limit <= this.total;
    }

    @action
    next() {
        if(this.hasNext) {
            this.setOffset(this.offset + this.limit);
        }
    }

    @computed
    get hasPrev() {
        return this.offset > 0;
    }

    @action
    prev() {
        if(this.hasPrev) {
            this.setOffset(this.offset - this.limit);
        }
    }

    @computed
    get isFirst() {
        return this.offset === 0;
    }

    @action
    first() {
        this.setOffset(0);
    }

    @computed
    get isLast() {
        return this.pageOffset === this.pageCount - 1;
    }

    @action
    last() {
        this.setOffset((this.pageCount - 1) * this.limit);
    }
}

export { SearchCoreModel as default, SearchCoreModel }
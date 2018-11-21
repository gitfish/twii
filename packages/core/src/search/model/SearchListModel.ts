import { observable, action, computed } from "mobx";
import { ISearchResponse, ISearchResponseHighlighting, ISearchResponseFacetCounts } from "../ISearchResponse";
import { ISearchListModel } from "./ISearchListModel";
import { ISearchService } from "../service/ISearchService";
import { ISupplier } from "../../ISupplier";
import { ActivityListModel } from "../../model/ActivityListModel";
import { ISearchRequest } from "../ISearchRequest";
import { Sequence } from "../../Id";
import { PagingMode } from "../PagingMode";
import { Sync } from "../../model/Sync";

const Defaults = {
    offset: 0,
    limit: 50,
    pagingMode: PagingMode.offset,
    selectionEquality: (l, r) => {
        return l["DOC_ID"] === r["DOC_ID"];
    }
};

interface ICursorMark {
    id?: string;
    prev?: ICursorMark;
    next?: ICursorMark;
}

class SearchListModel<T = any> extends ActivityListModel<T> implements ISearchListModel<T> {
    serviceSupplier : ISupplier<ISearchService<T>>;
    private _service : ISearchService<T>;
    @observable appendSync = new Sync();
    @observable private _duration : number;
    @observable private _offset : number = Defaults.offset;
    @observable private _limit : number = Defaults.limit;
    @observable private _offsetLimit : number;
    @observable private _sortBy : string;
    @observable private _sortDescending : boolean;
    @observable private _highlighting : ISearchResponseHighlighting;
    @observable private _facetCounts : ISearchResponseFacetCounts;
    @observable.ref private _request : ISearchRequest;
    @observable private _searchId : string;
    @observable private _pagingMode : PagingMode;
    @observable private _appendPages : boolean = true;
    @observable.ref private _cursorMark : ICursorMark = { id: "*" };
    protected _searchSequence : Sequence = new Sequence();
    
    constructor() {
        super();
        this.selectionEquality = Defaults.selectionEquality
    }

    get service() {
        if(!this._service && this.serviceSupplier) {
            this._service = this.serviceSupplier.value;
        }
        return this._service;
    }
    set service(value) {
        this._service = value;
    }

    @computed
    get searchId() {
        return this._searchId;
    }

    @computed
    get isAppend() {
        return this._appendPages;
    }
    set isAppend(value) {
        this.setAppend(value);
    }
    @action
    setAppend(appendPages : boolean) {
        this._appendPages = appendPages;
    }

    @computed
    get pagingMode() {
        return this._pagingMode || Defaults.pagingMode;
    }
    set pagingMode(value) {
        this.setPagingMode(value);
    }
    @action
    setPagingMode(pagingMode : PagingMode) {
        this._pagingMode = pagingMode;
    }

    @computed
    get request() {
        return this._request ? Object.assign({}, this._request) : undefined;
    }

    @computed
    get duration() {
        return this._duration;
    }

    @computed
    get offsetLimit() {
        return this._offsetLimit;
    }
    set offsetLimit(value) {
        this.setOffsetLimit(value);
    }
    @action
    setOffsetLimit(rowLimit : number) : void {
        this._offsetLimit = rowLimit;
    }

    @computed
    get navLimit() {
        return this._offsetLimit > 0 && this._offsetLimit < this.total ? this._offsetLimit : this.total;
    }

    @computed
    get hasReachedOffsetLimit() : boolean {
        return this._offsetLimit > 0 ? this.offset + this.limit >= this._offsetLimit : false;
    }

    @computed
    get offset() {
        return this._offset !== undefined && this._offset >= 0 ? this._offset : Defaults.offset;
    }
    set offset(value) {
        this.setOffset(value);
    }

    @computed
    get limit() {
        return this._limit !== undefined && this._limit > 0 ? this._limit : Defaults.limit;
    }
    set limit(value) {
        this.setLimitInternal(value);
    }

    @computed
    get sortBy() {
        return this._sortBy;
    }
    set sortBy(value) {
        this.setSortBy(value);
    }

    @computed
    get isSortDescending() {
        return this._sortDescending;
    }
    set isSortDescending(value) {
        this._sortDescending = value;
    }

    @computed
    get highlighting() {
        return this._highlighting;
    }

    @computed
    get facetCounts() {
        return this._facetCounts;
    }

    protected _processResults(items : T[]) {
        // does nothing by default
    }

    @action
    protected _loadDone(r : ISearchResponse<T>) {
        this._duration = r ? r.duration : undefined;
        this._offset = r ? r.offset : undefined;
        this._highlighting = r ? r.highlighting : undefined;
        this._facetCounts = r ? r.facetCounts : undefined;
        this.setTotal(r ? r.total : 0);
        let items = r ? r.results : undefined;
        if(!items) {
            items = [];
        }
        this._processResults(items);
        if(this.isAppend) {
            this.addItems(items);
        } else {
            this.setItems(items);
        }
        if(this.isCursorPagingMode) {
            const nextCursor = { id: r.nextCursorId, prev: this._cursorMark };
            this._cursorMark.next = nextCursor;
        }
    }

    protected _loadImpl() {
        const meta = {
            offset: this.isOffsetPagingMode ? this.offset : undefined,
            limit: this.limit,
            cursorId: this.isCursorPagingMode ? this._cursorMark.id : undefined
        };
        return this.service.search(Object.assign({}, meta, this._request));
    }

    @action
    refresh() : Promise<void> {
        if(this._request) {
            const searchId = this._searchSequence.next();
            this._searchId = searchId;
            this.sync.syncStart();
            return this._loadImpl().then(r => {
                if(this._searchId === searchId) {
                    this._onLoadDone(r);
                }
            }).catch(err => {
                if(this._searchId === searchId) {
                    this._onLoadError(err);
                }
            });
        }
        return Promise.resolve();
    }

    @action
    clear() {
        super.clear();
        this._offset = 0;
        this._sortBy = undefined;
        this._sortDescending = false;
    }

    @action
    clearAndRefresh() : Promise<any> {
        this.clear();
        return this.refresh();
    }

    @action
    submit(request: ISearchRequest) : Promise<any> {
        this.clear();
        this._request = request;
        return this.refresh();
    }

    @action
    setOffset(start : number) : Promise<any> {
        if(start !== this._offset) {
            this._offset = start;
            return this.refresh();
        }
        return Promise.resolve();
    }

    @action
    setLimitImmediate(rows : number) {
        this._limit = rows;
        this._offset = Math.floor(this.offset / this.limit) * this.limit;
    }

    @action
    protected setLimitInternal(rows : number) {
        if(rows > 0 && rows !== this._limit) {
            this.setLimitImmediate(rows);
        }
    }

    @action
    setLimit(rows : number) : Promise<any> {
        if(rows > 0 && rows !== this._limit) {
            this.setLimitImmediate(rows);
            return this.refresh();
        }
        return Promise.resolve();
    }

    @action
    setSortBy(sortBy : string) : Promise<any> {
        if(sortBy !== this._sortBy) {
            this._sortBy = sortBy;
            this._sortDescending = false;
        } else {
            this.isSortDescending = !this.isSortDescending;
            
        }
        return this.refresh();
    }

    @action
    setSortDescending(sortDescending : boolean) : Promise<any> {
        if(sortDescending !== this._sortDescending) {
            this._sortDescending = sortDescending;
            this.refresh();
        }
        return this.refresh();
    }

    @computed
    get pageOffset() {
        return Math.floor(this.offset / this.limit);
    }
    set pageOffset(pageOffset : number) {
        this.setPageOffset(pageOffset);
    }
    @action
    setPageOffset(pageOffset : number) : Promise<any> {
        if(pageOffset >= 0 || this.pageOffset < this.pageCount) {
            return this.setOffset(pageOffset * this.limit);
        }
        return Promise.resolve();
    }

    @computed
    get isOffsetPagingMode() {
        return this.pagingMode === PagingMode.offset;
    }

    @computed
    get isCursorPagingMode() {
        return this.pagingMode === PagingMode.cursor;
    }

    @computed
    get pageCount() {
        return Math.ceil((this.isOffsetPagingMode ? this.navLimit : this.total) / this.limit);
    }

    @computed
    get hasNext() {
        if(this.isOffsetPagingMode) {
            return this.offset + this.limit < this.navLimit;
        }
        return this._cursorMark.next ? true : false;
    }

    @action
    next() : Promise<any> {
        if(this.hasNext) {
            if(this.isOffsetPagingMode) {
                return this.setOffset(this.offset + this.limit);
            }
            this._offset += this.limit;
            this._cursorMark = this._cursorMark.next;
            return this.refresh();
        }
        return Promise.resolve();
    }

    @computed
    get hasPrevious() {
        if(this.isOffsetPagingMode) {
            return this.offset > 0;
        }
        return this._cursorMark.prev ? true : false;
    }

    @action
    previous() : Promise<any> {
        if(this.hasPrevious) {
            if(this.isOffsetPagingMode) {
                return this.setOffset(this.offset - this.limit);
            }
            this._offset -= this.limit;
            this._cursorMark = this._cursorMark.prev;
            return this.refresh(); 
        }
        return Promise.resolve();
    }

    @computed
    get isFirst() {
        if(this.isOffsetPagingMode) {
            return this.offset === 0;
        }
        return this._cursorMark.id === "*";
    }

    @action
    first() : Promise<any> {
        if(this.isOffsetPagingMode) {
            return this.setOffset(0);
        }
        this._cursorMark = { id: "*" };
        this._offset = Defaults.offset;
        return this.refresh();
    }

    @computed
    get isLast() {
        if(this.isOffsetPagingMode) {
            return this.pageOffset === this.pageCount - 1;
        }
        return true;
    }

    @action
    last() : Promise<any> {
        return this.setOffset((this.pageCount - 1) * this.limit);
    }
}

export { SearchListModel, Defaults }
import { IStorageService } from "./IStorageService";

class BrowserStorageService implements IStorageService {
    private _storage : Storage;
    constructor(storage : Storage) {
        this._storage = storage;
    }
    getItem(key : string) : Promise<any> {
        try {
            const itemSpec = this._storage.getItem(key);
            let r;
            if(itemSpec) {
                r = JSON.parse(itemSpec);
            }
            return Promise.resolve(r);
        } catch(error) {
            return Promise.reject(error);
        }
    }
    setItem(key : string, item : any) : Promise<any> {
        try {
            this._storage.setItem(key, JSON.stringify(item));
            return Promise.resolve();
        } catch(error) {
            return Promise.reject(error);
        }
    }
    removeItem(key : string) : Promise<any> {
        try {
            this._storage.removeItem(key);
            return Promise.resolve();
        } catch(error) {
            return Promise.reject(error);
        }
    }
}

class LocalStorageService extends BrowserStorageService {
    constructor() {
        super(window.localStorage);
    }
}

class SessionStorageService extends BrowserStorageService {
    constructor() {
        super(window.sessionStorage);
    }
}

export { BrowserStorageService, LocalStorageService, SessionStorageService }
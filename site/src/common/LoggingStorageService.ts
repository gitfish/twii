import IStorageService from "./IStorageService";

class LoggingStorageService implements IStorageService {
    private _target : IStorageService;
    private _prefix : string;
    constructor(target : IStorageService, prefix : string) {
        this._target = target;
        this._prefix = prefix;
    }
    protected _info(message : any, ...optionalParams : any[]) {
        if(!AppConfig.production) {
            console.info(message, optionalParams);
        }
    }
    protected _warn(message : any, ...optionalParams : any[]) {
        if(!AppConfig.production) {
            console.warn(message, optionalParams);
        }
    }
    protected _error(message : any, ...optionalParams : any[]) {
        if(!AppConfig.production) {
            console.error(message, optionalParams);
        }
    }
    getItem(key : string) : Promise<any> {
        return this._target.getItem(key).then((item) => {
            this._info(`-- ${this._prefix}: Got Item for ${key}: ${JSON.stringify(item)}`);
            return item;
        }).catch((error) => {
            this._warn(`-- ${this._prefix}: Error getting item for key ${key}: ${error}`);  
        });
    }
    setItem(key: string, item : any) : Promise<any> {
        this._info(`-- ${this._prefix}: Setting Item for ${key}: ${JSON.stringify(item)}`);
        return this._target.setItem(key, item).catch((error) => {
            this._warn(`-- ${this._prefix}: Error setting item for key ${key}: ${error}`);
            return Promise.reject(error);
        });
    }
    removeItem(key : string) : Promise<any> {
        this._info(`-- ${this._prefix}: Removing Item for ${key}`);
        return this._target.removeItem(key).catch((error) => {
            this._warn(`-- ${this._prefix}: Error removing item for key ${key}: ${error}`);
            return Promise.reject(error);
        });
    }
}

export { LoggingStorageService as default, LoggingStorageService }
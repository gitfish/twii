import IStorageService from "./IStorageService";

class LocalStorageService implements IStorageService {
    getItem(key : string) : Promise<any> {
        try {
            const itemSpec = localStorage.getItem(key);
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
            localStorage.setItem(key, JSON.stringify(item));
            return Promise.resolve();
        } catch(error) {
            return Promise.reject(error);
        }
    }
    removeItem(key : string) : Promise<any> {
        try {
            localStorage.removeItem(key);
            return Promise.resolve();
        } catch(error) {
            return Promise.reject(error);
        }
    }
}

export { LocalStorageService as default, LocalStorageService }
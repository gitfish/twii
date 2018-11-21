import { BrowserStorageService } from "./service/BrowserStorageService";

class LocalStorageService extends BrowserStorageService {
    constructor() {
        super(localStorage);
    }
}

export { LocalStorageService as default, LocalStorageService }
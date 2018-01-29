import IUrlConfig from "config/IUrlConfig";

abstract class AbstractRestService {
    protected _config : IUrlConfig;
    get config() {
        return this._config;
    }
    set config(value : IUrlConfig) {
        this._config = value;
    }
}

export { AbstractRestService as default, AbstractRestService };
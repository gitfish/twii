import { IRouter } from "@twii/router/lib/IRouter";
import { IRequest } from "@twii/router/lib/IRequest";
import { IRequestHandler } from "@twii/router/lib/IRequestHandler";

const Defaults = {
    configId: "default"
};

interface IConfig {
    (env : any) : Promise<any>;
}

interface IConfigMap {
    [key : string] : IConfig;
}

interface IConfigRouterOptions {
    configId : string;
    env?: any;
    configMap: IConfigMap;
}

/*
 * A configuration interceptor type router that performs configuration based on a configured
 * configuration id which can be overridden by a _configId request parameter.
 * An instance of ConfigRouter is typically placed early in your app/router configuration (as just about everything else depends on configuration)
 */
class ConfigRouter implements IRouter {
    private _configId : string;
    private _env : any;
    private _configMap : IConfigMap;
    private _currentConfigId : string;
    constructor(opts : IConfigRouterOptions) {
        this._configId = opts.configId;
        this._env = opts.env || {};
        this._configMap = opts.configMap;
    }
    handleRequest(req : IRequest, next: IRequestHandler) : Promise<any> {
        let configId = req.params["_configId"] || this._configId;
        if(!configId) {
            configId = Defaults.configId;
        }
        if(configId !== this._currentConfigId) {
            this._currentConfigId = configId;
            // find the appropriate configurer
            const config = this._configMap[configId];
            if(!config) {
                return Promise.reject({ code: "NOT_FOUND", message: `Unable to find configuration: ${configId}` });
            }
            return config(Object.assign({}, this._env)).then(next);
        }
        return next();
    }
}

export { IConfig, IConfigMap, IConfigRouterOptions, ConfigRouter, Defaults }
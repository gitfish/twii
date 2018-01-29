const configs = {
    default: () => { return import("./defaultConfigurer").then(c => c.default() )},
    mock: () => { return import("./mockConfigurer").then(c => c.default() )}
}

let _configName : string;
let _configPromise : Promise<any>;

const configure = (configName : string) : Promise<any> => {
    if(!_configName || configName !== _configName) {
        _configName = configName || "default";
        let config = configs[_configName];
        if(!config) {
            console.warn(`Configuration ${_configName} not found - using default`);
            config = configs.default;
        }
        _configPromise = config();
    }
    return _configPromise;
};

export { configure as default, configure }
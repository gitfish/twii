interface IAuthConfig {
    username: string;
    password: string;
}

interface IConfig {
    apiBaseUrl: string;
    apiAuth?: IAuthConfig;
}

const Defaults : IConfig = {
    apiBaseUrl: "/api"
};

export { IConfig, IAuthConfig, Defaults }
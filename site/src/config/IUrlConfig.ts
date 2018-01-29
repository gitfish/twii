import IBasicAuthCredentials from "./IBasicAuthCredentials";

interface IUrlConfig {
    baseUrl: string;
    auth?: IBasicAuthCredentials; // NOTE: this is primarily used for testing
}

export { IUrlConfig as default, IUrlConfig }
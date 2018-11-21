import { IRequest } from "./IRequest";
import { IAppHost } from "./IAppHost";

interface IAppLauncher {
    (request : IRequest) : IAppHost | Promise<IAppHost>;
}

export { IAppLauncher }
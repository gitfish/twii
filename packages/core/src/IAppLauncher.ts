import { IRequest } from "@twii/router/lib/IRequest";
import { IAppHost } from "./IAppHost";

interface IAppLauncher {
    (request : IRequest) : IAppHost | Promise<IAppHost>;
}

export { IAppLauncher }
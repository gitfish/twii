import { IRequestHandler } from "./IRequestHandler";
import { IRequest } from "./IRequest";

interface IRouter {
    isPathMapped(path : string) : boolean;
    handleRequest(req : IRequest, next?: IRequestHandler) : Promise<any>;
}

export { IRouter }
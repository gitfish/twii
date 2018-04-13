import { IRequestHandler } from "./IRequestHandler";
import { IRequest } from "./IRequest";

interface IRouter {
    handleRequest(req : IRequest, next?: IRequestHandler) : Promise<any>;
}

export { IRouter }
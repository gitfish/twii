import { IEventEmitter } from "./IEventEmitter";
import { IRequest } from "@pu/router/lib/IRequest";
import { IRouter } from "@pu/router/lib/IRouter";
import { ISync } from "./ISync";
import { IStateManager } from "./IStateManager";

interface IAppHost extends IEventEmitter, IStateManager {
    sync: ISync;
    root: boolean;
    title: string;
    view: any;
    path: string;
    params: any;
    state: any;
    initialized: boolean;
    router: IRouter;
    setRouter(router : IRouter) : void;
    setTitle(title : string) : void;
    setState(state : any) : void;
    getUrl(request?: IRequest) : string;
    load(request?: IRequest) : Promise<any>;
    getUrl(request: IRequest) : string;
    open(request: IRequest) : Promise<IAppHost>;
    close() : void;
    setRoot(root : boolean) : void;
}

export { IAppHost }
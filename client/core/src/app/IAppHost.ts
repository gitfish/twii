import { IEventEmitter } from "../common/IEventEmitter";
import { IRequest } from "roota/lib/IRequest";
import { IRouter } from "roota/lib/IRouter";
import { ISync } from "../common/ISync";

interface IAppHost extends IEventEmitter {
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
}

export { IAppHost }
import { IEventEmitter } from "./IEventEmitter";
import { IRequest } from "@twii/router/lib/IRequest";
import { IRouter } from "@twii/router/lib/IRouter";
import { ISync } from "./ISync";
import { IStateManager } from "./IStateManager";
import { IAppIcon } from "./IAppIcon";

interface IAppHost extends IEventEmitter, IStateManager {
    id: string;
    sync: ISync;
    root: boolean;
    title: string;
    icon: IAppIcon;
    view: any;
    path: string;
    params: any;
    query: any;
    initialized: boolean;
    router: IRouter;
    canGoBack : boolean;
    backRequest : IRequest;
    back() : void;
    setRouter(router : IRouter) : void;
    setTitle(title : string) : void;
    getUrl(request?: IRequest) : string;
    load(request?: IRequest) : Promise<any>;
    getUrl(request: IRequest) : string;
    open(request: IRequest) : Promise<IAppHost>;
    close() : void;
    setRoot(root : boolean) : void;
    setIcon(icon : IAppIcon) : void;
}

export { IAppHost, IAppHost as default }
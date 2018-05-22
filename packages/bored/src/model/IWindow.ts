import { IRequest } from "@twii/router/lib/IRequest";
import { IWindowManager } from "./IWindowManager";
import { IComponent } from "./IComponent";
import { IAppHost } from "@twii/core/lib/IAppHost";
import { IConsumerFunc } from "@twii/core/lib/IConsumerFunc";
import { IEventEmitter } from "@twii/core/lib/IEventEmitter";
import { IPortal } from "./IPortal";
import { IWindowSettings } from "./IWindowSettings";

interface IWindow extends IComponent {
    name: string;
    path: string;
    params : any;
    query : any;
    title: string;
    onClose : IConsumerFunc<IWindow>
    closeDisabled : boolean;
    active : boolean;
    contentHidden : boolean;
    appHost: IAppHost;
    transient : boolean;
    manager : IWindowManager;
    settings : IWindowSettings;
    setPath(path : string) : void;
    setParams(params : any) : void;
    setQuery(query : any) : void;
    setTitle(title : string) : void;
    setCloseDisabled(closeDisabled : boolean) : void;
    activate() : void;
    setContentHidden(hidden : boolean) : void;
    toggleContent() : void;
    load(request : IRequest) : Promise<any>;
    open(request : IRequest) : Promise<IWindow>;
    setTransient(transient : boolean) : void;
}

export { IWindow }
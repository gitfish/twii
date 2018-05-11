import { IRequest } from "@twii/router/lib/IRequest";
import { IWindowManager } from "./IWindowManager";
import { IComponent } from "./IComponent";
import { IAppHost } from "@twii/common/lib/IAppHost";
import { IConsumerFunc } from "@twii/common/lib/IConsumerFunc";

interface IWindow extends IComponent {
    name: string;
    path: string;
    params : any;
    query : any;
    layout: any;
    title: string;
    onClose : IConsumerFunc<IWindow>
    closeDisabled : boolean;
    active : boolean;
    contentHidden : boolean;
    appHost: IAppHost;
    transient : boolean;
    setPath(path : string) : void;
    setParams(params : any) : void;
    setQuery(query : any) : void;
    setTitle(title : string) : void;
    setLayout(layout : any) : void;
    setCloseDisabled(closeDisabled : boolean) : void;
    activate() : void;
    setContentHidden(hidden : boolean) : void;
    toggleContent() : void;
    load(request : IRequest) : Promise<any>;
    open(request : IRequest) : Promise<IWindow>;
    setTransient(transient : boolean) : void;
    portal: HTMLElement;
}

export { IWindow }
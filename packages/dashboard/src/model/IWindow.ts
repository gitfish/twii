import { IRequest } from "@twii/common/lib/IRequest";
import { IWindowManager } from "./IWindowManager";
import { IComponent } from "./IComponent";
import { IAppHost } from "@twii/common/lib/IAppHost";
import { IConsumerFunc } from "@twii/common/lib/IConsumerFunc";
import { IWindowSettings } from "./IWindowSettings";
import { WindowResizeType } from "./WindowResizeType";
import { IAppIcon } from "@twii/common/lib/IAppIcon";

interface IWindowConfig {
    type?: string;
    title?: string;
    closeDisabled?: boolean;
    path?: string;
    query?: any;
    params?: any;
    contentHidden?: boolean;
    settings?: any;
}

interface IWindow extends IComponent {
    name: string;
    path: string;
    params : any;
    query : any;
    icon : IAppIcon;
    title: string;
    onClose : IConsumerFunc<IWindow>
    active : boolean;
    contentHidden : boolean;
    appHost: IAppHost;
    transient : boolean;
    manager : IWindowManager;
    settings : IWindowSettings;
    dragging: boolean;
    dragState : any;
    resizing: boolean;
    maximized: boolean;
    setPath(path : string) : void;
    setParams(params : any) : void;
    setQuery(query : any) : void;
    setTitle(title : string) : void;
    activate() : void;
    setContentHidden(hidden : boolean) : void;
    toggleContent() : void;
    load(request?: IRequest) : Promise<any>;
    open(request: IRequest) : Promise<IWindow>;
    setTransient(transient : boolean) : void;
    setDragState(dragState : any) : void;
    clearDragState() : void;
    dragStart(dragState?: any) : void;
    dragEnd() : void;
    resizeStart(type : WindowResizeType) : void;
    resizeEnd();
    maximize();
    restoreSize();
    setMaximized(maximized : boolean) : void;
    config : IWindowConfig;
    setConfig(config : IWindowConfig) : void;
}

export { IWindow, IWindowConfig }
import { IWindow } from "./IWindow";
import { IComponent } from "./IComponent";
import { IRequest } from "@twii/common/lib/IRequest";
import { IWindowSettings } from "./IWindowSettings";
import { IDragManager } from "./IDragManager";
import { WindowResizeType } from "./WindowResizeType";

interface IWindowManager extends IComponent, IDragManager {
    first : IWindow;
    last : IWindow;
    windowCount : number;
    windows: IWindow[];
    windowSettings: IWindowSettings;
    resizing: IWindow;
    active : IWindow;
    activeIndex: number;
    maximized: IWindow;
    maximizedIndex: number;
    resizeType: WindowResizeType;
    isRequiresOverflow: boolean;
    add(win : IWindow, opts? : any) : void;
    addNew(opts?: any) : void;
    open(request : IRequest) : Promise<IWindow>;
    resizeStart(win : IWindow, type : WindowResizeType) : void;
    resizeEnd();
    setActiveIndex(activeIndex : number) : void;
    setActive(win : IWindow) : void;
    setMaximized(window : IWindow) : void;
    setMaximizedIndex(maximizedIndex : number) : void;
}

export { IWindowManager }
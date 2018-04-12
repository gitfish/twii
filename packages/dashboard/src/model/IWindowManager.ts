import { IWindow } from "./IWindow";
import { IComponent } from "./IComponent";
import { IRequest } from "@twii/router/lib/IRequest";

interface IWindowManager extends IComponent {
    windowCount : number;
    windows: IWindow[];
    activeIndex: number;
    setActiveIndex(activeIndex : number) : void;
    active : IWindow;
    add(win : IWindow, makeActive?: boolean) : void;
    addNew() : void;
    setActive(win : IWindow) : void;
    dropWindow(refWindow?: IWindow) : void;
    open(request : IRequest) : Promise<IWindow>;
    closeDisabled : boolean;
    setCloseDisabled(closeDisabled : boolean) : void;
}

export { IWindowManager }
import { IWindow } from "./IWindow";
import { IComponent } from "./IComponent";
import { IRequest } from "@twii/router/lib/IRequest";

interface IWindowManager extends IComponent {
    first : IWindow;
    last : IWindow;
    windowCount : number;
    windows: IWindow[];
    add(win : IWindow, opts? : any) : void;
    addNew(opts?: any) : void;
    dropWindow(refWindow?: IWindow) : void;
    open(request : IRequest) : Promise<IWindow>;
    closeDisabled : boolean;
    setCloseDisabled(closeDisabled : boolean) : void;
}

export { IWindowManager }
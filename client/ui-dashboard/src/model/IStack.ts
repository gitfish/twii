import { IWindowManager } from "./IWindowManager";
import { IComponent } from "./IComponent";
import { IWindow } from "./IWindow";

interface IStack extends IWindowManager {
    first : IWindow;
    last : IWindow;
    splitLeft(newComp?: IComponent) : Promise<any>;
    splitRight(newComp?: IComponent) : Promise<any>;
    splitTop(newComp?: IComponent) : Promise<any>;
    splitBottom(newComp?: IComponent) : Promise<any>;
    notifyResizeWindows() : void;
}

export { IStack }
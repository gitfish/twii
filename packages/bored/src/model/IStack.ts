import { IWindowManager } from "./IWindowManager";
import { IComponent } from "./IComponent";
import { IWindow } from "./IWindow";

interface IStack extends IWindowManager {
    active : IWindow;
    activeIndex: number;
    setActiveIndex(activeIndex : number) : void;
    setActive(win : IWindow) : void;
    splitLeft(newComp?: IComponent) : Promise<any>;
    splitRight(newComp?: IComponent) : Promise<any>;
    splitTop(newComp?: IComponent) : Promise<any>;
    splitBottom(newComp?: IComponent) : Promise<any>;
}

export { IStack }
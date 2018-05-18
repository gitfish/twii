import { IWindowManager } from "./IWindowManager";
import { IComponent } from "./IComponent";
import { IWindow } from "./IWindow";
import { ISplittable } from "./ISplittable";

interface IStack extends IWindowManager, ISplittable {
    active : IWindow;
    activeIndex: number;
    headerHeight: number;
    setActiveIndex(activeIndex : number) : void;
    setActive(win : IWindow) : void;
    setHeaderHeight(headerHeight : number) : void;
}

export { IStack }
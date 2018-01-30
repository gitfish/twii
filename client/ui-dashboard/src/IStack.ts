import { IWindowManager } from "./IWindowManager";
import { IComponent } from "./IComponent";

interface IStack extends IWindowManager {
    close() : void;
    splitLeft(newComp?: IComponent) : Promise<any>;
    splitRight(newComp?: IComponent) : Promise<any>;
    splitTop(newComp?: IComponent) : Promise<any>;
    splitBottom(newComp?: IComponent) : Promise<any>;
    notifyResizeWindows() : void;
}

export { IStack }
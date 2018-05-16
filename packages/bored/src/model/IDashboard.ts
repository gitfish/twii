import { IComponent } from "./IComponent";
import { IMutableSync } from "@twii/core/lib/IMutableSync";
import { IDashboardLayout } from "./IDashboardLayout";
import { IWindow } from "./IWindow";
import { IWindowManager } from "./IWindowManager";
import { IPortalManager } from "./IPortalManager";

interface IDashboard extends IComponent {
    sync: IMutableSync;
    title: string;
    component : IComponent;
    blockSource: IComponent;
    drag: IComponent;
    closeDisabled : boolean;
    windows : IWindow[];
    
    setTitle(title : string) : void;
    setComponent(component : IComponent) : void;
    componentConfig : any;
    setComponentConfig(componentConfig : any) : Promise<any>;
    setDrag(drag : IComponent) : void;
    clearDrag() : void;
    setBlockSource(blockSource : IComponent) : void;
    clearBlockSource() : void;
    setCloseDisabled(closeDisabled : boolean) : void;
    clear() : void;
}

export { IDashboard }
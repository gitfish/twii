import { IComponent } from "./IComponent";
import { IMutableSync } from "@twii/common/lib/IMutableSync";

interface IDashboard extends IComponent {
    sync: IMutableSync;
    title: string;
    component : IComponent;
    blockSource: IComponent;
    drag: IComponent;
    closeDisabled : boolean;
    columnCount : number;
    
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
    isListLayout : boolean;
    listLayout() : Promise<any>;
    isStackLayout : boolean;
    stackLayout() : Promise<any>;
    isColumnSplitLayout : boolean;
    isTwoColumnSplitLayout : boolean;
    twoColumnSplitLayout() : Promise<any>;
    isThreeColumnSplitLayout : boolean;
    threeColumnSplitLayout() : Promise<any>;
    isOtherLayout : boolean;

    portalRoot : HTMLElement;
    getPortal(source : IComponent) : HTMLElement;
    destroyPortal(source : IComponent) : void;
}

export { IDashboard }
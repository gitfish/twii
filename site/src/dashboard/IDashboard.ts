import IComponent from "./IComponent";
import IStack from "./IStack";
import ISync from "common/ISync";
import IRequest from "roota/lib/IRequest";

interface IDashboard extends IComponent {
    sync: ISync;
    title: string;
    component : IComponent;
    blockSource: IComponent;
    drag: IComponent;
    closeDisabled : boolean;
    addApplet : IRequest;
    columnCount : number;
    
    setTitle(title : string) : void;
    setComponent(component : IComponent) : void;
    setDrag(drag : IComponent) : void;
    clearDrag() : void;
    setBlockSource(blockSource : IComponent) : void;
    clearBlockSource() : void;
    setCloseDisabled(closeDisabled : boolean) : void;
    setAddApplet(addApplet : IRequest) : void;
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

export { IDashboard as default, IDashboard }
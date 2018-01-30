import IDashboard from "./IDashboard";
import IWindow from "./IWindow";
import IRouter from "roota/lib/IRouter";
import IRequest from "roota/lib/IRequest";
import IEventEmitter from "util/IEventEmitter";

interface IComponentCallback {
    (component : IComponent) : void;
}

interface IComponentPredicate {
    (component : IComponent) : boolean;
}

interface IComponent extends IEventEmitter {
    id: string;
    type: string;
    parent: IComponent;
    top: IComponent;
    dashboard: IDashboard;
    config : any;
    addApplet: IRequest;
    setAddApplet(addApplet : IRequest) : void;
    setConfig(state : any) : Promise<any>;
    remove(comp : IComponent) : void;
    removeFromParent() : void;
    replace(newComp : IComponent, oldComp : IComponent) : void;
    visit(callback : IComponentCallback) : void;
    findFirst(predicate : IComponentPredicate) : IComponent;
    findAll(predicate : IComponentPredicate) : IComponent[];
    unmount() : void;
    [key : string] : any;
}

export { IComponent as default, IComponent, IComponentPredicate, IComponentCallback }
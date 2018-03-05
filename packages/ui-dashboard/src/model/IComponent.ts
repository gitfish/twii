import { IDashboard } from "./IDashboard";
import { IRequest } from "roota/lib/IRequest";
import { IEventEmitter } from "@twii/core/lib/common/IEventEmitter";
import { IConsumerFunc } from "@twii/core/lib/common/IConsumerFunc";
import { IPredicateFunc } from "@twii/core/lib/common/IPredicateFunc";
import { ISupplierFunc } from "@twii/core/lib/common/ISupplierFunc";

interface IComponent extends IEventEmitter {
    id: string;
    type: string;
    parent: IComponent;
    top: IComponent;
    dashboard: IDashboard;
    config : any;
    addApp: IRequest;
    addAppSupplier: ISupplierFunc<IRequest>;
    setAddApp(addApp : IRequest) : void;
    setAddAppSupplier(addAppSupplier : ISupplierFunc<IRequest>) : void;
    setConfig(state : any) : Promise<any>;
    remove(comp : IComponent) : void;
    removeFromParent() : void;
    replace(newComp : IComponent, oldComp : IComponent) : void;
    visit(callback : IConsumerFunc<IComponent>) : void;
    findFirst(predicate : IPredicateFunc<IComponent>) : IComponent;
    findAll(predicate : IPredicateFunc<IComponent>) : IComponent[];
    close() : void;
}

export { IComponent }
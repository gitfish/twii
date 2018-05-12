import { IDashboard } from "./IDashboard";
import { IRouter } from "@twii/router/lib/IRouter";
import { IRequest } from "@twii/router/lib/IRequest";
import { IEventEmitter } from "@twii/core/lib/IEventEmitter";
import { IConsumerFunc } from "@twii/core/lib/IConsumerFunc";
import { IPredicateFunc } from "@twii/core/lib/IPredicateFunc";
import { ISupplierFunc } from "@twii/core/lib/ISupplierFunc";

interface IComponent extends IEventEmitter {
    id: string;
    type: string;
    parent: IComponent;
    top: IComponent;
    dashboard: IDashboard;
    config : any;
    router: IRouter;
    setRouter(router : IRouter) : void;
    addApp: IRequest | ISupplierFunc<IRequest>;
    setAddApp(addApp : IRequest | ISupplierFunc<IRequest>) : void;
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
import { IDashboard } from "./IDashboard";
import { IRouter } from "@pu/router/lib/IRouter";
import { IRequest } from "@pu/router/lib/IRequest";
import { IEventEmitter } from "@pu/common/lib/IEventEmitter";
import { IConsumerFunc } from "@pu/common/lib/IConsumerFunc";
import { IPredicateFunc } from "@pu/common/lib/IPredicateFunc";
import { ISupplierFunc } from "@pu/common/lib/ISupplierFunc";

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
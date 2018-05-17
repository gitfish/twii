import { IDashboard } from "./IDashboard";
import { IRouter } from "@twii/router/lib/IRouter";
import { IRequest } from "@twii/router/lib/IRequest";
import { IEventEmitter } from "@twii/core/lib/IEventEmitter";
import { IConsumerFunc } from "@twii/core/lib/IConsumerFunc";
import { IPredicateFunc } from "@twii/core/lib/IPredicateFunc";
import { ISupplierFunc } from "@twii/core/lib/ISupplierFunc";
import { IViewport } from "./IViewport";
import { IPortalManager } from "./IPortalManager";

interface IComponent extends IViewport {
    id: string;
    type: string;
    parent: IComponent;
    dashboard: IDashboard;
    root: IComponent;
    config : any;
    router: IRouter;
    isWindowManager: boolean;
    portalManager: IPortalManager;
    x: number;
    rx: number;
    y: number;
    ry: number;
    width: number;
    height: number;
    setPortalManager(portalManager : IPortalManager) : void;
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
    /**
     * Resize the viewport
     * @param width
     * @param height 
     */
    resize(width : number, height : number) : void;
    /**
     * Position the viewport
     * @param x
     * @param y 
     */
    position(x : number, y : number) : void;
    /**
     * Sets the viewport relative to the dashboard
     * @param x
     * @param y 
     * @param width 
     * @param height 
     */
    setViewport(x : number, y: number, width : number, height : number) : void;
}

export { IComponent }
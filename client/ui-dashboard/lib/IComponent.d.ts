import { IDashboard } from "./IDashboard";
import { IRequest } from "roota/lib/IRequest";
import { IEventEmitter } from "@twii/core/lib/common/IEventEmitter";
import { IConsumerFunc } from "@twii/core/lib/common/IConsumerFunc";
import { IPredicateFunc } from "@twii/core/lib/common/IPredicateFunc";
interface IComponent extends IEventEmitter {
    id: string;
    type: string;
    parent: IComponent;
    top: IComponent;
    dashboard: IDashboard;
    config: any;
    addApplet: IRequest;
    setAddApplet(addApplet: IRequest): void;
    setConfig(state: any): Promise<any>;
    remove(comp: IComponent): void;
    removeFromParent(): void;
    replace(newComp: IComponent, oldComp: IComponent): void;
    visit(callback: IConsumerFunc<IComponent>): void;
    findFirst(predicate: IPredicateFunc<IComponent>): IComponent;
    findAll(predicate: IPredicateFunc<IComponent>): IComponent[];
    unmount(): void;
    [key: string]: any;
}
export { IComponent };

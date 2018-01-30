import { Component } from "./Component";
import { IStack } from "./IStack";
import { IComponent } from "./IComponent";
import { IWindow } from "./IWindow";
import { IRequest } from "roota/lib/IRequest";
/**
 * Stack - a bunch/stack of windows
 */
declare class Stack extends Component implements IStack {
    private _type;
    private _closeDisabled;
    private _activeIndex;
    windows: IWindow[];
    constructor();
    notifyResizeWindows(): void;
    private _onResize;
    readonly type: string;
    readonly windowCount: number;
    closeDisabled: boolean;
    setCloseDisabled(closeDisabled: boolean): void;
    activeIndex: number;
    setActiveIndex(activeIndex: number): void;
    readonly first: IWindow;
    readonly last: IWindow;
    active: IWindow;
    setActive(active: IWindow): void;
    add(win: IWindow, makeActive?: boolean): void;
    open(request: IRequest): Promise<any>;
    addNew(): Promise<any>;
    insertAt(item: IWindow, index: number): void;
    dropWindow(refWindow?: IWindow): void;
    splitLeft(newComp?: IComponent): Promise<void>;
    splitRight(newComp?: IComponent): Promise<void>;
    splitTop(newComp?: IComponent): Promise<void>;
    splitBottom(newComp?: IComponent): Promise<void>;
    insertBefore(item: IWindow, refItem?: IWindow): void;
    replace(newItem: IComponent, oldItem: IComponent): void;
    readonly config: {
        type: string;
        activeIndex: number;
        windows: any[];
        closeDisabled: boolean;
    };
    setConfig(config: any): Promise<any>;
    remove(node: IComponent): void;
    private _replaceWithListModuleLoaded;
    protected _visitChildren(callback: any): void;
    protected _findFirstChild(predicate: any): any;
    protected _findAllChildren(predicate: any): IComponent[];
    close(): void;
    unmount(): void;
}
export { Stack };

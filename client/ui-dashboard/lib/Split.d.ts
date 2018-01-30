import { Component } from "./Component";
import { IComponent } from "./IComponent";
import { ISplit, IHSplit, IVSplit } from "./ISplit";
declare class Split extends Component implements ISplit {
    private _offset;
    private _first;
    private _second;
    private _splitActive;
    constructor();
    private _onResize;
    splitActive: boolean;
    setSplitActive(splitActive: boolean): void;
    first: IComponent;
    setFirst(first: IComponent): void;
    readonly firstConfig: {
        component: any;
    };
    setFirstConfig(config: any): Promise<any>;
    second: IComponent;
    readonly secondConfig: {
        component: any;
    };
    setSecond(second: IComponent): void;
    setSecondConfig(config: any): Promise<any>;
    offset: number;
    setOffset(offset: number): void;
    replace(newComp: IComponent, oldComp: IComponent): void;
    remove(comp: IComponent): void;
    protected _visitChildren(callback: any): void;
    protected _findFirstChild(predicate: any): any;
    protected _findAllChildren(predicate: any): IComponent[];
    unmount(): void;
}
declare class HSplit extends Split implements IHSplit {
    private _minItemWidth;
    readonly type: string;
    minItemWidth: number;
    setMinItemWidth(minItemWidth: number): void;
    left: IComponent;
    setLeft(left: IComponent): void;
    readonly leftConfig: {
        component: any;
    };
    setLeftConfig(config: any): Promise<any>;
    right: IComponent;
    readonly rightConfig: {
        component: any;
    };
    setRight(right: IComponent): void;
    setRightConfig(config: any): void;
    readonly config: {
        type: string;
        offset: number;
        left: {
            component: any;
        };
        right: {
            component: any;
        };
    };
    setConfig(config: any): Promise<void>;
    readonly columnCount: any;
}
declare class VSplit extends Split implements IVSplit {
    private _minItemHeight;
    readonly type: string;
    minItemHeight: number;
    setMinItemHeight(minItemHeight: number): void;
    top: IComponent;
    setTop(top: IComponent): void;
    readonly topConfig: {
        component: any;
    };
    setTopConfig(config: any): Promise<any>;
    bottom: IComponent;
    readonly bottomConfig: {
        component: any;
    };
    setBottom(bottom: IComponent): void;
    setBottomConfig(config: any): Promise<any>;
    readonly config: {
        type: string;
        offset: number;
        top: {
            component: any;
        };
        bottom: {
            component: any;
        };
    };
    setConfig(config: any): Promise<void>;
    readonly rowCount: any;
}
export { Split, HSplit, VSplit };

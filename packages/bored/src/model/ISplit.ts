import { IComponent } from "./IComponent";

interface ISplit extends IComponent {
    offset : number;
    first: IComponent;
    second: IComponent;
    splitActive : boolean;
    setOffset(offset : number) : void;
    setFirst(first : IComponent) : void;
    setSecond(second : IComponent) : void;
    setSplitActive(splitActive : boolean) : void;
}

interface IHSplit extends ISplit {
    minItemWidth: number;
    leftWidth: number;
    rightWidth: number;
    splitterWidth: number;
    left: IComponent;
    right: IComponent;
    setLeft(left : IComponent) : void;
    setRight(right : IComponent) : void;
    setMinItemWidth(minItemWidth : number) : void;
    columnCount : number;
}

interface IVSplit extends ISplit {
    minItemHeight: number;
    topHeight: number;
    bottomHeight: number;
    splitterHeight: number;
    top: IComponent;
    bottom: IComponent;
    setTop(top : IComponent) : void;
    setBottom(bottom : IComponent) : void;
    setMinItemHeight(minItemHeight : number) : void;
    rowCount : number;
}

export { ISplit, IHSplit, IVSplit }
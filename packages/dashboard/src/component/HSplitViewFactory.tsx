import * as React from "react";
import { IViewFactory } from "./IViewFactory";
import { IHSplitStyles } from "./HSplit.styles";
import { IComponent } from "../model/IComponent";
import { HSplit } from "./HSplit";
import { IHSplit } from "../model/ISplit";

class HSplitViewFactory implements IViewFactory {
    styles: IHSplitStyles = undefined;
    className : string = undefined;
    createView(comp : IComponent) : React.ReactNode {
        return <HSplit hsplit={comp as IHSplit} styles={this.styles} className={this.className} />;
    }
}

export { HSplitViewFactory }
import * as React from "react";
import { IViewFactory } from "./IViewFactory";
import { IVSplitStyles } from "./VSplit.styles";
import { IComponent } from "../model/IComponent";
import { VSplit } from "./VSplit";
import { IVSplit } from "../model/ISplit";

class VSplitViewFactory implements IViewFactory {
    styles: IVSplitStyles = undefined;
    className : string = undefined;
    createView(comp : IComponent) : React.ReactNode {
        return <VSplit vsplit={comp as IVSplit} styles={this.styles} className={this.className} />;
    }
}

export { VSplitViewFactory }
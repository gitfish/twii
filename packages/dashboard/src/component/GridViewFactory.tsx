import * as React from "react";
import { IViewFactory } from "./IViewFactory";
import { IGridStyles } from "./Grid.styles";
import { IComponent } from "../model/IComponent";
import { Grid } from "./Grid";
import { IGrid } from "../model/IGrid";

class GridViewFactory implements IViewFactory {
    styles: IGridStyles = undefined;
    className: string = undefined;
    createView(comp : IComponent) : React.ReactNode {
        return <Grid grid={comp as IGrid} styles={this.styles} className={this.className} />;
    }
}

export { GridViewFactory }
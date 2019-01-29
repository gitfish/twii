import * as React from "react";
import { IViewFactory } from "./IViewFactory";
import { IStackStyles } from "./Stack.styles";
import { IComponent } from "../model/IComponent";
import { Stack } from "./Stack";
import { IStack } from "../model/IStack";

class StackViewFactory implements IViewFactory {
    styles: IStackStyles = undefined;
    className: string = undefined;
    createView(comp : IComponent) : React.ReactNode {
        return <Stack stack={comp as IStack} styles={this.styles} className={this.className} />;
    }
}

export { StackViewFactory }
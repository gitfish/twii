/// <reference types="react" />
import * as React from "react";
import { IViewFactory } from "./IViewFactory";
import { IComponentProps } from "./IComponentProps";
declare class ViewFactory implements IViewFactory {
    private _typeFactoryMap;
    registerTypeFactory(type: string, factory: IViewFactory): void;
    createView(props: IComponentProps): React.ReactNode;
}
export { ViewFactory };

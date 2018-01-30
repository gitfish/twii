/// <reference types="react" />
import * as React from "react";
import { IComponentViewFactory } from "./IComponentViewFactory";
import { IComponentProps } from "./IComponentProps";
declare class ComponentViewFactory implements IComponentViewFactory {
    private _typeFactoryMap;
    registerTypeFactory(type: string, factory: IComponentViewFactory): void;
    createView(props: IComponentProps): React.ReactNode;
}
export { ComponentViewFactory };

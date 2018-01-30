/// <reference types="react" />
import * as React from "react";
import { IComponentProps } from "./IComponentProps";
interface IComponentViewFactory {
    createView(props: IComponentProps): React.ReactNode;
}
export { IComponentViewFactory };

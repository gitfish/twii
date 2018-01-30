/// <reference types="react" />
import * as React from "react";
import { IComponentProps } from "./IComponentProps";
interface IViewFactory {
    createView(props: IComponentProps): React.ReactNode;
}
export { IViewFactory };

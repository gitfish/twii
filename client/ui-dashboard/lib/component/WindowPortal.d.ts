/// <reference types="react" />
import * as React from "react";
import { IWindow } from "../IWindow";
import { IWindowPortalStyles } from "./WindowPortal.styles";
interface IWindowPortalProps {
    window: IWindow;
    className?: string;
    styles?: IWindowPortalStyles;
    listenToPosition?: boolean;
}
declare class ProjectedWindowPortal extends React.Component<IWindowPortalProps, any> {
    private _ref;
    private _onRef;
    private _projectPortal;
    private _addListeners;
    private _removeListeners;
    componentWillReceiveProps(nextProps: IWindowPortalProps): void;
    private _renderApp();
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
    componentDidUpdate(): void;
}
export { IWindowPortalProps, ProjectedWindowPortal };

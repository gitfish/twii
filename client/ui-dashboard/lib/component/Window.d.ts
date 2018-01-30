/// <reference types="react" />
import * as React from "react";
import { IWindow } from "../IWindow";
interface IWindowProps {
    window: IWindow;
    className?: string;
}
declare class WindowPortal extends React.Component<IWindowProps, any> {
    private _ref;
    private _onRef;
    componentWillReceiveProps(nextProps: IWindowProps): void;
    private _resize();
    private _renderPortal();
    componentDidMount(): void;
    render(): JSX.Element;
    componentDidUpdate(): void;
}
export { IWindowProps, WindowPortal };

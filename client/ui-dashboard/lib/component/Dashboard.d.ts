/// <reference types="react" />
import * as React from "react";
import { IDashboard } from "../IDashboard";
import { IEventTarget } from "@twii/core/lib/common/IEventEmitter";
import { IDashboardStyles } from "./Dashboard.styles";
import { IDashboardClassNames } from "./Dashboard.classNames";
interface IDashboardProps {
    dashboard: IDashboard;
    className?: string;
    hidden?: boolean;
    host?: IEventTarget;
    styles?: IDashboardStyles;
    classNames?: IDashboardClassNames;
}
declare class Dashboard extends React.Component<IDashboardProps, any> {
    private _onHostResize;
    private _addHostListener(host);
    private _removeHostListener(host);
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentWillReceiveProps(nextProps: IDashboardProps): void;
    private _onPortalRootRef;
    render(): JSX.Element;
    componentDidUpdate(): void;
}
declare class DashboardContainer extends React.Component<IDashboardProps, any> {
    private _onRenderDone;
    render(): JSX.Element;
}
export { IDashboardProps, DashboardContainer, Dashboard };

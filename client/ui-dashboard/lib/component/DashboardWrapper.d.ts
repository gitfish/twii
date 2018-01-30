/// <reference types="react" />
import * as React from "react";
import IRequest from "roota/lib/IRequest";
import { Dashboard } from "../Dashboard";
import { IDashboard } from "../IDashboard";
import { IEventEmitter } from "@twii/core/lib/common/IEventEmitter";
import { IDashboardStyles } from "./Dashboard.styles";
interface IDashboardWrapperProps {
    className?: string;
    config?: any;
    addApplet?: IRequest;
    loader?: () => Promise<any>;
    saver?: (data: any) => Promise<any>;
    saveDelay?: number;
    host?: IEventEmitter;
    styles?: IDashboardStyles;
}
interface IDashboardWrapper {
    dashboard: IDashboard;
}
declare class DashboardWrapper extends React.Component<IDashboardWrapperProps, any> implements IDashboardWrapper {
    dashboard: Dashboard;
    constructor(props: IDashboardWrapperProps);
    private _setFromProps(props);
    componentWillReceiveProps(nextProps: any): void;
    componentWillMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
export { IDashboardWrapper, IDashboardWrapperProps, DashboardWrapper };

/// <reference types="react" />
import * as React from "react";
import { IDashboardList } from "../IDashboardList";
import { IEventTarget } from "@twii/core/lib/common/IEventEmitter";
interface IDashboardListProps {
    dashboardList: IDashboardList;
    host?: IEventTarget;
}
declare class DashboardList extends React.Component<IDashboardListProps, any> {
    componentWillUnmount(): void;
    render(): JSX.Element;
}
declare class DashboardListContainer extends React.Component<IDashboardListProps, any> {
    private _onRenderDone;
    render(): JSX.Element;
}
export { IDashboardListProps, DashboardListContainer, DashboardList };

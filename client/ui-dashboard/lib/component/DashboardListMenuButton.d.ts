/// <reference types="react" />
import * as React from "react";
import { IDashboardList } from "../IDashboardList";
interface IDashboardListMenuButtonProps {
    dashboardList: IDashboardList;
}
declare class DashboardListMenuButton extends React.Component<IDashboardListMenuButtonProps, any> {
    private _onAddDashboardClick;
    private _onDashboardClick;
    private _onRemoveAllDashboardsClick;
    private _onClickCopyItem;
    private _onClickRemoveItem;
    render(): JSX.Element;
}
declare class DashboardListMenuButtonContainer extends React.Component<IDashboardListMenuButtonProps, any> {
    private _onRenderSync;
    private _onRenderDone;
    private _onRenderError;
    render(): JSX.Element;
}
declare class DashboardListMenuApp extends React.Component<any, any> {
    render(): JSX.Element;
}
export { IDashboardListMenuButtonProps, DashboardListMenuButtonContainer, DashboardListMenuButton, DashboardListMenuApp };

/// <reference types="react" />
import * as React from "react";
import { IDashboard } from "../IDashboard";
import { IContextualMenuItem } from "office-ui-fabric-react/lib/ContextualMenu";
import { IDashboardProps } from "./IDashboardProps";
import { IDashboardListProps } from "./IDashboardListProps";
declare const createDashboardLayoutItems: (dashboard: IDashboard) => IContextualMenuItem[];
declare const createDashboardLayoutSectionItem: (dashboard: IDashboard) => IContextualMenuItem;
declare const createDashboardLayoutItem: (dashboard: IDashboard) => IContextualMenuItem;
declare const createDashboardSettingsItem: (dashboard: IDashboard, name?: string) => IContextualMenuItem;
declare class DashboardLayoutButton extends React.Component<IDashboardProps, any> {
    render(): JSX.Element;
}
declare class DashboardLayoutButtonContainer extends React.Component<IDashboardProps, any> {
    private _onRenderDone;
    private _onRenderError;
    private _onRenderLoad;
    render(): JSX.Element;
}
declare class DashboardListLayoutActiveButton extends React.Component<IDashboardListProps, any> {
    render(): JSX.Element;
}
declare class DashboardListLayoutActiveButtonContainer extends React.Component<IDashboardListProps, any> {
    private _onRenderDone;
    private _onRenderError;
    private _onRenderLoad;
    render(): JSX.Element;
}
declare class DashboardListLayoutApplet extends React.Component<any, any> {
    render(): JSX.Element;
}
export { DashboardListLayoutActiveButtonContainer, DashboardListLayoutActiveButton, DashboardLayoutButtonContainer, DashboardLayoutButton, createDashboardLayoutItems, createDashboardLayoutSectionItem, createDashboardSettingsItem, createDashboardLayoutItem, DashboardListLayoutApplet };

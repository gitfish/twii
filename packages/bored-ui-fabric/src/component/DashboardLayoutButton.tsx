import * as React from "react";
import { observer } from "mobx-react";
import { IDashboardList } from "@twii/bored/lib/model/IDashboardList";
import { IDashboard } from "@twii/bored/lib/model/IDashboard";
import { DefaultButton } from "office-ui-fabric-react/lib/Button";
import { IContextualMenuProps, IContextualMenuItem, ContextualMenuItemType } from "office-ui-fabric-react/lib/ContextualMenu";
import { DashboardAddStore } from "@twii/bored/lib/model/DashboardAddStore";
import { IDashboardProps } from "./IDashboardProps";
import { IDashboardListProps } from "./IDashboardListProps";
import { Sync } from "@twii/core-ui-fabric/lib/component/Sync";
import { CompactError } from "@twii/core-ui-fabric/lib/component/Error";
import { Spinner, SpinnerSize } from "office-ui-fabric-react/lib/Spinner";
import { createDashboardLayoutMenuSection } from "./DashboardLayoutMenuHelper";
import { DashboardLayoutRegistry } from "./DashboardLayoutRegistry";

@observer
class DashboardLayoutButton extends React.Component<IDashboardProps, any> {
    render() {
        if(this.props.dashboard) {
            const layoutSectionItem = createDashboardLayoutMenuSection(this.props.dashboard);
            const current = layoutSectionItem.sectionProps.items.find(item => item.checked);
            const menuProps : IContextualMenuProps = {
                items: [layoutSectionItem]
            };
            const buttonTitle = current ? current.name : "Layout";
            return (
                <DefaultButton title={buttonTitle} text={buttonTitle} className="dashboard-layout-menu-button app-menu-button app-menu-button-with-dropdown" iconProps={current ? current.iconProps : { iconName: "ViewDashboard" }} menuProps={menuProps} />
            );
        }
        return null;
    }
}

class DashboardLayoutButtonContainer extends React.Component<IDashboardProps, any> {
    private _onRenderDone = () => {
        return <DashboardLayoutButton {...this.props} />;
    }
    private _onRenderError = (error : any) => {
        return <CompactError error={error} />;
    }
    private _onRenderLoad = () => {
        return <Spinner size={SpinnerSize.small} ariaLabel="Loading..." />;
    }
    render() {
        return <Sync sync={this.props.dashboard.sync} onRenderSync={this._onRenderLoad} onRenderError={this._onRenderError} onRenderDone={this._onRenderDone} />;
    }
}

@observer
class DashboardListLayoutActiveButton extends React.Component<IDashboardListProps, any> {
    render() {
        if(this.props.dashboardList && this.props.dashboardList.active) {
            return <DashboardLayoutButton dashboard={this.props.dashboardList.active} />;
        }
        return null;
    }
}

class DashboardListLayoutActiveButtonContainer extends React.Component<IDashboardListProps, any> {
    private _onRenderDone = () => {
        return <DashboardListLayoutActiveButton {...this.props} />;
    }
    private _onRenderError = (error : any) => {
        return <CompactError error={error} />;
    }
    private _onRenderLoad = () => {
        return <Spinner size={SpinnerSize.small} ariaLabel="Loading..." />;
    }
    render() {
        return <Sync sync={this.props.dashboardList.sync} onRenderSync={this._onRenderLoad} onRenderError={this._onRenderError} onRenderDone={this._onRenderDone} />;
    }
}

export { 
    DashboardListLayoutActiveButtonContainer,
    DashboardListLayoutActiveButton,
    DashboardLayoutButtonContainer,
    DashboardLayoutButton
}
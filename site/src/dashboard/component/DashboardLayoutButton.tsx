import * as React from "react";
import { observer } from "mobx-react";
import IDashboardList from "../IDashboardList";
import IDashboard from "../IDashboard";
import { DefaultButton } from "office-ui-fabric-react/lib/Button";
import { IContextualMenuProps, IContextualMenuItem, ContextualMenuItemType } from "office-ui-fabric-react/lib/ContextualMenu";
import DashboardAddStore from "../DashboardAddStore";
import DashboardListStore from "../DashboardListStore";
import IDashboardProps from "./IDashboardProps";
import IDashboardListProps from "./IDashboardListProps";
import SyncContainer from "common/component/SyncContainer";
import { onRenderItemLoading, onRenderItemError } from "app/component/AppItemHelper";

const onListClick = (e : React.MouseEvent<HTMLElement>, item : IContextualMenuItem) => {
    item.dashboard.listLayout();
};

const onTabsClick = (e : React.MouseEvent<HTMLElement>, item : IContextualMenuItem) => {
    item.dashboard.stackLayout();
};

const onTwoColumnSplitClick = (e : React.MouseEvent<HTMLElement>, item : IContextualMenuItem) => {
    item.dashboard.twoColumnSplitLayout();
};

const onThreeColumnSplitClick = (e : React.MouseEvent<HTMLElement>, item : IContextualMenuItem) => {
    item.dashboard.threeColumnSplitLayout();
};

const createDashboardLayoutItems = (dashboard : IDashboard) : IContextualMenuItem[] => {
    return [
        {
            dashboard: dashboard,
            key: "list",
            name: "Basic",
            iconProps: { iconName: "CollapseMenu" },
            onClick: onListClick,
            checked: dashboard.isListLayout,
            canCheck: true
        },
        {
            dashboard: dashboard,
            key: "stack",
            name: "Tabs",
            iconProps: { iconName: "Redeploy" },
            onClick: onTabsClick,
            checked: dashboard.isStackLayout,
            canCheck: true
        },
        {
            dashboard: dashboard,
            key: "twoColumnSplit",
            name: "Two Columns",
            iconProps: { iconName: "DoubleColumn" },
            onClick: onTwoColumnSplitClick,
            checked: dashboard.isTwoColumnSplitLayout,
            canCheck: true
        },
        {
            dashboard: dashboard,
            key: "threeColumnSplit",
            name: "Three Columns",
            iconProps: { iconName: "TripleColumn" },
            onClick: onThreeColumnSplitClick,
            checked: dashboard.isThreeColumnSplitLayout,
            canCheck: true
        },
        {
            dashboard: dashboard,
            key: "other",
            name: "Custom",
            iconProps: { iconName: "ViewDashboard" },
            checked: dashboard.isOtherLayout,
            canCheck: true,
            disabled: true
        }
    ];
};

const createDashboardLayoutSectionItem = (dashboard : IDashboard) : IContextualMenuItem => {
    const layoutItems : IContextualMenuItem[] = createDashboardLayoutItems(dashboard);
    return {
        key: "layoutSectionItem",
        itemType: ContextualMenuItemType.Section,
        sectionProps: {
            key: "layoutSection",
            title: "Layout",
            items: layoutItems
        }
    };
};

const createDashboardLayoutItem = (dashboard : IDashboard) : IContextualMenuItem => {
    const layoutSectionItem = createDashboardLayoutSectionItem(dashboard);
    const current = layoutSectionItem.sectionProps.items.find(item => item.checked);
    return {
        key: "dashboardLayout",
        name: dashboard.sync.syncing ? "Loading..." : dashboard.sync.error ? "Error" : current ? current.name : "Layout",
        iconProps: current ? current.iconProps : { iconName: "ViewDashboard"},
        subMenuProps: {
            items: [layoutSectionItem]
        }
    };
};

const createDashboardSettingsItem = (dashboard : IDashboard, name?: string) : IContextualMenuItem => {
    const layoutSectionItem = createDashboardLayoutSectionItem(dashboard);
    return {
        key: "dashboardSettings",
        name: name,
        iconProps: { iconName: "Settings" },
        subMenuProps: {
            items: [layoutSectionItem]
        }
    }
};

@observer
class DashboardLayoutButton extends React.Component<IDashboardProps, any> {
    render() {
        if(this.props.dashboard) {
            const layoutSectionItem = createDashboardLayoutSectionItem(this.props.dashboard);
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
    render() {
        return <SyncContainer sync={this.props.dashboard.sync} onRenderSync={onRenderItemLoading} onRenderError={onRenderItemError} onRenderDone={this._onRenderDone} />;
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
    render() {
        return <SyncContainer sync={this.props.dashboardList.sync} onRenderSync={onRenderItemLoading} onRenderError={onRenderItemError} onRenderDone={this._onRenderDone} />;
    }
}

class DashboardListLayoutApplet extends React.Component<any, any> {
    render() {
        return <DashboardListLayoutActiveButtonContainer dashboardList={DashboardListStore} />;
    }
}

export { 
    DashboardListLayoutActiveButtonContainer,
    DashboardListLayoutActiveButton,
    DashboardLayoutButtonContainer,
    DashboardLayoutButton,
    createDashboardLayoutItems,
    createDashboardLayoutSectionItem,
    createDashboardSettingsItem,
    createDashboardLayoutItem,
    DashboardListLayoutApplet
}
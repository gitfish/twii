import * as React from "react";
import { observer } from "mobx-react";
import { IDashboardList } from "../model/IDashboardList";
import { DefaultButton } from "office-ui-fabric-react/lib/Button";
import { IContextualMenuProps, IContextualMenuItem, ContextualMenuItemType } from "office-ui-fabric-react/lib/ContextualMenu";
import { IDashboard } from "../model/IDashboard";
import { Dashboard } from "../model/Dashboard";
import { addDashboard, removeDashboard } from "../DashboardActions";
import { Sync } from "@twii/common/lib/component/Sync";

interface IDashboardListMenuButtonProps {
    dashboardList: IDashboardList;
}

@observer
class DashboardListMenuButton extends React.Component<IDashboardListMenuButtonProps, any> {
    private _onAddDashboardClick = () => {
        addDashboard({ dashboardList: this.props.dashboardList });
    }
    private _onDashboardClick = (e : React.MouseEvent<HTMLElement>, item : IContextualMenuItem) => {
        this.props.dashboardList.setActive(item.dashboard);
    }
    private _onRemoveAllDashboardsClick = () => {
        removeDashboard({ dashboardList: this.props.dashboardList });
    }
    private _onClickCopyItem = (e, item) => {
        addDashboard({ dashboardList: this.props.dashboardList, existing: item.dashboard });
    }
    private _onClickRemoveItem = (e, item) => {
        removeDashboard({ dashboardList: this.props.dashboardList, dashboard: item.dashboard });
    }
    render() {
        let title : string;
        const items : IContextualMenuItem[] = [];
        const sync = this.props.dashboardList.sync;
        
        const dashboards = this.props.dashboardList.dashboards;
        const active = this.props.dashboardList.active;
        if(dashboards.length > 0) {
            const dashboardItems : IContextualMenuItem[] = dashboards.map(d => {
                return {
                    key: d.id,
                    name: d.title,
                    canCheck: true,
                    checked: d === active,
                    dashboard: d,
                    onClick: this._onDashboardClick,
                    split: true,
                    subMenuProps: {
                        items: [
                            {
                                key: "copy",
                                name: "Copy",
                                iconProps: { iconName: "Copy" },
                                dashboard: d,
                                onClick: this._onClickCopyItem
                            },
                            {
                                key: "remove",
                                name: "Remove",
                                iconProps: { iconName: "ChromeClose" },
                                dashboard: d,
                                onClick: this._onClickRemoveItem
                            }
                        ]
                    }
                };
            });
            const dashboardSectionItem : IContextualMenuItem = {
                key: "dashboardSectionItem",
                itemType: ContextualMenuItemType.Section,
                sectionProps: {
                    key: "dashboardSection",
                    title: "Dashboards",
                    items: dashboardItems
                }
            };
            items.push(dashboardSectionItem);
        }
        if(active) {
            title = active.title;
        } else {
            title = "Dashboards";
        }
        const actionItems : IContextualMenuItem[] = [];
        actionItems.push({
            key: "add",
            name: "Add Dashboard",
            onClick: this._onAddDashboardClick,
            iconProps: { iconName: "Add" }
        });
        
        if(this.props.dashboardList.dashboards.length > 0) {
            actionItems.push({
                key: "removeAllSep",
                name: "-"
            });
            actionItems.push({
                key: "removeAll",
                name: "Remove All Dashboards",
                onClick: this._onRemoveAllDashboardsClick,
                iconProps: { iconName: "Clear" }
            });
        }
        const actionSectionItem : IContextualMenuItem = {
            key: "actionSectionItem",
            itemType: ContextualMenuItemType.Section,
            sectionProps: {
                key: "actionSection",
                title: "Actions",
                items: actionItems,
                topDivider: true
            }
        };
        items.push(actionSectionItem);
        const menuProps : IContextualMenuProps = {
            items: items
        };
        return (
            <DefaultButton className="dashboard-list-menu-button app-menu-button" menuProps={menuProps}>{title}</DefaultButton>
        );
    }
}

class DashboardListMenuButtonContainer extends React.Component<IDashboardListMenuButtonProps, any> {
    private _onRenderSync = () => {
        return <DefaultButton className="dashboard-list-menu-button app-menu-button">Loading...</DefaultButton>
    }
    private _onRenderDone = () => {
        return <DashboardListMenuButton {...this.props} />
    }
    private _onRenderError = () => {
        return <DefaultButton className="dashboard-list-menu-button app-menu-button error">Error</DefaultButton>
    }
    render() {
        return <Sync sync={this.props.dashboardList.sync} onRenderSync={this._onRenderSync} onRenderDone={this._onRenderDone} />;
    }
}

export { IDashboardListMenuButtonProps, DashboardListMenuButtonContainer, DashboardListMenuButton }
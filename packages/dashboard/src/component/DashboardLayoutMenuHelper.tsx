import * as React from "react";
import { IContextualMenuItem, ContextualMenuItemType } from "office-ui-fabric-react/lib/ContextualMenu";
import { IDashboard } from "../model/IDashboard";
import { IDashboardList } from "../model/IDashboardList";

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

const createDashboardListLayoutItem = (dashboardList : IDashboardList) : IContextualMenuItem => {
    const sync = dashboardList.sync;
    const active = dashboardList.active;
    return !sync.syncing && active ? createDashboardLayoutItem(active) : undefined;
};

export {
    createDashboardLayoutItems,
    createDashboardLayoutSectionItem,
    createDashboardSettingsItem,
    createDashboardLayoutItem,
    createDashboardListLayoutItem
}
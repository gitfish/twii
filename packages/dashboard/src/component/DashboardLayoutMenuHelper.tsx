import * as React from "react";
import { IContextualMenuItem, ContextualMenuItemType } from "office-ui-fabric-react/lib/ContextualMenu";
import { IDashboard } from "../model/IDashboard";
import { IDashboardList } from "../model/IDashboardList";
import { IIconProps } from "office-ui-fabric-react/lib/Icon";
import { IDashboardLayoutItem, DashboardLayoutRegistry } from "./DashboardLayoutRegistry";

const onClickDashboardLayoutItem = (e : React.MouseEvent<HTMLButtonElement>, item : IContextualMenuItem) => {
    item.applyLayout(item.dashboard);
};

const createDashboardLayoutMenuItem = (dashboard : IDashboard, item : IDashboardLayoutItem) : IContextualMenuItem => {
    return {
        key: item.key,
        name: item.name,
        iconProps: item.iconProps,
        dashboard: dashboard,
        applyLayout: item.applyLayout,
        canCheck: true,
        checked: item.isLayoutApplied(dashboard),
        onClick: onClickDashboardLayoutItem
    };
};

const createDashboardLayoutMenuItems = (dashboard : IDashboard, items : IDashboardLayoutItem[] = DashboardLayoutRegistry.itemsView) : IContextualMenuItem[] => {
    const isAnyLayoutApplied = items.some(item => item.isLayoutApplied(dashboard));
    const r = items.map(item => {
        return createDashboardLayoutMenuItem(dashboard, item);
    });
    r.push({
        dashboard: dashboard,
        key: "other",
        name: "Custom",
        iconProps: { iconName: "ViewDashboard" },
        checked: !isAnyLayoutApplied,
        canCheck: true,
        disabled: true
    });
    return r;
};

const createDashboardLayoutMenuSection = (dashboard : IDashboard, items : IDashboardLayoutItem[] = DashboardLayoutRegistry.itemsView) : IContextualMenuItem => {
    const layoutItems : IContextualMenuItem[] = createDashboardLayoutMenuItems(dashboard, items);
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

const createDashboardMenu = (dashboard : IDashboard, items : IDashboardLayoutItem[] = DashboardLayoutRegistry.itemsView) : IContextualMenuItem => {
    const layoutSectionItem = createDashboardLayoutMenuSection(dashboard, items);
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

const createDashboardSettingsItem = (name: string, dashboard : IDashboard, items : IDashboardLayoutItem[] = DashboardLayoutRegistry.itemsView) : IContextualMenuItem => {
    const layoutSectionItem = createDashboardLayoutMenuSection(dashboard, items);
    return {
        key: "dashboardSettings",
        name: name,
        iconProps: { iconName: "Settings" },
        subMenuProps: {
            items: [layoutSectionItem]
        }
    }
};

const createDashboardListMenu = (dashboardList : IDashboardList, items : IDashboardLayoutItem[] = DashboardLayoutRegistry.itemsView) : IContextualMenuItem => {
    const sync = dashboardList.sync;
    const active = dashboardList.active;
    return !sync.syncing && active ? createDashboardMenu(active, items) : undefined;
};

export {
    createDashboardLayoutMenuItems,
    createDashboardLayoutMenuSection,
    createDashboardSettingsItem,
    createDashboardLayoutMenuItem,
    createDashboardMenu,
    createDashboardListMenu
}
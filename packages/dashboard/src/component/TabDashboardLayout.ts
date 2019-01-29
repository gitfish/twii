import { IDashboardLayout } from "./IDashboardLayout";
import * as TabLayout from "../model/TabLayout";

const TabDashboardLayout : IDashboardLayout = {
    key: "tabs",
    name: "Tabs",
    iconProps: { iconName: "BrowserTab" },
    applyLayout: TabLayout.applyLayout,
    isLayoutApplied: TabLayout.isLayoutApplied
};

export { TabDashboardLayout }
import { ListModel } from "@twii/core/lib/model/ListModel";
import { IDashboard } from "@twii/bored/lib/model/IDashboard";
import { IIconProps } from "office-ui-fabric-react/lib/Icon";
import * as TabLayout from "@twii/bored/lib/model/TabLayout";
import * as TwoColumnLayout from "@twii/bored/lib/model/TwoColumnLayout";
import * as ThreeColumnLayout from "@twii/bored/lib/model/ThreeColumnLayout";
import * as GridLayout from "@twii/bored/lib/model/GridLayout";

interface IDashboardLayoutItem {
    key: string;
    name: string;
    iconProps?: IIconProps;
    applyLayout: (dashboard : IDashboard) => Promise<any> | any;
    isLayoutApplied: (dashboard : IDashboard) => boolean;
}

// the dashboard layout register - initialized with defaults
const DashboardLayoutRegistry = new ListModel<IDashboardLayoutItem>([
    {
        key: "tabs",
        name: "Tabs",
        iconProps: { iconName: "BrowserTab" },
        applyLayout: TabLayout.applyLayout,
        isLayoutApplied: TabLayout.isLayoutApplied
    },
    {
        key: "2cols",
        name: "Two Columns",
        iconProps: { iconName: "DoubleColumn" },
        applyLayout: TwoColumnLayout.applyLayout,
        isLayoutApplied: TwoColumnLayout.isLayoutApplied
    },
    {
        key: "3cols",
        name: "Three Columns",
        iconProps: { iconName: "TripleColumn" },
        applyLayout: ThreeColumnLayout.applyLayout,
        isLayoutApplied: ThreeColumnLayout.isLayoutApplied
    },
    {
        key: "grid",
        name: "Grid",
        iconProps: { iconName: "LargeGrid"},
        applyLayout: GridLayout.applyLayout,
        isLayoutApplied: GridLayout.isLayoutApplied
    }
]);

export { IDashboardLayoutItem, DashboardLayoutRegistry }
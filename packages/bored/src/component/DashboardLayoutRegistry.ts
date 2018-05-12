import { ListModel } from "@twii/core/lib/model/ListModel";
import { IDashboard } from "../model/IDashboard";
import { IIconProps } from "office-ui-fabric-react/lib/Icon";
import * as TabLayout from "../model/TabLayout";
import * as TwoColumnLayout from "../model/TwoColumnLayout";
import * as ThreeColumnLayout from "../model/ThreeColumnLayout";
import * as GridLayout from "../model/GridLayout";

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
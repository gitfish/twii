import { IDashboardLayout } from "./IDashboardLayout";
import * as TwoColumnLayout from "../model/TwoColumnLayout";

const TwoColumnSplitDashboardLayout : IDashboardLayout = {
    key: "twoColumnSplit",
    name: "Two Columns",
    iconProps: { iconName: "DoubleColumn" },
    applyLayout: TwoColumnLayout.applyLayout,
    isLayoutApplied: TwoColumnLayout.isLayoutApplied
};

export { TwoColumnSplitDashboardLayout }
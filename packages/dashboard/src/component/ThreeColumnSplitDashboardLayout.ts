import { IDashboardLayout } from "./IDashboardLayout";
import * as ThreeColumnLayout from "../model/ThreeColumnLayout";

const ThreeColumnSplitDashboardLayout : IDashboardLayout = {
    key: "threeColumnSplit",
    name: "Three Columns",
    iconProps: { iconName: "TripleColumn" },
    applyLayout: ThreeColumnLayout.applyLayout,
    isLayoutApplied: ThreeColumnLayout.isLayoutApplied
};

export { ThreeColumnSplitDashboardLayout }
import { ListModel } from "@twii/common/lib/model/ListModel";
import { IDashboardLayout } from "./IDashboardLayout";
import { TabDashboardLayout } from "./TabDashboardLayout";
import { TwoColumnSplitDashboardLayout } from "./TwoColumnSplitDashboardLayout";
import { ThreeColumnSplitDashboardLayout } from "./ThreeColumnSplitDashboardLayout";

// the dashboard layout register - initialized with defaults
const DashboardLayoutRegistry = new ListModel<IDashboardLayout>([
    TabDashboardLayout,
    TwoColumnSplitDashboardLayout,
    ThreeColumnSplitDashboardLayout
]);

export { DashboardLayoutRegistry }
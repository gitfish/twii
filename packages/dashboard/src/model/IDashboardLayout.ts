import { IIconProps } from "office-ui-fabric-react/lib/Icon";
import { IDashboard } from "../model/IDashboard";
import { IPredicateFunc } from "@twii/common/lib/IPredicateFunc";

interface IDashboardLayout {
    doLayout: (dashboard : IDashboard) => Promise<any>;
    isLayoutApplied: IPredicateFunc<IDashboard>;
}

export { IDashboardLayout }
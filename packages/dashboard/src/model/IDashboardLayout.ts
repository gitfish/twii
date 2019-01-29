import { IDashboard } from "../model/IDashboard";
import { IPredicateFunc } from "@twii/common/lib/IPredicateFunc";

interface IDashboardLayout {
    doLayout: (dashboard : IDashboard) => Promise<any>;
    isLayoutApplied: IPredicateFunc<IDashboard>;
}

export { IDashboardLayout }
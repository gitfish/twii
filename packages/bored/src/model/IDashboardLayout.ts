import { IDashboard } from "../model/IDashboard";
import { IPredicateFunc } from "@twii/core/lib/IPredicateFunc";

interface IDashboardLayout {
    doLayout: (dashboard : IDashboard) => Promise<any>;
    isLayoutApplied: IPredicateFunc<IDashboard>;
}

export { IDashboardLayout }
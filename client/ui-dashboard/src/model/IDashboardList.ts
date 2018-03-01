import { IDashboard } from "./IDashboard";
import { IComponent } from "./IComponent";
import { ISync } from "@twii/core/lib/common/ISync";
import { IRequest } from "roota/lib/IRequest";

interface IDashboardList extends IComponent {
    sync: ISync;
    active: IDashboard;
    activeIndex: number;
    dashboards : IDashboard[];
    dashboardCount: number;
    closeDisabled: boolean;
    setActive(active : IDashboard) : void;
    setActiveIndex(activeIndex : number) : void;
    add(dashboard : IDashboard, makeActive?: boolean) : void;
    setCloseDisabled(closeDisabled : boolean) : void;
    clear() : void;
}

export { IDashboardList }
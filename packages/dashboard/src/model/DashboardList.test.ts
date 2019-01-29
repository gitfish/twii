import { Dashboard } from "./Dashboard";
import { ComponentFactory } from "./ComponentFactory";
import { DashboardList } from "./DashboardList";
import { DashboardRemoveStore } from "./DashboardRemoveStore";

describe("Dashboard List Test", () => {
    test("dashboard list basic test", () => {
        const dbl = new DashboardList();
        dbl.componentFactory = ComponentFactory;

        expect(dbl.dashboardCount).toBe(0);

        const db = new Dashboard();
        dbl.add(db, true);
        
        expect(dbl.dashboardCount).toBe(1);
        expect(dbl.activeIndex).toBe(0);
        expect(dbl.active).toBe(db);

        DashboardRemoveStore.value = db;

        db.removeFromParent();

        expect(dbl.dashboardCount).toBe(0);
    });
});
import { toPromise } from "common/SyncUtils";
import { SyncModel } from "common/model/SyncModel";

describe("SynUtils", () => {
    test("toPromise", async () => {
        const m = new SyncModel();
        m.syncStart({ id: "test1", type: "read" });
        const p1 = toPromise(m);
        const p2 = toPromise(m);
        
        setTimeout(() => {
            m.syncEnd();
        }, 3000);

        await Promise.all([p1, p2]);
    });
});
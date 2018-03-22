import { toPromise } from "SyncUtils";
import { Sync } from "model/Sync";

describe("SynUtils", () => {
    test("toPromise", async () => {
        const m = new Sync();
        m.syncStart({ id: "test1", type: "read" });
        const p1 = toPromise(m);
        const p2 = toPromise(m);
        
        setTimeout(() => {
            m.syncEnd();
        }, 3000);

        await Promise.all([p1, p2]);
    });
});
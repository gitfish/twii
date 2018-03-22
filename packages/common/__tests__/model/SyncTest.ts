import { Sync } from "model/Sync";

describe("Sync Model", () => {
    test("standard", () => {
        const m = new Sync();
        m.syncStart({ id: "test1", type: "read" });

        expect(m.id).toBe("test1");
        expect(m.type).toBe("read");
        expect(m.syncing).toBeTruthy();
        expect(m.startDate).toBeTruthy();
        expect(m.endDate).toBeFalsy();

        m.syncEnd();
        expect(m.syncing).toBeFalsy();
        expect(m.endDate).toBeTruthy();
        expect(m.hasSynced).toBeTruthy();
    });

    test("end", () => {
        const m = new Sync();
        m.syncEnd();

        expect(m.syncing).toBeFalsy();
        expect(m.startDate).toBeTruthy();
        expect(m.endDate).toBeTruthy();
        expect(m.hasSynced).toBeTruthy();
    });

    test("error", () => {
        const m = new Sync();
        m.syncStart();

        m.syncError({ message: "Test Error"});

        expect(m.syncing).toBeFalsy();
        expect(m.startDate).toBeTruthy();
        expect(m.endDate).toBeTruthy();
        expect(m.error).toBeTruthy();
        expect(m.error.message).toBe("Test Error");
    });
});
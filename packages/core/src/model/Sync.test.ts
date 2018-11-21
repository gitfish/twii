import { Sync, CompositeSync } from "./Sync";

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

    test("composite basic", () => {
        const m = new CompositeSync();
        const c1 = new Sync();
        c1.syncStart();
        m.addSync(c1);

        expect(c1.syncing).toBeTruthy();
        expect(m.syncing).toBeTruthy();

        c1.syncEnd();

        expect(c1.syncing).toBeFalsy();
        expect(m.syncing).toBeFalsy();
    });

    test("composite error", () => {
        const m = new CompositeSync();
        const c1 = new Sync();
        c1.syncStart();
        m.addSync(c1);

        expect(c1.syncing).toBeTruthy();
        expect(m.syncing).toBeTruthy();

        c1.syncError({ message: "Test Error"});

        expect(c1.error).toBeTruthy();
        expect(m.error).toBeTruthy();
    });
});
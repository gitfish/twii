import { SyncSupplier } from "./SyncSupplier";

describe("Sync Supplier Test", () => {
    test("default", async () => {
        const m = new SyncSupplier<string>();
        await m.load();
        expect(m.sync.hasSynced).toBeTruthy();
        expect(m.sync.error).toBeTruthy();
    });

    test("loader configured", async () => {
        const m = new SyncSupplier<string>();
        m.loader = () => {
            return Promise.resolve("Hello");
        };
        await m.load();
        expect(m.sync.hasSynced).toBeTruthy();
        expect(m.sync.error).toBeFalsy();
        expect(m.value).toBe("Hello");
    });

    test("default value", () => {
        const m = new SyncSupplier<string>();
        expect(m.value).toBeFalsy();
        m.defaultValue = "Default, Default, Default";
        expect(m.value).toBe("Default, Default, Default");
        m.value = "Not default";
        expect(m.value).toBe("Not default");
    });

    test("default value supplier", () => {
        const m = new SyncSupplier<string>();
        expect(m.value).toBeFalsy();
        m.defaultSupplier = () => { return "Default, Default, Default"; };
        expect(m.value).toBe("Default, Default, Default");
        m.value = "Not default";
        expect(m.value).toBe("Not default");
    });
});
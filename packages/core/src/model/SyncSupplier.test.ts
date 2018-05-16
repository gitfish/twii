import { SyncSupplier } from "./SyncSupplier";

describe("Sync Supplier Test", () => {
    test("all", () => {
        const m = new SyncSupplier<string>();
        expect(m.sync).toBeTruthy();
    });
});
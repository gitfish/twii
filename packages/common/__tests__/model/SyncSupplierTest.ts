import { SyncSupplier } from "model/SyncSupplier";

describe("Supplier Model", () => {
    test("all", () => {
        const m = new SyncSupplier<string>();
        expect(m.sync).toBeTruthy();
    });
});
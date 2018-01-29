import SyncSupplierModel from "common/model/SyncSupplierModel";

describe("Supplier Model", () => {
    test("all", () => {
        const m = new SyncSupplierModel<string>();
        expect(m.sync).toBeTruthy();
    });
});
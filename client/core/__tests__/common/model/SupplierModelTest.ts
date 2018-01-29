import SupplierModel from "common/model/SupplierModel";

describe("Supplier Model", () => {
    test("all", () => {
        const m = new SupplierModel<string>();
        m.value = "Test";

        expect(m.value).toBe("Test");

        m.clearValue();

        expect(m.value).toBeFalsy();
    });
});
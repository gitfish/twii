import { Supplier } from "model/Supplier";

describe("Supplier Model", () => {
    test("all", () => {
        const m = new Supplier<string>();
        m.value = "Test";

        expect(m.value).toBe("Test");

        m.clearValue();

        expect(m.value).toBeFalsy();
    });
});
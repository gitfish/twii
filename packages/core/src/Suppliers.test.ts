import * as Suppliers from "./Suppliers";

describe("Suppliers", () => {
    test("constant", () => {
        const s = Suppliers.constant("Milk");
        expect(s()).toBe("Milk");
        expect(s()).toBe("Milk");
    });

    test("alwaysTrue", () => {
        const s = Suppliers.alwaysTrue;

        expect(s()).toBeTruthy();
        expect(s()).toBeTruthy();
    });

    test("alwaysFalse", () => {
        const s = Suppliers.alwaysFalse;

        expect(s()).toBeFalsy();
        expect(s()).toBeFalsy();
    });

});
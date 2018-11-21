import { SearchRequestModel } from "./SearchRequestModel";

describe("Search Request Model Test", () => {
    test("simple", () => {
        const m = new SearchRequestModel();
        expect(m.isSpecified).toBeFalsy();
        m.searchString = "Hello";
        expect(m.searchString).toBe("Hello");
        expect(m.isSpecified).toBeTruthy();
        const data = m.data;
        expect(data.searchString).toBe("Hello");
    });
});
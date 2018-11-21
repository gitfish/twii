import * as SearchHighlightUtils from "./SearchHighlightUtils";

describe("Search Group Model Test", () => {
    test("isValueHighlighted", () => {
        let value = "Hello Joe";
        let highlights = ["${Hello} Joe"];
        expect(SearchHighlightUtils.isValueHighlighted(value, highlights)).toBeTruthy();

        highlights = ["${Nope}"];
        expect(SearchHighlightUtils.isValueHighlighted(value, highlights)).toBeFalsy();
    });

    test("findHighlight", () => {
        let value = "Hello Joe";
        let highlights = ["${Hello} Joe", "${Nope}"];
        const h = SearchHighlightUtils.findHighlight(value, highlights);
        expect(h).toBeTruthy();
        expect(h).toBe("${Hello} Joe");
    });
});
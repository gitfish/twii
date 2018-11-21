import SelectionModel from "./SelectionModel";

describe("SelectionModel", () => {
    test("selection", () => {
        const items = ["one", "two", "three"];
        const s = new SelectionModel<string>();
        s.setSelectedItems(items);

        expect(s.selectionCount).toBe(3);

        s.toggleItem(items[0]);

        expect(s.selectionCount).toBe(2);
        expect(items.length).toBe(3);
    });
});
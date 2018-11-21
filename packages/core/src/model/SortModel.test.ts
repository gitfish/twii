import SortModel from "./SortModel";

describe("SortStateModel", () => {
    test("sorting", () => {
        const sort = new SortModel();
        sort.setField("name");

        expect(sort.field).toBe("name");

        sort.setDescending(false);

        expect(sort.descending).toBeFalsy();

        sort.setDescending(true);

        expect(sort.descending).toBeTruthy();

        sort.setDescending(false);

        sort.toggleSort("name");

        expect(sort.descending).toBeTruthy();

        sort.toggleSort("name");

        expect(sort.descending).toBeFalsy();

        sort.toggleSort("address");

        expect(sort.field).toBe("address");
        expect(sort.descending).toBeFalsy();
    });
});
import { SearchGroupModel } from "./SearchGroupModel";

describe("Search Group Model Test", () => {
    test("group", () => {
        const m = new SearchGroupModel();
        expect(m.isSpecified).toBeFalsy();
        const g = m.addGroup({
            fields: [
                {
                    name: "firstName",
                    searchString: "Hello"
                }
            ]
        });
        expect(m.isSpecified).toBeTruthy();
        const data = m.data;
        expect(data.groups).toBeTruthy();
        expect(data.groups.length).toBe(1);
        expect(data.groups[0].fields.length).toBe(1);
        expect(data.groups[0].fields[0].name).toBe("firstName");
        expect(data.groups[0].fields[0].searchString).toBe("Hello");
        g.remove();
        expect(m.isSpecified).toBeFalsy();
    });
});
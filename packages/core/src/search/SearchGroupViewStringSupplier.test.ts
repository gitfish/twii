import { ISearchGroup } from "./ISearchGroup";
import { ISearchSchema } from "./ISearchSchema";
import { SearchGroupOperator } from "./SearchGroupOperator";
import { SearchGroupViewStringSupplier } from "./SearchGroupViewStringSupplier";

describe("Search Group View String Supplier", () => {
    test("basic", () => {
        const g : ISearchGroup = {
            fields: [
                {
                    name: "firstName",
                    searchString: "Sunburn"
                },
                {
                    name: "lastName",
                    searchString: "Slapper"
                }
            ]
        };
        const schema : ISearchSchema = {
            fields: [
                {
                    key: "firstName",
                    name: "First Name"
                },
                {
                    key: "lastName",
                    name: "Last Name",
                }
            ]
        };
        const s = new SearchGroupViewStringSupplier({
            group: g,
            schema: schema
        });

        expect(s.toString()).toBe("First Name:Sunburn AND Last Name:Slapper");
    });

    test("complex", () => {
        const g : ISearchGroup = {
            op: SearchGroupOperator.OR,
            groups: [
                {
                    op: SearchGroupOperator.AND,
                    fields: [
                        {
                            name: "firstName",
                            searchString: "Sunburn"
                        },
                        {
                            name: "lastName",
                            searchString: "Slapper"
                        }
                    ]
                },
                {
                    op: SearchGroupOperator.AND,
                    fields: [
                        {
                            name: "firstName",
                            searchString: "Last"
                        },
                        {
                            name: "lastName",
                            searchString: "Chance"
                        }
                    ]
                }
                
            ]
        };

        const schema : ISearchSchema = {
            fields: [
                {
                    key: "firstName",
                    name: "First Name"
                },
                {
                    key: "lastName",
                    name: "Last Name"
                }
            ]
        };

        const s = new SearchGroupViewStringSupplier({
            group: g,
            schema: schema
        });

        expect(s.toString()).toBe("(First Name:Sunburn AND Last Name:Slapper) OR (First Name:Last AND Last Name:Chance)");
    })
});
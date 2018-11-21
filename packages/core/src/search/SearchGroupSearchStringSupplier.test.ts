import { SearchGroupSearchStringSupplier } from "./SearchGroupSearchStringSupplier";
import { ISearchGroup } from "./ISearchGroup";
import { ISearchSchema, SearchSchemaFieldType } from "./ISearchSchema";
import { SearchGroupOperator } from "./SearchGroupOperator";
import { SearchOperator } from "./SearchOperator";

describe("Search Group Search String Supplier", () => {
    test("basic no schema", () => {
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
        const s = new SearchGroupSearchStringSupplier({
            group: g
        });

        expect(s.toString()).toBe("firstName:Sunburn AND lastName:Slapper");
    });

    test("basic with schema", () => {
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
                    name: "First Name",
                    searchFields: ["firstNameSearchy"]
                },
                {
                    key: "lastName",
                    name: "Last Name",
                    searchFields: ["lastNameSearchy"]
                }
            ]
        };
        const s = new SearchGroupSearchStringSupplier({
            group: g,
            schema: schema
        });

        expect(s.toString()).toBe("firstNameSearchy:Sunburn AND lastNameSearchy:Slapper");
    });

    test("complex no schema", () => {
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

        const s = new SearchGroupSearchStringSupplier({
            group: g
        });

        expect(s.toString()).toBe("(firstName:Sunburn AND lastName:Slapper) OR (firstName:Last AND lastName:Chance)");
    });

    test("complex with schema", () => {
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
                    name: "First Name",
                    searchFields: ["firstNameSearchy"],
                    toSearchString(value : string) {
                        return `<${value}>`;
                    }
                },
                {
                    key: "lastName",
                    name: "Last Name",
                    searchFields: ["lastNameSearchy"]
                }
            ]
        };

        const s = new SearchGroupSearchStringSupplier({
            group: g,
            schema: schema
        });

        expect(s.toString()).toBe("(firstNameSearchy:<Sunburn> AND lastNameSearchy:Slapper) OR (firstNameSearchy:<Last> AND lastNameSearchy:Chance)");
    });

    test("date", () => {
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
                        },
                        {
                            name: "dateOfBirth",
                            searchString: "01/01/2002"
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
                        },
                        {
                            name: "dateOfBirth",
                            searchString: "20 FEB 2003"
                        }
                    ]
                }
                
            ]
        };

        const schema : ISearchSchema = {
            fields: [
                {
                    key: "firstName",
                    name: "First Name",
                    searchFields: ["firstNameSearchy"],
                    toSearchString(value : string) {
                        return `<${value}>`;
                    }
                },
                {
                    key: "lastName",
                    name: "Last Name",
                    searchFields: ["lastNameSearchy"]
                },
                {
                    key: "dateOfBirth",
                    name: "Date of Birth",
                    type: SearchSchemaFieldType.date
                }
            ]
        };

        const s = new SearchGroupSearchStringSupplier({
            group: g,
            schema: schema
        });

        expect(s.toString()).toBe("(firstNameSearchy:<Sunburn> AND lastNameSearchy:Slapper AND dateOfBirth:2002-01-01) OR (firstNameSearchy:<Last> AND lastNameSearchy:Chance AND dateOfBirth:2003-02-20)");
    });

    test("date range", () => {
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
                        },
                        {
                            name: "dateOfBirth",
                            searchString: "01/01/1992 TO 01/01/2002",
                            operator: SearchOperator.between
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
                        },
                        {
                            name: "dateOfBirth",
                            searchString: "20 FEB 1993 TO 20 FEB 2003",
                            operator: SearchOperator.between
                        }
                    ]
                }
                
            ]
        };

        const schema : ISearchSchema = {
            fields: [
                {
                    key: "firstName",
                    name: "First Name",
                    searchFields: ["firstNameSearchy"],
                    toSearchString(value : string) {
                        return `<${value}>`;
                    }
                },
                {
                    key: "lastName",
                    name: "Last Name",
                    searchFields: ["lastNameSearchy"]
                },
                {
                    key: "dateOfBirth",
                    name: "Date of Birth",
                    type: SearchSchemaFieldType.date
                }
            ]
        };

        const s = new SearchGroupSearchStringSupplier({
            group: g,
            schema: schema
        });

        expect(s.toString()).toBe("(firstNameSearchy:<Sunburn> AND lastNameSearchy:Slapper AND dateOfBirth:[1992-01-01 TO 2002-01-01]) OR (firstNameSearchy:<Last> AND lastNameSearchy:Chance AND dateOfBirth:[1993-02-20 TO 2003-02-20])");
    })
});
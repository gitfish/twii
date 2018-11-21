import {
    mergeDedup,
    mergeAllDedup,
    deepEquality,
    stringConcatSimpleMergeStrategy
} from "./MergeUtils";

describe("Merge Utils Test", () => {

    test("deep equals", () => {
        const a = {
            title: "Sunburn Slapper",
            names: ["Sunburn", "Slapper"],
            info: {
                heightInCm: 192
            },
            history: [
                {
                    id: 1,
                    comment: "Hello"
                }
            ]
        };
        const b = {
            title: "Sunburn Slapper",
            names: ["Sunburn", "Slapper"],
            info: {
                heightInCm: 192
            },
            history: [
                {
                    id: 1,
                    comment: "Hello"
                }
            ]
        };

        expect(deepEquality(a, b)).toBeTruthy();

        b.title = "Sunburn Soother";

        expect(deepEquality(a, b)).toBeFalsy();
    });
    
    test("Object Merge default", () => {
        const a = {
            title: "Sunburn Slapper",
            names: ["Sunburn", "Slapper"],
            info: {
                heightInCm: 192
            },
            history: [
                {
                    id: 1,
                    comment: "Hello"
                }
            ]
        };
        const b = {
            names: ["Sunburn", "Soother"],
            info: {
                heightInCm: 192
            },
            history: [
                {
                    id: 1,
                    comment: "Hello"
                }
            ]
        };
        const r = mergeDedup(a, b);

        expect(r.title).toBe("Sunburn Slapper");

        expect(r.names.length).toBe(3);

        expect(r.names.filter(n => n === "Sunburn").length).toBe(1);
        expect(r.names.filter(n => n === "Slapper").length).toBe(1);
        expect(r.names.filter(n => n === "Soother").length).toBe(1);

        expect(r.info).toBeTruthy();

        expect(r.info.heightInCm).toBe(192);

        // without deep equality, array will be merged in 2
        expect(r.history.length).toBe(2);
        expect(r.history[0].id).toBe(1);
        expect(r.history[1].id).toBe(1);
    })

    test("Object merge with deep equals", () => {
        const a = {
            title: "Sunburn Slapper",
            names: ["Sunburn", "Slapper"],
            info: {
                heightInCm: 192
            },
            history: [
                {
                    id: 1,
                    comment: "Hello"
                }
            ]
        };
        const b = {
            names: ["Sunburn", "Soother"],
            info: {
                heightInCm: 192
            },
            history: [
                {
                    id: 1,
                    comment: "Hello"
                }
            ]
        };
        const r = mergeDedup(a, b, { eq: deepEquality });

        expect(r.title).toBe("Sunburn Slapper");

        expect(r.names.length).toBe(3);

        expect(r.names.filter(n => n === "Sunburn").length).toBe(1);
        expect(r.names.filter(n => n === "Slapper").length).toBe(1);
        expect(r.names.filter(n => n === "Soother").length).toBe(1);

        expect(r.info).toBeTruthy();

        expect(r.info.heightInCm).toBe(192);

        // with deep equality, our history entry should be merged
        expect(r.history.length).toBe(1);
    });

    test("Merge All with defaults", () => {
        const values = [
            {
                title: "Sunburn Slapper",
                names: ["Sunburn", "Slapper"],
                info: {
                    heightInCm: 192
                },
                history: [
                    {
                        id: 1,
                        comment: "Hello"
                    }
                ]
            },
            {
                names: ["Sunburn", "Soother"],
                info: {
                    heightInCm: 192
                },
                history: [
                    {
                        id: 1,
                        comment: "Hello"
                    }
                ]
            }
        ];

        const r = mergeAllDedup(values);

        expect(r.title).toBe("Sunburn Slapper");

        expect(r.names.length).toBe(3);

        expect(r.names.filter(n => n === "Sunburn").length).toBe(1);
        expect(r.names.filter(n => n === "Slapper").length).toBe(1);
        expect(r.names.filter(n => n === "Soother").length).toBe(1);

        expect(r.info).toBeTruthy();

        expect(r.info.heightInCm).toBe(192);

        // without deep equality, array will be merged in 2
        expect(r.history.length).toBe(2);
        expect(r.history[0].id).toBe(1);
        expect(r.history[1].id).toBe(1);
    });

    test("Deep Merging default", () => {
        const a = {
            yet: {
                id: 1,
                another: {
                    id: 2,
                    object: {
                        id: 3
                    }
                }
            }
        };
        const b = {
            yet: {
                id: 1,
                another: {
                    id: 2,
                    object: {
                        id: 3,
                        lives: {
                            id: 4,
                            here: {
                                id: 5
                            }
                        }
                    }
                }
            }
        };

        const r = mergeDedup(a, b);
        expect(r.yet.id).toBe(1);
        expect(r.yet.another.id).toBe(2);
        expect(r.yet.another.object.id).toBe(3);
        expect(r.yet.another.object.lives.id).toBe(4);
        expect(r.yet.another.object.lives.here.id).toBe(5);
    });

    test("String merge strategy", () => {
        const a = {
            firstName: "Sunburn",
            lastName: "Slapper"
        };
        const b = {
            firstName: "Sunburn",
            lastName: "Soother"
        };
        const r = mergeDedup(a, b, { simpleMergeStrategy: stringConcatSimpleMergeStrategy(":")});
        expect(r.firstName).toBe("Sunburn");
        expect(r.lastName).toBe("Slapper:Soother");
    });
});
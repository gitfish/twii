import { not, and, or } from "Predicates";

describe("Predicates", () => {
    test("not", () => {
        const pr = (item) => {
            return item && item.indexOf("woo") >= 0 ? true : false;
        };

        const items = ["blue woo", "big bar", "can chun", "not cool", "red woo"];

        let r = items.filter(pr);

        expect(r.length).toBe(2);
        expect(r[0]).toBe("blue woo");
        expect(r[1]).toBe("red woo");

        const npr = not(pr);

        r = items.filter(npr);

        expect(r.length).toBe(3);
        expect(r[0]).toBe("big bar");
        expect(r[1]).toBe("can chun");
        expect(r[2]).toBe("not cool");
    });

    test("and", () => {
        const pr1 = (item) => {
            return item && item.indexOf("woo") >= 0 ? true : false;
        };
        const pr2 = (item) => {
            return item && item.indexOf("bar") >= 0 ? true : false;
        };
        const pr = and(pr1, pr2);

        const items = ["blue woo", "big bar", "can chun", "not cool", "red woo", "woo bar"];

        const r = items.filter(pr);

        expect(r.length).toBe(1);
        expect(r[0]).toBe("woo bar");
    });

    test("or", () => {
        const pr1 = (item) => {
            return item && item.indexOf("woo") >= 0 ? true : false;
        };
        const pr2 = (item) => {
            return item && item.indexOf("bar") >= 0 ? true : false;
        };
        const pr = or(pr1, pr2);

        const items = ["blue woo", "big bar", "can chun", "not cool", "red woo", "woo bar"];

        const r = items.filter(pr);

        expect(r.length).toBe(4);
        expect(r[0]).toBe("blue woo");
        expect(r[1]).toBe("big bar");
        expect(r[2]).toBe("red woo");
        expect(r[3]).toBe("woo bar");
    });

});
import { useless } from "./Consumers";
import { IConsumerFunc } from "./IConsumerFunc";

describe("Consumers", () => {
    test("useless", () => {
        const items = ["blue woo", "big bar", "can chun", "not cool", "red woo"];

        let r = items.forEach(useless);
    });

    test("IConsumer", () => {
        const r : any[] = [];
        const c : IConsumerFunc = (item, idx) => {
            r.push({ item: item, idx: idx });
        };
        const items = ["blue woo", "big bar", "can chun", "not cool", "red woo"];
        items.forEach(c);

        expect(r.length).toBe(items.length);
        expect(r[0].item).toBe("blue woo");
        expect(r[0].idx).toBe(0);
    });
});
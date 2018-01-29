import { TransientStorageService } from "common/service/TransientStorageService";
import { ChainedStorageService } from "common/service/ChainedStorageService";

describe("ChainedStorageService", () => {
    test("getItem", async () => {
        const transient1 = new TransientStorageService();
        const transient2 = new TransientStorageService();
        const transient3 = new TransientStorageService();
        transient3.items.test = { one: 1, two: 2 };
        expect(transient3.items.test.one).toBe(1);
        expect(transient3.items.test.two).toBe(2);
        const chained = new ChainedStorageService([transient1, transient2, transient3]);
        const result = await chained.getItem("test");
        expect(result).toBe(transient3.items.test);
        expect(transient2.items.test).toBe(transient3.items.test);
        expect(transient1.items.test).toBe(transient3.items.test);
    });
    test("setItem", async () => {
        const transient1 = new TransientStorageService();
        const transient2 = new TransientStorageService();
        const transient3 = new TransientStorageService();
        const chained = new ChainedStorageService([transient1, transient2, transient3]);
        const item = { woo: "hoo" };
        await chained.setItem("test", item);
        expect(transient1.items.test).toBe(item);
        expect(transient2.items.test).toBe(item);
        expect(transient3.items.test).toBe(item);
    });
});
import { ListModel } from "./ListModel";

describe("List Model", () => {
    test("default instance", async () => {
        const list = new ListModel();
        await list.load();
        expect(list.sync.error).toBeTruthy();
    });

    test("loader configured", async () => {
        const list = new ListModel<{ id: number }>();
        list.loader = () => {
            return Promise.resolve([
                {
                    id: 1
                },
                {
                    id: 2
                },
                {
                    id: 3
                }
            ])
        };
        await list.load();
        expect(list.sync.hasSynced).toBeTruthy();
        expect(list.sync.syncing).toBeFalsy();
        expect(list.sync.error).toBeFalsy();
        expect(list.items).toBeTruthy();
        expect(list.items.length).toBe(3);
        expect(list.itemsView.length).toBe(3);
        expect(Array.isArray(list.itemsView)).toBeTruthy();
        expect(list.itemsView[0].id).toBe(1);
        expect(list.itemsView[1].id).toBe(2);
        expect(list.itemsView[2].id).toBe(3);

        list.clear();
        expect(list.itemsView.length).toBe(0);
        expect(list.sync.syncing).toBeFalsy();
        expect(list.sync.hasSynced).toBeFalsy();
    });
});
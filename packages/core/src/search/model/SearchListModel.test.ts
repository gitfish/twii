import { SearchListModel } from "./SearchListModel";
import { ISearchResponse } from "../ISearchResponse";
import { Context } from "../../Context";
import { ISearchService } from "../service/ISearchService";
import { ISearchRequest } from "../ISearchRequest";

describe("Search List Model Test", () => {
    test("simple", async () => {
        const m = new SearchListModel();
        m.service = {
            search(request) {
                const r : ISearchResponse = {
                    total: 20,
                    results: [
                        {
                            id: 1,
                            firstName: "Sunburn",
                            lastName: "Slapper"
                        },
                        {
                            id: 2,
                            firstName: "Poor",
                            lastName: "Execution"
                        }
                    ]
                };
                return Promise.resolve(r);
            }
        };
        await m.submit(null);
        // without any search parameters set, a search wouldn't be performed
        expect(m.sync.hasSynced).toBeFalsy();
        expect(m.value.length).toBe(0);

        // set some search parameters
        await m.submit({
            searchString: "Sunburn"
        });
        expect(m.sync.hasSynced).toBeTruthy();
        expect(m.total).toBe(20);
        expect(m.items.length).toBe(2);
    });

    test("with service supplier", async () => {
        const m = new SearchListModel();
        const serviceContext = new Context<ISearchService>();
        serviceContext.value = {
            search(request) {
                const r : ISearchResponse = {
                    total: 20,
                    results: [
                        {
                            id: 1,
                            firstName: "Sunburn",
                            lastName: "Slapper"
                        },
                        {
                            id: 2,
                            firstName: "Poor",
                            lastName: "Execution"
                        }
                    ]
                };
                return Promise.resolve(r);
            }
        };
        m.serviceSupplier = serviceContext;

        // set some search parameters
        await m.submit({
            searchString: "Sunburn"
        });
        expect(m.sync.hasSynced).toBeTruthy();
        expect(m.total).toBe(20);
        expect(m.items.length).toBe(2);
    });
});
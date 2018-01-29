import * as React from "react";
import * as ReactTestRenderer from "react-test-renderer";
import { AppContainer, IAppContainer } from "app/component/App";
import { AppHostContainer } from "app/component/AppHost";
import { AppHost } from "fenz-core/lib/app/AppHost";
import { Router } from "roota/lib/Router";
import { toPromise } from "fenz-core/lib/common/SyncUtils";

describe("App Container Component", () => {
    test("render", async () => {
        const router = new Router();
        router.use("/test/woo", () => {
            return "Test Woo";
        });
        
        let r = ReactTestRenderer.create(
            <AppContainer path="/test/woo" router={router} />
        );

        const instance = r.getInstance();

        const host = instance.host;

        expect(host).toBeTruthy();
        expect(host.path).toBe("/test/woo");

        await toPromise(host.sync);

        r = ReactTestRenderer.create(
            <AppHostContainer host={host} />
        );

        const out = r.toJSON();

        expect(out).toBe("Test Woo");
    });
});
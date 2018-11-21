import * as React from "react";
import * as ReactTestRenderer from "react-test-renderer";
import { AppHostContainer } from "./AppHost";
import { AppHost } from "../model/AppHost";
import { Router } from "../Router";
import { toPromise } from "../SyncUtils";

describe("App Host Container Component", () => {
    test("render", async () => {
        const router = new Router();
        router.use("/test/woo", () => {
            return "Test Woo";
        });
        const host = new AppHost();
        host.defaultRequest = { path: "/test/woo" };
        host.router = router;
        let r = ReactTestRenderer.create(
            <AppHostContainer host={host} noLoadOnMount={true} />
        );
        const instance = r.getInstance();

        let out = r.toJSON();
        console.log("-- Out: " + out);

        host.load();
        await toPromise(host.sync);

        r = ReactTestRenderer.create(
            <AppHostContainer host={host} noLoadOnMount={true} />
        );

        out = r.toJSON();
        console.log("-- Out: " + out);
    });
});
import * as React from "react";
import * as ReactTestRenderer from "react-test-renderer";
import { AppContainer } from "./App";
import { AppHostContainer } from "./AppHost";
import { Router } from "@twii/router/lib/Router";
import { toPromise } from "@twii/core/lib/SyncUtils";

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
        console.log("-- Out: " + out);
    });
});
import * as React from "react";
import * as ReactTestRenderer from "react-test-renderer";
import { AppHostWrapper } from "app/component/AppHostWrapper";
import { AppHost } from "fenz-core/lib/app/AppHost";
import { BrowserAppHost } from "fenz-core/lib/app/BrowserAppHost";
import { IRequest } from "roota/lib/IRequest";
import { Router } from "roota/lib/Router";

describe("App Host Wrapper Component", () => {
    test("render", () => {
        const router = new Router();
        router.use("/test/woo", () => {
            return "Test Woo";
        });
        const host = new AppHost();
        host.setRequest({ path: "/test/woo" });
        host.router = router;

        let r = ReactTestRenderer.create(
            <AppHostWrapper host={host} />
        );
        let out = r.toJSON();
        console.log("-- App Wrapper " + JSON.stringify(out));
    });

    test("render root", () => {
        const router = new Router();
        router.use("/test/woo", () => {
            return "Test Woo";
        });
        const host = new BrowserAppHost();
        host.setRequest({ path: "/test/woo" });
        host.router = router;

        let r = ReactTestRenderer.create(
            <AppHostWrapper host={host} />
        );
        let out = r.toJSON();
        console.log("-- Root App Wrapper " + JSON.stringify(out));
    });
});
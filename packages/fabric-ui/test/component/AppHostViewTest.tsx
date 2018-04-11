import * as React from "react";
import * as ReactTestRenderer from "react-test-renderer";
import { AppHostView } from "component/AppHostView";
import { AppHost } from "model/AppHost";
import { BrowserAppHost } from "model/BrowserAppHost";
import { IRequest } from "@pu/router/lib/IRequest";
import { Router } from "@pu/router/lib/Router";

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
            <AppHostView host={host} />
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
            <AppHostView host={host} />
        );
        let out = r.toJSON();
        console.log("-- Root App Wrapper " + JSON.stringify(out));
    });
});
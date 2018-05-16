import * as React from "react";
import * as ReactTestRenderer from "react-test-renderer";
import { HostAppView } from "./HostAppView";
import { AppHost } from "@twii/core/lib/model/AppHost";
import { BrowserAppHost } from "@twii/core/lib/model/BrowserAppHost";
import { IRequest } from "@twii/router/lib/IRequest";
import { Router } from "@twii/router/lib/Router";

describe("Host App View Component", () => {
    test("render", () => {
        const router = new Router();
        router.use("/test/woo", () => {
            return "Test Woo";
        });
        const host = new AppHost();
        host.defaultRequest = { path: "/test/woo" };
        host.router = router;

        let r = ReactTestRenderer.create(
            <HostAppView host={host} />
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
        host.request = { path: "/test/woo" };
        host.router = router;

        let r = ReactTestRenderer.create(
            <HostAppView host={host} />
        );
        let out = r.toJSON();
        console.log("-- Root App Wrapper " + JSON.stringify(out));
    });
});
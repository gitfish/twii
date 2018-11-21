import * as React from "react";
import * as ReactTestRenderer from "react-test-renderer";
import { HostAppView } from "./HostAppView";
import { AppHost } from "../model/AppHost";
import { BrowserAppHost } from "../model/BrowserAppHost";
import { Router } from "../Router";
import { JSDOM } from "jsdom";

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
        const dom = new JSDOM();
        dom.reconfigure({ url: "http://woo/test/woo" });
        router.use("/test/woo", () => {
            return "Test Woo";
        });
        const host = new BrowserAppHost();
        host.window = dom.window;

        host.request = { path: "/test/woo" };
        host.router = router;

        let r = ReactTestRenderer.create(
            <HostAppView host={host} />
        );
        let out = r.toJSON();
        console.log("-- Root App Wrapper " + JSON.stringify(out));
    });
});
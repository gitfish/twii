import { BrowserAppHost, globalWindowAppHostResolver } from "app/BrowserAppHost";
import { Router } from "roota/lib/Router";
import * as qs from "qs";
import { JSDOM } from "jsdom";

describe("Browser App Host", () => {
    test("default path and params", () => {
        const host = new BrowserAppHost();
        const dom = new JSDOM();
        dom.reconfigure({ url: "http://woo/not/ready/for/this?one=1&two=2" });
        host.window = dom.window;
        
        expect(host.path).toBe("/not/ready/for/this");
        expect(host.params.one).toBe("1");
        expect(host.params.two).toBe("2");
    });

    test("getUrl()", () => {
        const host = new BrowserAppHost();
        const dom = new JSDOM();
        dom.reconfigure({ url: "http://woo/dodgy/route/c" });
        host.window = dom.window;

        let url = host.getUrl({ path: "/route/a" });

        expect(url).toBe("/route/a");

        url = host.getUrl({ path: "/route/b", query: { value: "1" } });

        expect(url).toBe("/route/b?value=1");
        
        url = host.getUrl({ query: { value: "2" } });

        expect(url).toBe("/dodgy/route/c?value=2");
    });

    test("load", async () => {
        const host = new BrowserAppHost();
        const dom = new JSDOM();
        dom.reconfigure({ url: "http://woo/not/ready/for/this.html" });
        host.window = dom.window;
        const router = new Router();
        router.use("/not/ready/for/this", (req, res) => {
            return "notReadyForThis";
        });
        router.use("/not/ready/for/that", (req, res) => {
            return "notReadyForThat";
        });
        host.router = router;

        expect(host.initialized).toBeFalsy();

        await host.load();
        expect(host.initialized).toBeTruthy();
        expect(host.extension).toBe(".html");
        expect(host.view).toBe("notReadyForThis");

        await host.load({ path: "/not/ready/for/that" });
        expect(host.path).toBe("/not/ready/for/that");
        expect(host.view).toBe("notReadyForThat");
        expect(host.window.location.href).toBe("http://woo/not/ready/for/that.html");
    });

    test("basePath", async () => {
        const host = new BrowserAppHost();
        const dom = new JSDOM();
        dom.reconfigure({ url: "http://woo/blimey/not/ready/for/this.action" });
        host.window = dom.window;
        host.basePath = "/blimey";
        const router = new Router();
        router.use("/not/ready/for/this", (req, res) => {
            return "notReadyForThis";
        });
        router.use("/not/ready/for/that", (req, res) => {
            return "notReadyForThat";
        });
        host.router = router;

        const url = host.getUrl({ path: "/big/carrot" });
        expect(url).toBe("/blimey/big/carrot");
        
        expect(host.initialized).toBeFalsy();

        await host.load();
        expect(host.initialized).toBeTruthy();
        expect(host.extension).toBe(".action");
        expect(host.view).toBe("notReadyForThis");

        await host.load({ path: "/not/ready/for/that" });
        expect(host.path).toBe("/not/ready/for/that");
        expect(host.view).toBe("notReadyForThat");
        expect(host.window.location.href).toBe("http://woo/blimey/not/ready/for/that.action");
    });

    test("emit event", () => {
        const host = new BrowserAppHost();
        const dom = new JSDOM();
        dom.reconfigure({ url: "http://woo/blimey/not/ready/for/this.action" });
        host.window = dom.window;
        host.basePath = "/blimey";
        
        let resized = false;

        host.addEventListener("resize", () => {
            resized = true;
        });

        const resizeEvent = host.window.document.createEvent("Event");
        resizeEvent.initEvent("resize", true, true);

        host.emit(resizeEvent);

        expect(resized).toBeTruthy();
    });

    test("open", async () => {
        const host = new BrowserAppHost();
        const dom = new JSDOM();
        dom.reconfigure({ url: "http://woo/blimey/not/ready/for/this.action" });
        host.window = dom.window;
        host.window.open = (url, windowName, windowFeatures) => {
            const newDom = new JSDOM();
            newDom.reconfigure({ url: `http://woo${url}` });
            return newDom.window;
        };
        host.basePath = "/blimey";

        host.windowAppHostResolver = (window : Window) => {
            const r = new BrowserAppHost();
            r.window = window;
            return r;
        };

        const router = new Router();
        router.use("/not/ready/for/this", (req, res) => {
            return "notReadyForThis";
        });

        host.router = router;

        await host.load();

        const newHost = await host.open({ path: "i/know/how/to/eat" });

        expect(newHost).toBeTruthy();
        expect(newHost.window).toBeTruthy();

        expect(newHost.window.location.href).toBe("http://woo/blimey/i/know/how/to/eat.action")
    });

    test("global app host resolve", async () => {
        const dom = new JSDOM();
        const window = dom.window;

        const globalAppHostKey = "_TEST_APP_HOST_";

        const windowAppHostResolver = globalWindowAppHostResolver(globalAppHostKey, 120, 720);

        setTimeout(() => {
            window[globalAppHostKey] = new BrowserAppHost();
        }, 480);

        const r = await windowAppHostResolver(window);

        expect(r).toBeTruthy();
    });
});
import { AppHost } from "./AppHost";
import { Router } from "@twii/router/lib/Router";
import * as qs from "qs";

describe("App Host", () => {
    test("default path and params", () => {
        const host = new AppHost();
        expect(host.path).toBeFalsy();
        expect(Object.keys(host.params).length).toBe(0);
    });

    test("getUrl()", () => {
        const host = new AppHost();

        let url = host.getUrl({ path: "/route/a" });

        expect(url).toBe("/route/a");

        url = host.getUrl({ path: "/route/b", query: { value: "1" } });

        expect(url).toBe("/route/b?value=1");
        
        url = host.getUrl({ query: { value: "2" } });

        expect(url).toBe("?value=2");
    });

    test("load", async () => {
        const host = new AppHost();
        const router = new Router();
        router.use("/not/ready/for/this", (req, res) => {
            return "notReadyForThis" + (req.params.name || "");
        });
        router.use("/not/ready/for/that", (req, res) => {
            return "notReadyForThat";
        });
        host.router = router;
        host.setDefaultRequest({ path: "/not/ready/for/this"});
        expect(host.initialized).toBeFalsy();

        await host.load();
        expect(host.initialized).toBeTruthy();
        expect(host.view).toBe("notReadyForThis");

        await host.load({ path: "/not/ready/for/that" });
        expect(host.path).toBe("/not/ready/for/that");
        expect(host.view).toBe("notReadyForThat");

        await host.load({ path: "/not/ready/for/this", query: { name: "Woo" } });
        expect(host.path).toBe("/not/ready/for/this");
        expect(host.view).toBe("notReadyForThisWoo");
        expect(host.query.name).toBe("Woo");
        expect(host.params.name).toBe("Woo");
    });

    test("emit event", () => {
        const host = new AppHost();
        
        let resized = false;

        host.addEventListener("resize", () => {
            resized = true;
        });

        host.emit({ type: "resize" });

        expect(resized).toBeTruthy();
    });

    test("open", async () => {
        const host = new AppHost();
        const router = new Router();
        router.use("/not/ready/for/this", (req, res) => {
            return "notReadyForThis";
        });
        router.use("/not/ready/for/that", (req, res) => {
            return "notReadyForThat";
        });
        host.setRouter(router);

        // no launcher configured - defaults back to load
        await host.open({ path: "/not/ready/for/that" });

        expect(host.view).toBe("notReadyForThat");

        // configure an app launcher
        host.launcher = (request) => {
            const newHost = new AppHost();
            newHost.setId("test-new");
            newHost.router = router;
            newHost.load(request);
            return newHost;
        };
        
        const newHost = await host.open({ path: "/not/ready/for/that" });
        expect(newHost).toBeTruthy();
        expect(newHost.id).toBe("test-new");
    });

    test("default router", async () => {
        const host = new AppHost();
        const router = new Router();
        router.use("/not/ready/for/this", (req, res) => {
            return "notReadyForThis";
        });
        router.use("/not/ready/for/that", (req, res) => {
            return "notReadyForThat";
        });
        host.setRouter(router);

        host.setDefaultRequest({ path: "/not/ready/for/this"});
        expect(host.initialized).toBeFalsy();

        await host.load();
        expect(host.initialized).toBeTruthy();
        expect(host.view).toBe("notReadyForThis");

        await host.load({ path: "/not/ready/for/that" });
        expect(host.path).toBe("/not/ready/for/that");
        expect(host.view).toBe("notReadyForThat");
    });
});
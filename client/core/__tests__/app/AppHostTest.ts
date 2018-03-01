import { AppHost } from "app/AppHost";
import { AppRouterContext } from "app/AppRouterContext";
import { Router } from "roota/lib/Router";
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
        host.setRequest({ path: "/not/ready/for/this"});
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

        const newHost = await host.open({ path: "/not/ready/for/that" });

        expect(newHost).toBeTruthy();
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
        AppRouterContext.value = router;

        expect(host.router).toBe(AppRouterContext.value);

        host.setRequest({ path: "/not/ready/for/this"});
        expect(host.initialized).toBeFalsy();

        await host.load();
        expect(host.initialized).toBeTruthy();
        expect(host.view).toBe("notReadyForThis");

        await host.load({ path: "/not/ready/for/that" });
        expect(host.path).toBe("/not/ready/for/that");
        expect(host.view).toBe("notReadyForThat");
    });
});
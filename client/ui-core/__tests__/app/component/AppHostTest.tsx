import * as React from "react";
import * as ReactTestRenderer from "react-test-renderer";
import { AppHostContainer } from "@twii/ui-core/lib/app/component/AppHost";
import { AppHost } from "@twii/core/lib/app/AppHost";
import { Router } from "roota/lib/Router";
import { toPromise } from "@twii/core/lib/common/SyncUtils";

describe("App Host Container Component", () => {
    test("render", async () => {
        const router = new Router();
        router.use("/test/woo", () => {
            return "Test Woo";
        });
        const host = new AppHost();
        host.setRequest({ path: "/test/woo" });
        host.router = router;
        const defaultStateRenderer = () => {
            return "Default State";
        };
        let r = ReactTestRenderer.create(
            <AppHostContainer host={host} noLoadOnMount={true} onRenderDefault={defaultStateRenderer} />
        );
        const instance = r.getInstance();

        let out = r.toJSON();
        expect(out).toBe("Default State");

        host.load();
        await toPromise(host.sync);

        r = ReactTestRenderer.create(
            <AppHostContainer host={host} noLoadOnMount={true} onRenderDefault={defaultStateRenderer} />
        );

        out = r.toJSON();
        expect(out).toBe("Test Woo");
    });
});
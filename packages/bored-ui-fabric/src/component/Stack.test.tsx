import * as ReactTestUtils from "react-dom/test-utils";
import { Dashboard } from "@twii/bored/lib/model/Dashboard";
import { Stack } from "@twii/bored/lib/model/Stack";
import { Window } from "@twii/bored/lib/model/Window";
import { MockPortalManager } from "@twii/bored/lib/model/MockPortal";

describe("Stack View Test", () => {
    test("Basic Stack Rendering", () => {
        const portalManager = new MockPortalManager();
        const dashboard = new Dashboard();
        dashboard.portalManager = portalManager;
        const m = new Stack();
        const w1 = new Window();
        w1.path = "/test1";
        const w2 = new Window();
        w2.path = "/test2";
    });
});
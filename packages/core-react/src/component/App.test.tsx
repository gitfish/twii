import * as React from "react";
import * as ReactTestRenderer from "react-test-renderer";
import { AppContainer } from "./App";
import { Router } from "@twii/router/lib/Router";

describe("App Container Component", () => {
    test("render", async () => {
        const router = new Router();
        router.use("/test/woo", () => {
            return "Test Woo";
        });
        
        let r = ReactTestRenderer.create(
            <AppContainer request={{ path: "/test/woo" }} router={router} />
        );

        const out = r.toJSON();
        console.log("-- Out: " + out);
    });
});
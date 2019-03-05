import * as React from "react";
import * as ReactTestRenderer from "react-test-renderer";
import { AppView } from "./AppView";

describe("App View Component", () => {
    test("render", () => {
        let r = ReactTestRenderer.create(
            <AppView />
        );
        let out = r.toJSON();
        console.log("-- App Wrapper " + JSON.stringify(out));
    });
});
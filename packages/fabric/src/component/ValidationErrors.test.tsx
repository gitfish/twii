import * as React from "react";
import ValidationErrors from "./ValidationErrors";
import * as Renderer from "react-test-renderer/shallow";

describe("Validation Errors Component", () => {
    test("no render", () => {
        const r = new Renderer();
        r.render(
            <ValidationErrors />
        );
        // TODO: assertions
    });
    test("render", () => {
        const r = new Renderer();
        r.render(
            <ValidationErrors errors={[
                {
                    code: "woo",
                    message: "Woo"
                },
                {
                    code: "poo",
                    message: "Poo",
                    prop: "poo",
                    propTitle: "Poo"
                }
            ]} />
        );
        // TODO: assertions
    });
});
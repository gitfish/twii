import * as React from "react";
import * as ReactTestRenderer from "react-test-renderer";
import { Error } from "component/Error";

describe("Error Component", () => {
    test("render", () => {
        const error = {
            message: "A sample error message",
            code: "TEST_ERROR",
            stack: "stack"
        };
        let r = ReactTestRenderer.create(
            <Error error={error} />
        );
        let out = r.toJSON();
        console.log("-- Error " + JSON.stringify(out));
    });
});
import * as React from "react";
import { reactRouter } from "./index";

const TestComp = () => {
    return (
        <div>
            Test
        </div>
    );
}

describe("React router", () => {
    test("router", () => {
        const router = reactRouter(() => TestComp);
        const result = router({});
        console.log(`-- Result: ${result}`);
    });
});
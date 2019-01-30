import * as React from "react";
import MomentField from "./MomentField";
import * as Renderer from "react-test-renderer/shallow";
import * as moment from "moment";

describe("Moment Field", () => {
    test("default state", () => {
        const r = new Renderer();
        r.render(<MomentField />);
        // TODO: assertions
    });
    test("moment specified state", () => {
        const r = new Renderer();
        r.render(<MomentField value={moment()} />);
        // TODO: assertions
    });
});
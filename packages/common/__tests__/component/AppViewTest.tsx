import * as React from "react";
import * as ReactTestRenderer from "react-test-renderer";
import { AppView, IAppViewMenuProps } from "component/AppView";
import { IRequest } from "roota/lib/IRequest";

describe("App View Component", () => {
    test("render", () => {
        const menuProps : IAppViewMenuProps = {

        };
        let r = ReactTestRenderer.create(
            <AppView menuProps={menuProps} />
        );
        let out = r.toJSON();
        console.log("-- App Wrapper " + JSON.stringify(out));
    });
});
import * as React from "react";
import * as ReactTestRenderer from "react-test-renderer";
import { AppWrapper } from "app/component/AppWrapper";
import { IRequest } from "roota/lib/IRequest";

describe("App Wrapper Component", () => {
    test("render", () => {
        const items : IRequest[] = [
            {
                path: "/test/a"
            },
            {
                path: "/test/b"
            }
        ];
        const farItems : IRequest[] = [
            {
                path: "/test/c"
            }
        ];
        const onRenderBrand = () => {
            return "Test Brand";
        }
        let r = ReactTestRenderer.create(
            <AppWrapper items={items} farItems={farItems} onRenderBrand={onRenderBrand} title="Testicle" className="test-wrapper" headerClassname="test-wrapper-header" mainClassname="test-wrapper-main" />
        );
        let out = r.toJSON();
        console.log("-- App Wrapper " + JSON.stringify(out));
    });
});
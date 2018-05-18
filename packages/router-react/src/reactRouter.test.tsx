import * as React from "react";
import * as ReactTestUtils from 'react-dom/test-utils';
import { Router } from "@twii/router/lib/Router";
import { IRequest } from "@twii/router/lib/IRequest";
import { reactRouter } from "./reactRouter";

class Sample extends React.Component<{ match: IRequest }, any> {
    get match() {
        return this.props.match;
    }
    render() {
        return <div>Path: {this.props.match.path}</div>;
    }
}

describe("React Router test", () => {
    test("default export", async () => {
        const importer = () => {
            return {
                default: Sample
            };
        };
        const r = new Router();
        r.use("/sample/:num", reactRouter(importer));
        const view = await r.handleRequest({ path: "/sample/1", query: { test: "y"} });
        const comp = ReactTestUtils.renderIntoDocument(view) as Sample;

        expect(comp.match.path).toBe("/sample/1");
        expect(comp.match.params.num).toBe("1");
        expect(comp.match.query.test).toBe("y");
    });

    test("named export", async () => {
        const importer = () => {
            return {
                poo: Sample
            };
        };
        const r = new Router();
        r.use("/sample/:num", reactRouter(importer, { exportKey: "poo" }));
        r.use("/fail", reactRouter(importer));
        let view = await r.handleRequest({ path: "/sample/1", query: { test: "y" }});
        const comp = ReactTestUtils.renderIntoDocument(view) as Sample;

        expect(comp.match.path).toBe("/sample/1");
        expect(comp.match.params.num).toBe("1");
        expect(comp.match.query.test).toBe("y");

        let error;
        try {
            view = await r.handleRequest({ path: "/fail" });
        } catch(e) {
            error = e;
        }

        expect(error).toBeTruthy();
    });

    test("inexact matching", async () => {
        const importer = () => {
            return {
                default: Sample
            };
        };
        const r = new Router();
        r.use("/sample/:num", reactRouter(importer, { exact: false }));
        let view = await r.handleRequest({ path: "/sample/1", query: { test: "y"} });
        let comp = ReactTestUtils.renderIntoDocument(view) as Sample;

        expect(comp.match.path).toBe("/sample/1");
        expect(comp.match.params.num).toBe("1");
        expect(comp.match.query.test).toBe("y");

        view = await r.handleRequest({ path: "/sample/1/poo" });
        comp = ReactTestUtils.renderIntoDocument(view) as Sample;
        expect(comp.match.path).toBe("/sample/1/poo");
        expect(comp.match.params.num).toBe("1");
    });
});
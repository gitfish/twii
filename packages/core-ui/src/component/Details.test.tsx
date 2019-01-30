import * as React from "react";
import { IContextualMenuItem } from "office-ui-fabric-react/lib/ContextualMenu";
import Details from "./Details";
import * as Renderer from "react-test-renderer/shallow";

describe("Details Component", () => {
    test("open state", () => {
        const r = new Renderer();
        r.render(<Details open={true} summary="Summary" />);
        // TODO: assertions
    });
    test("closed state", () => {
        const r = new Renderer();
        r.render(<Details open={false} summary="Summary" />);
        // TODO: assertions
    });
    test("remove action", () => {
        const removeHandler = () => {};
        const r = new Renderer();
        r.render(<Details open={false} summary="Summary" onRemove={removeHandler} />);
        // TODO: assertions
    });
    test("menu action", () => {
        const handleSampleClick = () => {};
        const menu : IContextualMenuItem[] = [
            {
                key: "sample",
                name: "Sample",
                onClick: handleSampleClick
            }
        ];
        const r = new Renderer();
        r.render(<Details open={false} summary="Summary" menu={menu} />);
        // TODO: assertions
    });
});
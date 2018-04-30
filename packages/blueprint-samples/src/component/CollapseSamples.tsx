import * as React from "react";
import { Collapse } from "@blueprintjs/core/lib/esm/components/collapse/collapse";
import { Button } from "@blueprintjs/core/lib/esm/components/button/buttons";

interface ICollapseSamplesState {
    open?: boolean;
}

class CollapseSamples extends React.Component<any, ICollapseSamplesState> {
    constructor(props : any) {
        super(props);
        this.state = { open: false };
    }
    private _onCollapseToggle = () => {
        console.log("-- On Click Toggle Collapse");
        this.setState({ open: !this.state.open });
    }
    render() {
        return (
            <div style={{ padding: 8 }}>
                <Button onClick={this._onCollapseToggle}>{this.state.open ? "Hide Content" : "Show Content"}</Button>
                <Collapse isOpen={this.state.open}>
                    Hello, this is collapse content
                </Collapse>
            </div>
        );
    }
}

export { ICollapseSamplesState, CollapseSamples, CollapseSamples as default }
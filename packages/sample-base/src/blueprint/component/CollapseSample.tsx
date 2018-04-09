import * as React from "react";
import { Collapse } from "@blueprintjs/core/lib/esm/components/collapse/collapse";
import { Button } from "@blueprintjs/core/lib/esm/components/button/buttons";
import { SampleHostAppView, IAppProps } from "../../component/SampleHostAppView";

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
            <div>
                <Button onClick={this._onCollapseToggle}>{this.state.open ? "Hide Content" : "Show Content"}</Button>
                <Collapse isOpen={this.state.open}>
                    Hello, this is collapse content
                </Collapse>
            </div>
        );
    }
}

class CollapseSampleApp extends React.Component<IAppProps, any> {
    componentWillMount() {
        this.props.host.setTitle("Blueprint Collapse Sample");
    }
    render() {
        return (
            <SampleHostAppView host={this.props.host}>
                <div style={{ padding: 8 }}>
                    <CollapseSamples />
                </div>
            </SampleHostAppView>
        );
    }
}

export { CollapseSampleApp }
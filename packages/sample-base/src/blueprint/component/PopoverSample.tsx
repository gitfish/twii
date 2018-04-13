import * as React from "react";
import { Popover } from "@blueprintjs/core/lib/esm/components/popover/popover";
import { Button } from "@blueprintjs/core/lib/esm/components/button/buttons";
import { SampleHostAppView, IAppProps } from "../../component/SampleHostAppView";

class PopoverSample extends React.Component<any, any> {
    render() {
        return (
            <div style={{ padding: 8 }}>
                <Popover>
                    <Button>Popover Target</Button>
                    <div>
                        Popover content
                    </div>
                </Popover>
            </div>
        );
    }
}

class PopoverSampleApp extends React.Component<IAppProps, any> {
    componentWillMount() {
        this.props.host.setTitle("Blueprint Popover Sample");
    }
    render() {
        return (
            <SampleHostAppView host={this.props.host}>
                <PopoverSample />
            </SampleHostAppView>
        );
    }
}

export { PopoverSampleApp }
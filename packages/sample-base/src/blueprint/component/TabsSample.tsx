import * as React from "react";
import { Tabs } from "@blueprintjs/core/lib/esm/components/tabs/tabs";
import { Tab } from "@blueprintjs/core/lib/esm/components/tabs/tab";
import { SampleHostAppView, IAppProps } from "../../component/SampleHostAppView";

class TabsSample extends React.Component<any, any> {
    render() {
        return (
            <Tabs id="sample">
                <Tab id="0" title="Tab One" panel={<div>Tab One Content</div>} />
                <Tab id="1" title="Tab Two" panel={<div>Tab Two Content</div>} />
                <Tab id="2" title="Tab Three" panel={<div>Tab Three Content</div>} />
                <Tab id="3" title="Tab Four" panel={<div>Tab Four Content</div>} />
            </Tabs>
        );
    }    
}

class TabsSampleApp extends React.Component<IAppProps, any> {
    componentWillMount() {
        this.props.host.setTitle("Blueprint Tabs Sample");
    }
    render() {
        return (
            <SampleHostAppView host={this.props.host}>
                <div style={{ padding: 8 }}>
                    <TabsSample />
                </div>
            </SampleHostAppView>
        );
    }
}

export { TabsSample, TabsSampleApp }




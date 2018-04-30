import * as React from "react";
import { Sticky } from "office-ui-fabric-react/lib/Sticky";
import { ScrollablePane } from "office-ui-fabric-react/lib/ScrollablePane";

const rubbish = (n : number) => {
    const r = [];
    for(let i = 0; i < n; i ++) {
        r.push(
            <div key={i}>
                This is some rubbish content after the Sticky {i}

                <hr/>

                And some more rubbish content {i}
            </div>
        );
    }
    return r;
}

class StickySamples extends React.Component<any, any> {
    render() {
        return (
            <ScrollablePane style={{ margin: 8, width: 600, maxHeight: 400, border: "1px solid #cccccc", position: "relative" }}>
                {rubbish(10)}
                <Sticky stickyBackgroundColor="#336699">
                    Sample Sticky Component
                </Sticky>
                <div>
                    {rubbish(30)}
                </div>
            </ScrollablePane>
        );
    }
}

export { StickySamples, StickySamples as default }
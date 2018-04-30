import * as React from "react";
import { Callout } from "@blueprintjs/core/lib/esm/components/callout/callout";
import { Intent } from "@blueprintjs/core/lib/esm/common/intent";

class CalloutSamples extends React.Component<any, any> {
    render() {
        return (
            <div style={{ padding: 8 }}>
                <Callout intent={Intent.NONE} icon="blank" title="None Callout">
                    None Callout Content
                </Callout>
                <hr />
                <Callout intent={Intent.PRIMARY} icon="layers" title="Primary Callout">
                    Primary Callout Content
                </Callout>
                <hr />
                <Callout intent={Intent.SUCCESS} icon="select" title="Success Callout">
                    Success Callout Content
                </Callout>
                <hr />
                <Callout intent={Intent.WARNING} icon="mountain" title="Warning Callout">
                    Warning Callout Content
                </Callout>
                <hr />
                <Callout intent={Intent.DANGER} icon="folder-new" title="Danger Callout">
                    Danger Callout Content
                </Callout>
            </div>
        );
    }
}

export { CalloutSamples, CalloutSamples as default }
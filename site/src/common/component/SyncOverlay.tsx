import * as React from "react";
import { observer } from "mobx-react";
import { Overlay, IOverlayProps } from "office-ui-fabric-react/lib/Overlay";
import { Spinner } from "office-ui-fabric-react/lib/Spinner";
import { ISync } from "../ISync";

interface ISyncOverlayProps extends IOverlayProps {
    sync: ISync;
    syncLabel?: string;
    onRenderSync?: (props : ISyncOverlayProps) => React.ReactNode;
}

const DefaultRenderSync = (props : ISyncOverlayProps) => {
    return <Spinner className="sync-spinner" label={props.syncLabel || "Loading..."} />
};

@observer
class SyncOverlay extends React.Component<ISyncOverlayProps, any> {
    render() {
        if(this.props.sync.syncing) {
            const content = (this.props.onRenderSync || DefaultRenderSync)(this.props);
            return (
                <Overlay {...this.props}>
                    {content}
                </Overlay>
            );
        }
        return null;
    }
}

export { SyncOverlay }
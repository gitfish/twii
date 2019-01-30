import * as React from "react";
import { observer } from "mobx-react";
import { Overlay, IOverlayProps } from "office-ui-fabric-react/lib/Overlay";
import { Spinner } from "office-ui-fabric-react/lib/Spinner";
import { ISync } from "../ISync";
import { ISyncOverlayStyles, getStyles } from "./SyncOverlay.styles";
import { ISyncOverlayClassNames, getClassNames } from "./SyncOverlay.classNames";

interface ISyncOverlayProps {
    sync: ISync;
    syncLabel?: string;
    onRenderSync?: (props : ISyncOverlayProps) => React.ReactNode;
    styles?: ISyncOverlayStyles;
    className?: string;
    overlayProps?: IOverlayProps;
}

const defaultRenderSync = (props : ISyncOverlayProps) => {
    return <Spinner label={props.syncLabel || "Loading..."} />
};

@observer
class SyncOverlay extends React.Component<ISyncOverlayProps, any> {
    render() {
        if(this.props.sync.syncing) {
            const classNames = getClassNames(getStyles(null, this.props.styles), this.props.className);
            const content = (this.props.onRenderSync || defaultRenderSync)(this.props);
            return (
                <Overlay {...this.props.overlayProps} className={classNames.root}>
                    <div className={classNames.content}>{content}</div>
                </Overlay>
            );
        }
        return null;
    }
}

export { ISyncOverlayProps, SyncOverlay }
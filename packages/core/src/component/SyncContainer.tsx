import * as React from "react";
import { observer } from "mobx-react";
import ISync from "../ISync";
import { Spinner } from "office-ui-fabric-react/lib/Spinner";
import Error from "./Error";
import "./SyncContainer.scss";

interface ISyncContainerProps {
    sync: ISync;
    onRenderDone: (props : ISyncContainerProps) => React.ReactNode;
    syncLabel?: string;
    onRenderDefault?: (props : ISyncContainerProps) => React.ReactNode;
    onRenderSync?: (props : ISyncContainerProps) => React.ReactNode;
    onRenderError?: (error : any, props : ISyncContainerProps) => React.ReactNode;
}

const DefaultRenderSync = (props : ISyncContainerProps) => {
    return <Spinner className="sync-spinner" label={props.syncLabel || "Loading..."} />
};

const DefaultRenderError = (error : any) => {
    return <Error className="sync-error" error={error} />;
};

@observer
class SyncContainer extends React.Component<ISyncContainerProps, any> {
    render() {
        let content;
        const sync = this.props.sync;
        if(sync.syncing) {
            content = (this.props.onRenderSync || DefaultRenderSync)(this.props); 
        } else if(sync.error) {
            content = (this.props.onRenderError || DefaultRenderError)(sync.error, this.props);
        } else if(sync.hasSynced) {
            content = this.props.onRenderDone(this.props);
        } else {
            content = this.props.onRenderDefault ? this.props.onRenderDefault(this.props) : null;
        }

        return content;
    }
}

export { SyncContainer as default, SyncContainer, ISyncContainerProps }
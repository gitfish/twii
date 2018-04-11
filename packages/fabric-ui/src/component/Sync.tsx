import * as React from "react";
import { observer } from "mobx-react";
import { ISync } from "@pu/common/lib/ISync";
import { Error } from "./Error";
import { Spinner } from "office-ui-fabric-react/lib/Spinner";

interface ISyncProps {
    sync: ISync;
    onRenderDone: (props : ISyncProps) => React.ReactNode;
    syncLabel?: string;
    onRenderDefault?: (props : ISyncProps) => React.ReactNode;
    onRenderSync?: (props : ISyncProps) => React.ReactNode;
    onRenderError?: (error : any, props : ISyncProps) => React.ReactNode;
}

const defaultOnRenderDone = (props : ISyncProps) => {
    return null;
};

const defaultOnRenderSync = (props : ISyncProps) => {
    return <Spinner className="sync-spinner" label={props.syncLabel || "Loading..."} />;
};

const defaultOnRenderError = (error : any) => {
    return <Error className="sync-error" error={error} />;
};

const DefaultSyncProps : ISyncProps = {
    sync: null,
    onRenderDone: defaultOnRenderDone,
    onRenderSync: defaultOnRenderSync,
    onRenderError: defaultOnRenderError
};

interface ISyncErrorProps {
    error: any;
}

class SyncError extends React.Component<ISyncProps, any> {
    render() {
        const error = this.props.sync.error;
        return this.props.onRenderError ?
            this.props.onRenderError(error, this.props) :
            DefaultSyncProps.onRenderError(error, this.props);
    }
}

class SyncSyncing extends React.Component<ISyncProps, any> {
    render() {
        return this.props.onRenderSync ?
            this.props.onRenderSync(this.props) :
            DefaultSyncProps.onRenderSync(this.props);
    }
}

@observer
class Sync extends React.Component<ISyncProps, any> {
    render() {
        let content;
        const sync = this.props.sync;
        if(sync.syncing) {
            content = <SyncSyncing {...this.props} />;
        } else if(sync.error) {
            content = <SyncError {...this.props} />;
        } else if(sync.hasSynced) {
            content = this.props.onRenderDone(this.props);
        } else {
            content = this.props.onRenderDefault ? this.props.onRenderDefault(this.props) : null;
        }

        return content;
    }
}

export { ISyncProps, Sync, DefaultSyncProps }
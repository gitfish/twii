import * as React from "react";
import { observer } from "mobx-react";
import { ISync } from "@twii/core/lib/ISync";
import { Error } from "./Error";
import { Spinner } from "office-ui-fabric-react/lib/Spinner";
import { ISyncStyles, getStyles } from "./Sync.styles";
import { ISyncClassNames, getClassNames } from "./Sync.classNames";

interface ISyncProps {
    sync: ISync;
    onRenderDone: (props : ISyncProps) => React.ReactNode;
    syncLabel?: string;
    onRenderDefault?: (props : ISyncProps) => React.ReactNode;
    onRenderSync?: (props : ISyncProps) => React.ReactNode;
    onRenderError?: (error : any, props : ISyncProps) => React.ReactNode;
    styles?: ISyncStyles;
    className?: string;
}

const defaultOnRenderDone = (props : ISyncProps) => {
    return null;
};

const defaultOnRenderSync = (props : ISyncProps) => {
    return <Spinner className="sync-spinner" label={props.syncLabel || "Loading..."} />;
};

const defaultOnRenderError = (error : any) => {
    return <Error className="sync-error-message" error={error} />;
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

@observer
class Sync extends React.Component<ISyncProps, any> {
    private _classNames : ISyncClassNames;
    private _renderSyncError() : React.ReactNode {
        const error = this.props.sync.error;
        return this.props.onRenderError ?
            this.props.onRenderError(error, this.props) :
            DefaultSyncProps.onRenderError(error, this.props);
    }
    private _renderSyncing() : React.ReactNode {
        const syncContent = this.props.onRenderSync ?
            this.props.onRenderSync(this.props) :
            DefaultSyncProps.onRenderSync(this.props);
        return (
            <div className={this._classNames.root}>
                {syncContent}
            </div>
        );
    }
    render() {
        this._classNames = getClassNames(getStyles(null, this.props.styles), this.props.className);
        let content;
        const sync = this.props.sync;
        if(sync.syncing) {
            content = this._renderSyncing();
        } else if(sync.error) {
            content = this._renderSyncError();
        } else if(sync.hasSynced) {
            content = this.props.onRenderDone(this.props);
        } else {
            content = this.props.onRenderDefault ? this.props.onRenderDefault(this.props) : null;
        }

        return content;
    }
}

export { ISyncProps, Sync, DefaultSyncProps }
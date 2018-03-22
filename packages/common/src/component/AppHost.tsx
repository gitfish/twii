import * as React from "react";
import { observer } from "mobx-react";
import { IAppHost } from "../IAppHost";
import { Sync } from "./Sync";
import { Error } from "./Error";
import { Spinner } from "office-ui-fabric-react/lib/Spinner";
import { SyncOverlay } from "./SyncOverlay";

interface IAppHostProps {
    host: IAppHost;
    onRenderSync?: (host : IAppHost) => React.ReactNode;
    onRenderError?: (host : IAppHost) => React.ReactNode;
    noLoadOnMount?: boolean;
}

class AppHostError extends React.Component<IAppHostProps, any> {
    componentWillMount() {
        this.props.host.setTitle("Error");
    }
    render() {
        return <Error className="app-host-error" error={this.props.host.sync.error} />
    }
}

@observer
class AppHostContainerView extends React.Component<IAppHostProps, any> {
    render() {
        if(this.props.host.sync.error) {
            return this.props.onRenderError ? this.props.onRenderError(this.props.host) : <AppHostError {...this.props} />;
        }
        return this.props.host.view || null;
    }
}

class AppHostContainer extends React.Component<IAppHostProps, any> {
    componentWillMount() {
        if(!this.props.noLoadOnMount) {
            this.props.host.load();
        }
    }
    render() {
        return (
            <div>
                <SyncOverlay sync={this.props.host.sync} onRenderSync={this.props.onRenderSync} />
                <AppHostContainerView {...this.props} />
            </div>
        );
    }
}

export {
    IAppHostProps,
    AppHostContainer
}
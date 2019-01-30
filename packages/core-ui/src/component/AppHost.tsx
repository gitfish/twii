import * as React from "react";
import { observer } from "mobx-react";
import { IAppHostBaseProps } from "./IAppHostBaseProps";
import { Error } from "./Error";
import { SyncOverlay } from "./SyncOverlay";

interface IAppHostProps extends IAppHostBaseProps {
    onRenderSync?: (props : IAppHostProps) => React.ReactNode;
    onRenderError?: (props : IAppHostProps) => React.ReactNode;
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
            return this.props.onRenderError ? this.props.onRenderError(this.props) : <AppHostError {...this.props} />;
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
    private _onRenderSync = () => {
        return this.props.onRenderSync(this.props);
    }
    render() {
        return (
            <div>
                <SyncOverlay sync={this.props.host.sync} onRenderSync={this.props.onRenderSync ? this._onRenderSync : undefined} />
                <AppHostContainerView {...this.props} />
            </div>
        );
    }
}

export {
    IAppHostProps,
    AppHostContainer
}
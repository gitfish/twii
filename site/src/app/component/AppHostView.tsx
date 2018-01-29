import * as React from "react";
import { observer } from "mobx-react";
import IAppHost from "../IAppHost";
import SyncContainer from "common/component/SyncContainer";
import { css } from "@uifabric/utilities/lib/css";

interface IAppHostViewProps {
    host: IAppHost;
    onRenderLoad?: (host : IAppHost) => React.ReactNode;
    onRenderError?: (error : any, host?: IAppHost) => React.ReactNode;
}

class AppHostView extends React.Component<IAppHostViewProps, any> {
    componentWillMount() {
        this.props.host.load();
    }
    private _onRenderDone = () => {
        return this.props.host.view;
    }
    private _onRenderError = (error : any) => {
        return this.props.onRenderError(error, this.props.host);
    }
    private _onRenderLoad = () => {
        return this.props.onRenderLoad(this.props.host);
    }
    render() {
        return <SyncContainer sync={this.props.host.sync}
                              onRenderDone={this._onRenderDone}
                              onRenderError={this.props.onRenderError ? this._onRenderError : undefined}
                              onRenderSync={this.props.onRenderLoad ? this._onRenderLoad : undefined} />;
    }
}

export { AppHostView as default, AppHostView }
import * as React from "react";
import IRequest from "roota/lib/IRequest";
import IRouter from "roota/lib/IRouter";
import AppRouter from "../AppRouter";
import BasicAppHost from "../BasicAppHost";
import IAppHost from "../IAppHost";
import AppHostView from "./AppHostView";

interface IAppContainerProps extends IRequest {
    onRenderLoad?: (host : IAppHost) => React.ReactNode;
    onRenderError?: (error : any, host : IAppHost) => React.ReactNode;
    router?: IRouter;
}

class AppContainer extends React.Component<IAppContainerProps, any> {
    private _host : BasicAppHost;
    constructor(props : IAppContainerProps) {
        super(props);
        this._host = new BasicAppHost();
        this._host.router = this.props.router || AppRouter;
        this._host.setRequest(props);
    }
    componentWillReceiveProps(nextProps : IAppContainerProps) {
        if(nextProps.path !== this.props.path || nextProps.router !== this.props.router) {
            this._host.router = nextProps.router || AppRouter;
        }
        this._host.load(nextProps);
    }
    render() {
        return <AppHostView host={this._host}
                            onRenderLoad={this.props.onRenderLoad}
                            onRenderError={this.props.onRenderError} />;
    }
}

export { IAppContainerProps, AppContainer as default, AppContainer }
import * as React from "react";
import { IAppHost } from "@pu/common/lib/IAppHost";
import { AppHost } from "@pu/common/lib/model/AppHost";
import { IAppHostProps, AppHostContainer } from "./AppHost";
import { IRequest } from "@pu/router/lib/IRequest";
import { IRouter } from "@pu/router/lib/IRouter";

interface IAppContainerProps extends IRequest {
    router?: IRouter;
    onRenderSync?: (props : IAppHostProps) => React.ReactNode;
    onRenderError?: (host : IAppHostProps) => React.ReactNode;
}

interface IAppContainer {
    host: IAppHost;
}

class AppContainer extends React.Component<IAppContainerProps, any> implements IAppContainer {
    private _host : AppHost;
    constructor(props : IAppContainerProps) {
        super(props);
        this._host = new AppHost();
        this._host.router = this.props.router;
        this._host.setRequest(props);
    }
    get host() : IAppHost {
        return this._host;
    }
    componentWillReceiveProps(nextProps : IAppContainerProps) {
        if(nextProps.router !== this.props.router) {
            this._host.router = nextProps.router;
        }
        this._host.load(nextProps);
    }
    render() {
        return (
            <AppHostContainer host={this._host}
                              onRenderSync={this.props.onRenderSync}
                              onRenderError={this.props.onRenderError} />
        );
    }
}

export { IAppContainerProps, IAppContainer, AppContainer }
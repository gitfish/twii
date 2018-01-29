import * as React from "react";
import { IAppHost } from "@twii/core/lib/app/IAppHost";
import { AppHost } from "@twii/core/lib/app/AppHost";
import { AppHostContainer, IAppHostCallbackProps } from "./AppHost";
import { IRequest } from "roota/lib/IRequest";
import { IRouter } from "roota/lib/IRouter";

interface IAppContainerProps extends IRequest, IAppHostCallbackProps {
    router?: IRouter;
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
                              onRenderLoad={this.props.onRenderLoad}
                              onRenderError={this.props.onRenderError} />
        );
    }
}

export { IAppContainerProps, IAppContainer, AppContainer }
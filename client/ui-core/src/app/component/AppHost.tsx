import * as React from "react";
import { IAppHost } from "@navish/core/lib/app/IAppHost";
import { Sync } from "../../common/component/Sync";
import { Error } from "../../common/component/Error";
import { Spinner } from "office-ui-fabric-react/lib/Spinner";

interface IAppHostProps {
    host: IAppHost;
}

interface IAppHostCallbackProps {
    onRenderLoad?: (host : IAppHost) => React.ReactNode;
    onRenderError?: (error : any, host : IAppHost) => React.ReactNode;
    onRenderDefault?: (host : IAppHost) => React.ReactNode;
}

interface IAppHostContainerProps extends IAppHostProps, IAppHostCallbackProps {
    noLoadOnMount?: boolean;
}

interface IAppHostErrorProps extends IAppHostProps {
    error: any;
    onRenderError?: (error : any, host : IAppHost) => React.ReactNode;
}

class AppHostError extends React.Component<IAppHostErrorProps, any> {
    componentWillMount() {
        this.props.host.setTitle("Error");
    }
    render() {
        return this.props.onRenderError ?
            this.props.onRenderError(this.props.error, this.props.host) :
            <Error className="app-host-error" error={this.props.error} />
    }
}

interface IAppHostLoadProps extends IAppHostProps {
    onRenderLoad?: (host : IAppHost) => React.ReactNode;
}

class AppHostLoad extends React.Component<IAppHostLoadProps, any> {
    componentWillMount() {
        this.props.host.setTitle("Loading...");
    }
    render() {
        return this.props.onRenderLoad ?
            this.props.onRenderLoad(this.props.host) :
            <Spinner className="app-host-load-spinner" label="Loading..." />;
    }
}

class AppHostContainer extends React.Component<IAppHostContainerProps, any> {
    componentWillMount() {
        if(!this.props.noLoadOnMount) {
            this.props.host.load();
        }
    }
    private _onRenderDone = () => {
        return this.props.host.view;
    }
    private _onRenderError = (error : any) => {
        return <AppHostError host={this.props.host} error={error} onRenderError={this.props.onRenderError} />;
    }
    private _onRenderLoad = () => {
        return <AppHostLoad host={this.props.host} onRenderLoad={this.props.onRenderLoad} />;
    }
    private _onRenderDefault = () => {
        return this.props.onRenderDefault(this.props.host);
    }
    render() {
        return <Sync sync={this.props.host.sync}
                              onRenderDone={this._onRenderDone}
                              onRenderError={this._onRenderError}
                              onRenderSync={this._onRenderLoad}
                              onRenderDefault={this.props.onRenderDefault ? this._onRenderDefault : undefined} />;
    }
}

export {
    IAppHostProps,
    IAppHostCallbackProps,
    IAppHostContainerProps,
    AppHostContainer as default,
    AppHostContainer
}
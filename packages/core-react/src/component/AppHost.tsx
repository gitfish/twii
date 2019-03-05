import * as React from "react";
import { observer } from "mobx-react";
import { IAppHostBaseProps } from "./IAppHostBaseProps";

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
        const error = this.props.host.sync.error;
        return (
            <div style={{ color: "red" }}>
                <h3>An Error has occurred</h3>
                {error.message && (
                    <div style={{ paddingTop: 8 }}>{error.message}</div>
                )}
                {error.stack && (
                    <div style={{ paddingTop: 8 }}>{error.stack}</div>
                )}
            </div>
        );
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

@observer
class AppHostContainerSync extends React.Component<IAppHostProps, any> {
    render() {
        if(this.props.host.sync.syncing && this.props.onRenderSync) {
            return this.props.onRenderSync(this.props);
        }
        return null;
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
                <AppHostContainerSync {...this.props} />
                <AppHostContainerView {...this.props} />
            </div>
        );
    }
}

export {
    IAppHostProps,
    AppHostContainer
}
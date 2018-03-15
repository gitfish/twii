import * as React from "react";
import { observer } from "mobx-react";
import { IAppViewProps, AppView } from "./AppView";
import { IAppHost } from "@twii/core/lib/app/IAppHost";
import { css } from "@uifabric/utilities/lib/css";

interface IAppHostViewProps extends IAppViewProps {
    host: IAppHost;
}

/**
 * This is a convenience wrapper for wrapping a context based component in an
 * application wrapper if need be.
 */
@observer
class AppHostView extends React.Component<IAppHostViewProps, any> {
    componentWillMount() {
        const qr = this.props.host.params._root;
        if(qr !== undefined) {
            this.props.host.root = qr && (qr === "true" || qr === "1") ? true : false;
        }
    }
    render() {
        if(this.props.host.root) {
            return <AppView {...this.props}>{this.props.children}</AppView>;
        }
        return <div className={this.props.className}>{this.props.children}</div>;
    }
}

export { IAppHostViewProps, AppHostView }
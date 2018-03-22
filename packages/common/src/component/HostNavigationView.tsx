import * as React from "react";
import { observer } from "mobx-react";
import { INavigationViewProps, NavigationView } from "./NavigationView";
import { IAppHost } from "../IAppHost";

interface IHostNavigationViewProps extends INavigationViewProps {
    host: IAppHost;
}

/**
 * This is a convenience wrapper for wrapping a context based component in an
 * application wrapper if need be.
 */
@observer
class HostNavigationView extends React.Component<IHostNavigationViewProps, any> {
    componentWillMount() {
        const qr = this.props.host.params._root;
        if(qr !== undefined) {
            this.props.host.root = qr && (qr === "true" || qr === "1") ? true : false;
        }
        this.props.host.setTitle(this.props.title);
    }
    render() {
        if(this.props.host.root) {
            return <NavigationView {...this.props}>{this.props.children}</NavigationView>;
        }
        return <div className={this.props.className}>{this.props.children}</div>;
    }
}

export { IHostNavigationViewProps, HostNavigationView }
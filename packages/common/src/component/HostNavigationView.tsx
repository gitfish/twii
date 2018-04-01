import * as React from "react";
import { observer } from "mobx-react";
import { INavigationViewProps, NavigationView } from "./NavigationView";
import { IAppHost } from "../IAppHost";
import { IAppProps } from "./IAppProps";
import { IContextualMenuItem } from "office-ui-fabric-react/lib/ContextualMenu";

interface IHostNavigationViewProps extends IAppProps, INavigationViewProps {
    host: IAppHost;
}

/**
 * Host app view wrapper.
 */
@observer
class HostNavigationView extends React.Component<IHostNavigationViewProps, any> {
    componentWillMount() {
        const qr = this.props.host.params._root;
        if(qr !== undefined) {
            this.props.host.setRoot(qr && (qr === "true" || qr === "1") ? true : false);
        }
    }
    private _onMenuOpenChange = (open : boolean) => {
        this.props.host.setState({ navigationMenuOpen: open });
    }
    render() {
        const title = `${this.props.title}${this.props.title && this.props.host.title ? " - " : ""}${this.props.host.title}`;
        return (
            <HostNavigationView {...this.props} title={title} root={this.props.host.root} menuOpen={this.props.host.state.navigationMenuOpen} onMenuOpenChange={this._onMenuOpenChange}>
                {this.props.children}
            </HostNavigationView>
        );
    }
}

export { IHostNavigationViewProps, HostNavigationView }
import * as React from "react";
import { observer } from "mobx-react";
import { IAppViewProps, AppView } from "./AppView";
import { IAppProps } from "@pu/common-ui/lib/component/IAppProps";
import { IContextualMenuItem } from "office-ui-fabric-react/lib/ContextualMenu";

interface IHostAppViewProps extends IAppProps, IAppViewProps {}

/**
 * Host app view wrapper.
 */
@observer
class HostAppView extends React.Component<IHostAppViewProps, any> {
    componentWillMount() {
        const qr = this.props.host.params._root;
        if(qr !== undefined) {
            this.props.host.setRoot(qr && (qr === "true" || qr === "1") ? true : false);
        }
    }
    render() {
        return (
            <AppView {...this.props} root={this.props.host.root}>
                {this.props.children}
            </AppView>
        );
    }
}

export { IHostAppViewProps, HostAppView }
import * as React from "react";
import { IAppViewProps, AppView, IAppView } from "./AppView";
import { IAppHostBaseProps } from "../../../core-ui/src/component/IAppHostBaseProps";
import { IContextualMenuItem } from "office-ui-fabric-react/lib/ContextualMenu";
import { observer } from "mobx-react";
import { createBackItem } from "./NavMenuHelper";
import { appTitleItem } from "./HostAppTitle";
import { appIconItem } from "./HostAppIcon";

interface IHostAppViewProps extends IAppHostBaseProps, IAppViewProps {
    hideBackNavigation?: boolean;
    showBackLabel?: boolean;
    backFallback?: IContextualMenuItem;
    hideTitle?: boolean;
    hideIcon?: boolean;
}

/**
 * Host app view wrapper.
 */
@observer
class HostAppView extends React.Component<IHostAppViewProps, any> {
    private _appView : IAppView;
    componentWillMount() {
        const qr = this.props.host.params._root;
        if(qr !== undefined) {
            this.props.host.setRoot(qr && (qr === "true" || qr === "1") ? true : false);
        }
    }
    private _onAppViewRef = (appView : IAppView) => {
        this._appView = appView;
    }
    private _onHostResize = () => {
        if(this._appView) {
            this._appView.remeasure();
        }
    }
    componentDidMount() {
        this.props.host.addEventListener("resize", this._onHostResize);
    }
    componentWillUnmount() {
        this.props.host.removeEventListener("resize", this._onHostResize);
    }
    render() {
        const items : IContextualMenuItem[] = [];
        if(this.props.host.root && !this.props.hideIcon) {
            items.push(appIconItem(this.props));
        }
        if(!this.props.hideBackNavigation) {
            const backItem = createBackItem(this.props.host, this.props.backFallback, this.props.showBackLabel);
            if(backItem) {
                items.push(backItem);
            }
        }
        if(this.props.host.root && !this.props.hideTitle) {
            items.push(appTitleItem(this.props));
        }
        const commandBarProps = Object.assign({}, this.props.commandBarProps);
        commandBarProps.items = commandBarProps.items ? items.concat(commandBarProps.items) : items;
        return (
            <AppView {...this.props} root={this.props.host.root} commandBarProps={commandBarProps} ref={this._onAppViewRef}>
                {this.props.children}
            </AppView>
        );
    }
}

export { IHostAppViewProps, HostAppView }
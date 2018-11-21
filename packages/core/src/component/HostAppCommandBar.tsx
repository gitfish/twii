import * as React from "react";
import { CommandBar, ICommandBarProps, ICommandBar } from "office-ui-fabric-react/lib/CommandBar";
import { IAppHostBaseProps } from "./IAppHostBaseProps";
import { IContextualMenuItem } from "office-ui-fabric-react/lib/ContextualMenu";
import { createBackItem } from "./NavMenuHelper";
import { observer } from "mobx-react";

interface IHostAppCommandBarProps extends IAppHostBaseProps, ICommandBarProps {
    hideBackNavigation?: boolean;
    showBackLabel?: boolean;
    backFallback?: IContextualMenuItem;
}

@observer
class HostAppCommandBar extends React.Component<IHostAppCommandBarProps, any> {
    private _commandBar : ICommandBar;
    private _onCommandBarRef = (commandBar : ICommandBar) => {
        this._commandBar = commandBar;
    }
    private _onHostResize = () => {
        if(this._commandBar) {
            this._commandBar.remeasure();
        }
    }
    componentDidMount() {
        this.props.host.addEventListener("resize", this._onHostResize);
    }
    componentWillUnmount() {
        this.props.host.removeEventListener("resize", this._onHostResize);
    }
    render() {
        let items : IContextualMenuItem[] = [];
        if(!this.props.hideBackNavigation) {
            const backItem = createBackItem(this.props.host, this.props.backFallback, this.props.showBackLabel);
            if(backItem) {
                items.push(backItem);
            }
        }
        if(this.props.items && this.props.items.length > 0) {
            items = items.concat(this.props.items);
        }
        return <CommandBar {...this.props} items={items} componentRef={this._onCommandBarRef} />;
    }
}

export {
    IHostAppCommandBarProps,
    HostAppCommandBar
}
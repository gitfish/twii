import * as React from "react";
import { observer } from "mobx-react";
import IAppHost from "app/IAppHost";
import RootAppHost from "app/RootAppHost";
import NavToggleStore from "../NavToggleStore";
import { IconButton } from "office-ui-fabric-react/lib/Button";
import { Panel, PanelType } from "office-ui-fabric-react/lib/Panel";
import GlobalNav from "./GlobalNav";

@observer
class GlobalNavMenuItem extends React.Component<any, any> {
    private _onSelectItem = (item) => {
        RootAppHost.load(item);
        NavToggleStore.setValue(false);
    }
    private _onToggleClick = () => {
        NavToggleStore.setValue(!NavToggleStore.value);
    }
    private _onDismiss = () => {
        NavToggleStore.setValue(false);
    }
    render() {
        return (
            <div className="global-nav-menu-item">
                <IconButton title="Navigation" className="global-nav-menu-button app-menu-button" iconProps={{ iconName: "GlobalNavButton"}} onClick={this._onToggleClick} />
                <Panel type={PanelType.smallFixedNear} isOpen={NavToggleStore.value} headerText="Navigation" onDismiss={this._onDismiss} isLightDismiss={true}>
                    <GlobalNav host={RootAppHost} onSelectItem={this._onSelectItem} />
                </Panel>
            </div>
        );
    }
}

export { GlobalNavMenuItem as default, GlobalNavMenuItem }
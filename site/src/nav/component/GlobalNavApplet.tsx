import * as React from "react";
import RootAppHost from "app/RootAppHost";
import GlobalNav from "./GlobalNav";

class GlobalNavApplet extends React.Component<any, any> {
    _handleSelectItem = (item) => {
        RootAppHost.load(item);
    }
    render() {
        return (
            <GlobalNav host={RootAppHost} onSelectItem={this._handleSelectItem} />
        );
    }
}

export { GlobalNavApplet as default, GlobalNavApplet }
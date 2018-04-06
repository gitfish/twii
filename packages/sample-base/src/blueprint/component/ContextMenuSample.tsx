import * as React from "react";
import { IAppProps } from "@twii/common/lib/component/IAppProps";
import { SampleHostAppView } from "../../component/SampleHostAppView";
import { ContextMenuTarget } from "@blueprintjs/core/lib/esm/components/context-menu/contextMenuTarget";
import { Menu } from "@blueprintjs/core/lib/esm/components/menu/menu";
import { MenuItem } from "@blueprintjs/core/lib/esm/components/menu/menuItem";
import { MenuDivider } from "@blueprintjs/core/lib/esm/components/menu/menuDivider";

@ContextMenuTarget
class ContextMenuSample extends React.Component<any, any> {
    render() {
        return (
            <div>Contextual Menu Target</div>
        );
    }
    private _onClickSave = () => {
        console.log("-- Click Save");
    }
    private _onClickDelete = () => {
        console.log("-- Click Delete");
    }
    renderContextMenu() {
        return (
            <Menu>
                <MenuItem onClick={this._onClickSave} text="Save" />
                <MenuItem onClick={this._onClickDelete} text="Delete" />
            </Menu>
        );
    }
}

class ContextMenuSampleApp extends React.Component<IAppProps, any> {
    componentWillMount() {
        this.props.host.setTitle("Blueprint Context Menu Sample");
    }
    render() {
        return (
            <SampleHostAppView host={this.props.host}>
                <div style={{ padding: 8 }}>
                    <ContextMenuSample />
                </div>
            </SampleHostAppView>
        );
    }
}

export { ContextMenuSampleApp }
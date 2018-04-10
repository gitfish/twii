import * as React from "react";
import { CollapsibleList } from "@blueprintjs/core/lib/esm/components/collapsible-list/collapsibleList";
import { MenuItem, IMenuItemProps } from "@blueprintjs/core/lib/esm/components/menu/menuItem";
import { Button } from "@blueprintjs/core/lib/esm/components/button/buttons";
import { SampleHostAppView, IAppProps } from "../../component/SampleHostAppView";

class CollapsibleListSample extends React.Component<any, any> {
    private _onRenderVisibleItem = (props : IMenuItemProps, index : number) => {
        return <Button>{props.text}</Button>;
    }
    render() {
        const dropdownTarget = <Button>Show More</Button>;
        return (
            <CollapsibleList dropdownTarget={dropdownTarget} visibleItemRenderer={this._onRenderVisibleItem}>
                <MenuItem text="One" />
                <MenuItem text="Two" />
                <MenuItem text="Three" />
            </CollapsibleList>
        );
    }
}

class CollapsibleListSampleApp extends React.Component<IAppProps, any> {
    render() {
        return (
            <SampleHostAppView host={this.props.host}>
                <div style={{ padding: 8 }}>
                    <CollapsibleListSample />
                </div>
            </SampleHostAppView>
        );
    }
}

export { CollapsibleListSampleApp }


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
            <div style={{ padding: 8 }}>
                <CollapsibleList dropdownTarget={dropdownTarget} visibleItemRenderer={this._onRenderVisibleItem}>
                    <MenuItem text="One" />
                    <MenuItem text="Two" />
                    <MenuItem text="Three" />
                </CollapsibleList>
            </div>
        );
    }
}

class CollapsibleListSampleApp extends React.Component<IAppProps, any> {
    componentWillMount() {
        this.props.host.setTitle("Blueprint Collapsible List Sample");
    }
    render() {
        return (
            <SampleHostAppView host={this.props.host}>
                <CollapsibleListSample />
            </SampleHostAppView>
        );
    }
}

export { CollapsibleListSampleApp }


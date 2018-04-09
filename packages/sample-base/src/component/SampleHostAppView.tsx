import * as React from "react";
import { observer } from "mobx-react";
import { HostAppView } from "@twii/fabric-ui/lib/component/HostAppView";
import { IAppProps } from "@twii/common-ui/lib/component/IAppProps";
import { IContextualMenuItem } from "office-ui-fabric-react/lib/ContextualMenu";
import { sampleGroups } from "../sampleGroups";

@observer
class SampleHostAppView extends React.Component<IAppProps, any> {
    private _onClickItem = (e, item) => {
        this.props.host.load({ path: item.path, replace: true });
    }
    render() {
        const groupItems = sampleGroups.map(g => {
            const groupItem : IContextualMenuItem = {
                key: g.key,
                name: g.title
            };
            const sampleItems = g.items.map(item => {
                return {
                    key: item.path,
                    path: item.path,
                    name: item.title,
                    canCheck: true,
                    checked: this.props.host.path === item.path,
                    onClick: this._onClickItem
                }
            });
            groupItem.subMenuProps = {
                items: sampleItems
            };
            return groupItem;
        });
        const items : IContextualMenuItem[] = [];
        if(this.props.host.root) {
            items.push(
                {
                    key: "title",
                    name: `Samples - ${this.props.host.title}`
                }
            );
        };
        const farItems : IContextualMenuItem[] = [
            {
                key: "samples",
                name: "Samples",
                subMenuProps: {
                    items: groupItems
                }
            }
        ];
        return (
            <HostAppView host={this.props.host} items={items} farItems={farItems}>
                {this.props.children}
            </HostAppView>
        );
    }
}

export { SampleHostAppView, IAppProps }
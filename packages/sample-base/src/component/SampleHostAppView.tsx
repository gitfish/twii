import * as React from "react";
import { observer } from "mobx-react";
import { HostAppView } from "@twii/common/lib/component/HostAppView";
import { IAppProps } from "@twii/common/lib/component/IAppProps";
import { IContextualMenuItem } from "office-ui-fabric-react/lib/ContextualMenu";
import { sampleGroups } from "../sampleGroups";

@observer
class SampleHostAppView extends React.Component<IAppProps, any> {
    private _onClickItem = (e, item) => {
        this.props.host.load({ path: item.path });
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
        const items : IContextualMenuItem[] = [
            {
                key: "samples",
                name: "Samples",
                subMenuProps: {
                    items: groupItems
                }
            }
        ];
        return (
            <HostAppView host={this.props.host} title="Samples" farItems={items}>
                {this.props.children}
            </HostAppView>
        );
    }
}

export { SampleHostAppView }
import * as React from "react";
import { observer } from "mobx-react";
import { HostAppView } from "@twii/common/lib/component/HostAppView";
import { IAppProps } from "@twii/common/lib/component/IAppProps";
import { IContextualMenuItem } from "office-ui-fabric-react/lib/ContextualMenu";

@observer
class SampleHostAppView extends React.Component<IAppProps, any> {
    render() {
        const samples : IContextualMenuItem[] = [
            {
                key: "home",
                name: "Home",
                iconProps: { iconName: "Home" },
                canCheck: true,
                checked: !this.props.host.path || this.props.host.path === "/" || this.props.host.path === "/home" || this.props.host.path === "/samples/home",
                onClick: () => {
                    this.props.host.load({ path: "/samples/home" });
                }
            },
            {
                key: "form",
                name: "Form",
                iconProps: { iconName: "Articles" },
                canCheck: true,
                checked: this.props.host.path === "/samples/form",
                onClick: () => {
                    this.props.host.load({ path: "/samples/form" });
                }
            },
            {
                key: "picker",
                name: "Picker",
                iconProps: { iconName: "CheckList" },
                canCheck: true,
                checked: this.props.host.path === "/samples/picker",
                onClick: () => {
                    this.props.host.load({ path: "/samples/picker" });
                }
            },
            {
                key: "personform",
                name: "Person Form",
                iconProps: { iconName: "Contact" },
                canCheck: true,
                checked: this.props.host.path === "/samples/personform",
                onClick: () => {
                    this.props.host.load({ path: "/samples/personform" });
                },
            },
            {
                key: "sticky",
                name: "Sticky",
                iconProps: { iconName: "Archive"},
                canCheck: true,
                checked: this.props.host.path === "/samples/sticky",
                onClick: () => {
                    this.props.host.load({ path: "/samples/sticky"})
                }
            }
        ];
        const items : IContextualMenuItem[] = [
            {
                key: "samples",
                name: "Samples",
                subMenuProps: {
                    items: samples
                }
            }
        ];
        return (
            <HostAppView host={this.props.host}
                                   title="Samples"
                                   farItems={items}>
                {this.props.children}
            </HostAppView>
        );
    }
}

export { SampleHostAppView }
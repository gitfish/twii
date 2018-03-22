import * as React from "react";
import { observer } from "mobx-react";
import { HostNavigationView } from "@twii/common/lib/component/HostNavigationView";
import { IAppProps } from "@twii/common/lib/component/IAppProps";
import { IContextualMenuItem } from "office-ui-fabric-react/lib/ContextualMenu";

interface ISampleNavigationViewProps extends IAppProps {}

@observer
class SampleNavigationView extends React.Component<ISampleNavigationViewProps, any> {
    render() {
        const items : IContextualMenuItem[] = [
            {
                key: "home",
                name: "Home",
                iconProps: { iconName: "Home" },
                active: !this.props.host.path || this.props.host.path === "/",
                onClick: () => {
                    this.props.host.load({ path: "/" });
                }
            },
            {
                key: "form",
                name: "Form",
                iconProps: { iconName: "Articles" },
                active: this.props.host.path === "/samples/form",
                onClick: () => {
                    this.props.host.load({ path: "/samples/form" });
                }
            },
            {
                key: "picker",
                name: "Picker",
                iconProps: { iconName: "CheckList" },
                active: this.props.host.path === "/samples/picker",
                onClick: () => {
                    this.props.host.load({ path: "/samples/picker" });
                }
            },
            {
                key: "personform",
                name: "Person Form",
                iconProps: { iconName: "Contact" },
                active: this.props.host.path === "/samples/personform",
                onClick: () => {
                    this.props.host.load({ path: "/samples/personform" });
                }
            }
        ];
        return <HostNavigationView host={this.props.host} title="Samples" menuProps={{ inline: true, items: items }}>{this.props.children}</HostNavigationView>;
    }
}

export { SampleNavigationView }
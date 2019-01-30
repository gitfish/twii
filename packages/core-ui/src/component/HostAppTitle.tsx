import * as React from "react";
import { IAppHostBaseProps } from "./IAppHostBaseProps";
import { observer } from "mobx-react";
import { CommandBarButton } from "office-ui-fabric-react/lib/Button";
import { IContextualMenuItem } from "office-ui-fabric-react/lib/ContextualMenu";

@observer
class HostAppTitle extends React.Component<IAppHostBaseProps, any> {
    render() {
        const { host } = this.props;
        if(host.title) {
            return (
                <CommandBarButton>
                    {this.props.host.title}
                </CommandBarButton>
            );
        }
        return null;
    }
}

const appTitleItem = (props : IAppHostBaseProps, key : string = "appTitle") : IContextualMenuItem => {
    return {
        key: key,
        onRender(item) {
            return <HostAppTitle key={item.key} {...props} />;
        }
    }
};

export {
    HostAppTitle,
    appTitleItem
}